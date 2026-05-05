"""
Prodigium Reforged 漢化安裝器
從 GitHub 自動抓取最新漢化並安裝到遊戲實例
"""
import json
import os
import queue
import shutil
import subprocess
import sys
import threading
import tkinter as tk
import zipfile
from datetime import datetime
from pathlib import Path
from tkinter import filedialog, messagebox, ttk

REPO_URL = "https://github.com/SadsaucR/Prodigium-Reforged-chinese-.git"
APP_DIR = Path(os.environ["APPDATA"]) / "ProdigiumChinese"
CACHE_DIR = APP_DIR / "cache"
BACKUP_DIR = APP_DIR / "backups"
CONFIG_FILE = APP_DIR / "config.json"

COPY_DIRS = ["config", "kubejs", "mods", "resourcepacks"]

SEARCH_ROOTS = [
    Path(os.environ["APPDATA"]) / ".minecraft" / "instances",
    Path(os.environ["APPDATA"]) / "PrismLauncher" / "instances",
    Path(os.environ.get("LOCALAPPDATA", "")) / "Packages",
    Path.home() / "curseforge" / "minecraft" / "Instances",
    Path(os.environ["APPDATA"]) / "ATLauncher" / "instances",
]


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

class Config:
    def __init__(self):
        self.game_path = ""
        self.last_updated = ""

    def load(self):
        if CONFIG_FILE.exists():
            try:
                data = json.loads(CONFIG_FILE.read_text(encoding="utf-8"))
                self.game_path = data.get("game_path", "")
                self.last_updated = data.get("last_updated", "")
            except Exception:
                pass

    def save(self):
        APP_DIR.mkdir(parents=True, exist_ok=True)
        CONFIG_FILE.write_text(
            json.dumps({"game_path": self.game_path, "last_updated": self.last_updated}, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )


# ---------------------------------------------------------------------------
# Git
# ---------------------------------------------------------------------------

class GitManager:
    def check_git(self):
        try:
            subprocess.run(["git", "--version"], capture_output=True, check=True)
            return True
        except (FileNotFoundError, subprocess.CalledProcessError):
            return False

    def _run(self, args, cwd=None):
        return subprocess.run(
            args, cwd=cwd, capture_output=True,
            encoding="utf-8", errors="replace",
        )

    def clone_or_pull(self, progress_cb):
        APP_DIR.mkdir(parents=True, exist_ok=True)
        if (CACHE_DIR / ".git").exists():
            progress_cb(10, "拉取最新漢化...")
            result = self._run(["git", "pull"], cwd=CACHE_DIR)
            if result.returncode != 0:
                raise RuntimeError(result.stderr.strip() or "git pull 失敗")
        else:
            progress_cb(5, "首次下載漢化資料...")
            result = self._run(["git", "clone", REPO_URL, str(CACHE_DIR)])
            if result.returncode != 0:
                raise RuntimeError(result.stderr.strip() or "git clone 失敗")

    def get_recent_commits(self, n=8):
        if not (CACHE_DIR / ".git").exists():
            return []
        result = self._run(
            ["git", "log", f"-{n}", "--pretty=format:%h %s (%ad)", "--date=short"],
            cwd=CACHE_DIR,
        )
        if result.returncode != 0:
            return []
        return result.stdout.strip().splitlines()

    def get_current_commit(self):
        if not (CACHE_DIR / ".git").exists():
            return "—"
        result = self._run(["git", "rev-parse", "--short", "HEAD"], cwd=CACHE_DIR)
        return result.stdout.strip() if result.returncode == 0 else "—"

    def get_latest_commit_msg(self):
        if not (CACHE_DIR / ".git").exists():
            return ""
        result = self._run(
            ["git", "log", "-1", "--pretty=format:%s (%ad)", "--date=short"],
            cwd=CACHE_DIR,
        )
        return result.stdout.strip() if result.returncode == 0 else ""


# ---------------------------------------------------------------------------
# Instance detection
# ---------------------------------------------------------------------------

def detect_instances():
    found = []
    for root in SEARCH_ROOTS:
        if not root.exists():
            continue
        try:
            for child in root.iterdir():
                if child.is_dir() and (child / "mods").exists():
                    found.append((child.name, str(child)))
        except PermissionError:
            pass
    return found


# ---------------------------------------------------------------------------
# Backup
# ---------------------------------------------------------------------------

def backup_instance(instance_path: Path, progress_cb):
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    zip_path = BACKUP_DIR / f"backup_{ts}.zip"
    progress_cb(26, "備份現有漢化檔案...")
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for d in COPY_DIRS:
            src = instance_path / d
            if not src.exists():
                continue
            for f in src.rglob("*"):
                if f.is_file():
                    zf.write(f, f.relative_to(instance_path))
    return zip_path


# ---------------------------------------------------------------------------
# Install worker
# ---------------------------------------------------------------------------

def install_worker(instance_path: str, q: queue.Queue):
    def cb(pct, msg):
        q.put(("progress", pct, msg))

    try:
        git = GitManager()
        cb(0, "檢查 git...")
        if not git.check_git():
            q.put(("error", "找不到 git。請先安裝 Git for Windows:\nhttps://git-scm.com/download/win"))
            return

        git.clone_or_pull(cb)
        current_commit = git.get_current_commit()
        cb(20, "git 更新完成")

        inst = Path(instance_path)
        if not inst.exists():
            q.put(("error", f"路徑不存在：{instance_path}"))
            return

        version_file = inst / ".hanhua_version"
        if version_file.exists() and version_file.read_text(encoding="utf-8").strip() == current_commit:
            cb(100, "已是最新版本，無需更新")
            q.put(("uptodate",))
            return

        backup_instance(inst, cb)
        cb(35, "備份完成")

        steps = [
            (40, "複製 config/...", "config"),
            (55, "複製 kubejs/...", "kubejs"),
            (70, "複製 mods/...", "mods"),
            (85, "複製 resourcepacks/...", "resourcepacks"),
        ]
        for pct, msg, d in steps:
            cb(pct, msg)
            src = CACHE_DIR / d
            dst = inst / d
            if src.exists():
                shutil.copytree(src, dst, dirs_exist_ok=True)

        version_file.write_text(current_commit, encoding="utf-8")
        cb(100, "漢化安裝完成！")
        q.put(("done",))

    except Exception as e:
        q.put(("error", str(e)))


# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------

class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Prodigium Reforged 漢化安裝器")
        self.resizable(False, False)
        self.configure(bg="#1e1e2e")

        self.config_data = Config()
        self.config_data.load()

        self.git = GitManager()
        self.instances = detect_instances()
        self.q: queue.Queue = queue.Queue()
        self.changelog_visible = False

        self._build_ui()
        self._refresh_version_label()
        self.after(100, self._poll_queue)

    # ---- UI ----------------------------------------------------------------

    def _build_ui(self):
        PAD = 14
        BG = "#1e1e2e"
        FG = "#cdd6f4"
        ACCENT = "#89b4fa"
        CARD = "#313244"
        ENTRY_BG = "#45475a"

        style = ttk.Style(self)
        style.theme_use("clam")
        style.configure("TProgressbar", troughcolor=CARD, background=ACCENT, thickness=18)
        style.configure("TCombobox", fieldbackground=ENTRY_BG, background=ENTRY_BG,
                        foreground=FG, arrowcolor=FG, selectbackground=ENTRY_BG)
        style.map("TCombobox", fieldbackground=[("readonly", ENTRY_BG)])

        # Title
        tk.Label(self, text="Prodigium Reforged 漢化安裝器",
                 font=("Microsoft JhengHei", 15, "bold"),
                 bg=BG, fg=ACCENT).pack(pady=(PAD, 4))

        # Version row
        self.version_var = tk.StringVar(value="讀取中...")
        tk.Label(self, textvariable=self.version_var,
                 font=("Microsoft JhengHei", 9), bg=BG, fg="#a6e3a1").pack(pady=(0, 2))

        # Changelog toggle
        self.toggle_btn = tk.Button(self, text="▶ 顯示更新日誌",
                                    font=("Microsoft JhengHei", 9), bg=BG, fg=ACCENT,
                                    relief="flat", cursor="hand2",
                                    command=self._toggle_changelog)
        self.toggle_btn.pack()

        # Changelog box (hidden initially)
        self.changelog_frame = tk.Frame(self, bg=CARD, padx=8, pady=6)
        self.changelog_text = tk.Text(self.changelog_frame, height=6, width=58,
                                      font=("Consolas", 9), bg=CARD, fg=FG,
                                      relief="flat", state="disabled")
        self.changelog_text.pack()

        # Separator
        tk.Frame(self, height=1, bg="#45475a").pack(fill="x", padx=PAD, pady=8)

        # Path section
        tk.Label(self, text="遊戲實例路徑", font=("Microsoft JhengHei", 10, "bold"),
                 bg=BG, fg=FG).pack(anchor="w", padx=PAD)

        # Detected instances dropdown
        if self.instances:
            inst_names = [name for name, _ in self.instances]
            self.combo_var = tk.StringVar()
            combo = ttk.Combobox(self, textvariable=self.combo_var,
                                 values=inst_names, state="readonly", width=50)
            combo.pack(padx=PAD, pady=(4, 2))
            combo.bind("<<ComboboxSelected>>", self._on_combo_select)
            if self.config_data.game_path:
                for name, path in self.instances:
                    if path == self.config_data.game_path:
                        combo.set(name)
                        break

        # Manual path row
        path_frame = tk.Frame(self, bg=BG)
        path_frame.pack(fill="x", padx=PAD, pady=(2, 4))

        self.path_var = tk.StringVar(value=self.config_data.game_path)
        tk.Entry(path_frame, textvariable=self.path_var, width=46,
                 bg=ENTRY_BG, fg=FG, insertbackground=FG,
                 relief="flat", font=("Consolas", 9)).pack(side="left", ipady=4)
        tk.Button(path_frame, text="瀏覽", bg="#585b70", fg=FG,
                  relief="flat", cursor="hand2", padx=8,
                  command=self._browse).pack(side="left", padx=(6, 0))

        # Installed version row
        self.inst_version_var = tk.StringVar(value="")
        self.inst_version_label = tk.Label(self, textvariable=self.inst_version_var,
                                           font=("Microsoft JhengHei", 9), bg=BG, fg="#f38ba8")
        self.inst_version_label.pack(pady=(0, 4))
        self._refresh_inst_version()

        # Separator
        tk.Frame(self, height=1, bg="#45475a").pack(fill="x", padx=PAD, pady=8)

        # Install button
        self.install_btn = tk.Button(
            self, text="  一鍵安裝 / 更新漢化  ",
            font=("Microsoft JhengHei", 12, "bold"),
            bg=ACCENT, fg="#1e1e2e", activebackground="#74c7ec",
            relief="flat", cursor="hand2", padx=16, pady=8,
            command=self._start_install,
        )
        self.install_btn.pack(pady=(0, 10))

        # Progress
        self.progress_var = tk.DoubleVar()
        self.progressbar = ttk.Progressbar(self, variable=self.progress_var,
                                           maximum=100, length=420)
        self.progressbar.pack(padx=PAD, pady=(0, 4))

        self.status_var = tk.StringVar(value="就緒")
        tk.Label(self, textvariable=self.status_var,
                 font=("Microsoft JhengHei", 9), bg=BG, fg="#bac2de").pack(pady=(0, PAD))

    # ---- Helpers -----------------------------------------------------------

    def _refresh_version_label(self):
        commit = self.git.get_current_commit()
        msg = self.git.get_latest_commit_msg()
        if commit == "—":
            self.version_var.set("尚未下載（點安裝後自動下載）")
        else:
            self.version_var.set(f"目前版本：{commit}  {msg}")
        self._refresh_changelog()

    def _refresh_changelog(self):
        commits = self.git.get_recent_commits()
        self.changelog_text.configure(state="normal")
        self.changelog_text.delete("1.0", "end")
        if commits:
            self.changelog_text.insert("end", "\n".join(f"• {c}" for c in commits))
        else:
            self.changelog_text.insert("end", "（安裝後可查看更新日誌）")
        self.changelog_text.configure(state="disabled")

    def _refresh_inst_version(self):
        path = self.path_var.get().strip()
        if not path:
            self.inst_version_var.set("")
            return
        vf = Path(path) / ".hanhua_version"
        if vf.exists():
            ver = vf.read_text(encoding="utf-8").strip()
            self.inst_version_var.set(f"已安裝版本：{ver}")
            self.inst_version_label.configure(fg="#a6e3a1")
        else:
            self.inst_version_var.set("尚未安裝漢化")
            self.inst_version_label.configure(fg="#f38ba8")

    def _toggle_changelog(self):
        self.changelog_visible = not self.changelog_visible
        if self.changelog_visible:
            self.changelog_frame.pack(padx=14, pady=(0, 6))
            self.toggle_btn.configure(text="▼ 隱藏更新日誌")
        else:
            self.changelog_frame.pack_forget()
            self.toggle_btn.configure(text="▶ 顯示更新日誌")

    def _on_combo_select(self, _event=None):
        name = self.combo_var.get()
        for n, p in self.instances:
            if n == name:
                self.path_var.set(p)
                break
        self._refresh_inst_version()

    def _browse(self):
        d = filedialog.askdirectory(title="選擇遊戲實例資料夾")
        if d:
            self.path_var.set(d)
            self._refresh_inst_version()

    def _start_install(self):
        path = self.path_var.get().strip()
        if not path:
            messagebox.showwarning("缺少路徑", "請先選擇或輸入遊戲實例路徑。")
            return

        self.config_data.game_path = path
        self.config_data.save()

        self.install_btn.configure(state="disabled")
        self.progress_var.set(0)
        self.status_var.set("啟動中...")

        t = threading.Thread(target=install_worker, args=(path, self.q), daemon=True)
        t.start()

    def _poll_queue(self):
        try:
            while True:
                msg = self.q.get_nowait()
                kind = msg[0]
                if kind == "progress":
                    _, pct, text = msg
                    self.progress_var.set(pct)
                    self.status_var.set(text)
                elif kind == "uptodate":
                    self.install_btn.configure(state="normal")
                    messagebox.showinfo("已是最新版本", "漢化已是最新版本，無需更新。")
                elif kind == "done":
                    self.config_data.last_updated = datetime.now().isoformat()
                    self.config_data.save()
                    self._refresh_version_label()
                    self._refresh_inst_version()
                    self.install_btn.configure(state="normal")
                    messagebox.showinfo("完成", "漢化已成功安裝！\n請重新啟動遊戲以套用。")
                elif kind == "error":
                    _, err = msg
                    self.status_var.set("發生錯誤")
                    self.install_btn.configure(state="normal")
                    messagebox.showerror("安裝失敗", err)
        except queue.Empty:
            pass
        self.after(100, self._poll_queue)


# ---------------------------------------------------------------------------

if __name__ == "__main__":
    if sys.platform != "win32":
        print("此工具僅支援 Windows。")
        sys.exit(1)
    app = App()
    app.mainloop()

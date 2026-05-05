# Build script for Prodigium Reforged Chinese Installer
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$ScriptDir = $PSScriptRoot
Set-Location $ScriptDir

Write-Host "=== Build: Prodigium Reforged Chinese Installer ===" -ForegroundColor Cyan

# Find real Python (skip Windows Store stub)
$pythonExe = $null
$candidates = @(
    "$env:LOCALAPPDATA\Programs\Python\Python312\python.exe",
    "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe",
    "$env:LOCALAPPDATA\Programs\Python\Python310\python.exe",
    "C:\Python312\python.exe",
    "C:\Python311\python.exe"
)
foreach ($c in $candidates) {
    if (Test-Path $c) { $pythonExe = $c; break }
}
if (-not $pythonExe) {
    Write-Host "Real Python not found. Install from https://www.python.org/downloads/" -ForegroundColor Red
    pause; exit 1
}
Write-Host "Using Python: $pythonExe" -ForegroundColor Yellow
& $pythonExe --version

Write-Host "Installing PyInstaller + UPX..." -ForegroundColor Yellow
& $pythonExe -m pip install pyinstaller

# Download UPX if not present
$upxDir = Join-Path $ScriptDir "upx"
if (-not (Test-Path "$upxDir\upx.exe")) {
    Write-Host "Downloading UPX compressor..." -ForegroundColor Yellow
    $upxZip = Join-Path $env:TEMP "upx.zip"
    Invoke-WebRequest -Uri "https://github.com/upx/upx/releases/download/v4.2.4/upx-4.2.4-win64.zip" -OutFile $upxZip
    Expand-Archive -Path $upxZip -DestinationPath $env:TEMP -Force
    New-Item -ItemType Directory -Path $upxDir -Force | Out-Null
    Copy-Item "$env:TEMP\upx-4.2.4-win64\upx.exe" "$upxDir\upx.exe"
    Remove-Item $upxZip -Force
}
if ($LASTEXITCODE -ne 0) {
    Write-Host "pip failed (exit $LASTEXITCODE)" -ForegroundColor Red
    pause; exit 1
}

foreach ($d in @("dist", "build")) {
    if (Test-Path $d) { Remove-Item $d -Recurse -Force }
}
Get-ChildItem -Filter "*.spec" | Remove-Item -Force

Write-Host "Packaging..." -ForegroundColor Yellow

$srcFile = Join-Path $ScriptDir "installer.py"
$iconFile = Join-Path $ScriptDir "icon.ico"
$outName  = "SadsaucEsInstaller"

$pyiArgs = @(
    "-m", "PyInstaller",
    "--onefile", "--windowed",
    "--name", $outName,
    "--hidden-import", "tkinter",
    "--hidden-import", "tkinter.ttk",
    "--hidden-import", "tkinter.filedialog",
    "--hidden-import", "tkinter.messagebox",
    "--exclude-module", "unittest",
    "--exclude-module", "email",
    "--exclude-module", "http",
    "--exclude-module", "xml",
    "--exclude-module", "pdb",
    "--exclude-module", "doctest",
    "--exclude-module", "difflib",
    "--exclude-module", "ftplib",
    "--exclude-module", "imaplib",
    "--exclude-module", "mailbox",
    "--exclude-module", "smtplib"
)
if (Test-Path "$upxDir\upx.exe") {
    Write-Host "UPX compression enabled" -ForegroundColor Yellow
    $pyiArgs += "--upx-dir"
    $pyiArgs += $upxDir
}
if (Test-Path $iconFile) {
    Write-Host "Using icon: $iconFile" -ForegroundColor Yellow
    $pyiArgs += "--icon"
    $pyiArgs += $iconFile
}
$pyiArgs += $srcFile

& $pythonExe @pyiArgs

if ($LASTEXITCODE -eq 0) {
    $exePath = Join-Path $ScriptDir "dist\$outName.exe"
    Write-Host ""
    Write-Host "Done! Output: $exePath" -ForegroundColor Green
    Write-Host "Distribute: dist\SadsaucEsInstaller.exe" -ForegroundColor Cyan
} else {
    Write-Host "Build failed." -ForegroundColor Red
}

pause

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

Write-Host "Installing PyInstaller..." -ForegroundColor Yellow
& $pythonExe -m pip install pyinstaller
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
    "--hidden-import", "tkinter.messagebox"
)
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

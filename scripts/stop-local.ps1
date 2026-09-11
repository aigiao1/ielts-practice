$ErrorActionPreference = "Stop"
$appDirectory = Split-Path -Parent $PSScriptRoot
$serverPath = Join-Path $appDirectory "bridge-server.mjs"
$pidPath = Join-Path $appDirectory ".bridge-server.pid"

if (-not (Test-Path -LiteralPath $pidPath)) {
    Write-Host "没有找到由启动脚本创建的本机练习服务。"
    exit 0
}

$serverPid = [int](Get-Content -LiteralPath $pidPath -Raw)
$processInfo = Get-CimInstance Win32_Process -Filter "ProcessId = $serverPid" -ErrorAction SilentlyContinue
if ($processInfo -and ($processInfo.CommandLine -like "*bridge-server.mjs*" -or $processInfo.CommandLine -like "*$serverPath*")) {
    Stop-Process -Id $serverPid -Force
    Write-Host "本机练习服务已停止。"
}
else {
    Write-Host "PID记录已失效，没有停止其他进程。"
}
Remove-Item -LiteralPath $pidPath -Force -ErrorAction SilentlyContinue

$ErrorActionPreference = "Stop"
$port = 8765
$appDirectory = Split-Path -Parent $PSScriptRoot

try {
    $node = (Get-Command node.exe -ErrorAction Stop).Source
    $serverPath = Join-Path $appDirectory "bridge-server.mjs"
    $address = Get-NetIPConfiguration |
        Where-Object { $_.IPv4DefaultGateway -and $_.IPv4Address } |
        ForEach-Object { $_.IPv4Address.IPAddress } |
        Where-Object { $_ -match '^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.)' } |
        Select-Object -First 1

    if (-not $address) {
        $address = Get-NetIPAddress -AddressFamily IPv4 |
            Where-Object { $_.IPAddress -notmatch '^(127\.|169\.254\.|198\.18\.)' } |
            Select-Object -ExpandProperty IPAddress -First 1
    }

    if (-not $address) {
        throw "No LAN address found. Connect the computer to Wi-Fi first."
    }

    Clear-Host
    Write-Host "IELTS Practice Hub is ready" -ForegroundColor Green
    Write-Host ""
    Write-Host "1. Connect the phone and computer to the same Wi-Fi."
    Write-Host "2. Open this address in Safari, Edge, or Chrome:" 
    Write-Host ""
    Write-Host "   http://${address}:${port}/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "If Windows asks about firewall access, allow Private networks only."
    Write-Host "Keep this window open. Press Ctrl+C to stop the server."
    Write-Host "Keep one logged-in ChatGPT tab open in desktop Chrome for automatic writing review."
    Write-Host ""

    Set-Location -LiteralPath $appDirectory
    & $node $serverPath --host 0.0.0.0 --port $port
}
catch {
    Write-Host ""
    Write-Host "Startup failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to close"
    exit 1
}

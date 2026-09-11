$ErrorActionPreference = "Stop"
$port = 8765
$appDirectory = Split-Path -Parent $PSScriptRoot
$serverPath = Join-Path $appDirectory "bridge-server.mjs"
$pidPath = Join-Path $appDirectory ".bridge-server.pid"
$url = "http://127.0.0.1:${port}/"

function Test-BridgeServer {
    try {
        $response = Invoke-RestMethod -Uri "${url}bridge/health" -TimeoutSec 1
        return $response.ok -eq $true
    }
    catch {
        return $false
    }
}

try {
    if (-not (Test-BridgeServer)) {
        $node = (Get-Command node.exe -ErrorAction Stop).Source
        $process = Start-Process -FilePath $node -ArgumentList @($serverPath, "--host", "127.0.0.1", "--port", "$port") -WorkingDirectory $appDirectory -WindowStyle Hidden -PassThru
        Set-Content -LiteralPath $pidPath -Value $process.Id -Encoding ascii

        $ready = $false
        for ($attempt = 0; $attempt -lt 25; $attempt += 1) {
            Start-Sleep -Milliseconds 200
            if (Test-BridgeServer) {
                $ready = $true
                break
            }
        }
        if (-not $ready) {
            throw "本机服务未能在端口 ${port} 启动。"
        }
    }

    Start-Process $url
}
catch {
    Add-Type -AssemblyName PresentationFramework
    [System.Windows.MessageBox]::Show("启动失败：$($_.Exception.Message)", "IELTS练习中心") | Out-Null
    exit 1
}

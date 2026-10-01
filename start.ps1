# Hillspace - Start Both Servers
Write-Host "Starting Hillspace Interior Design Studio..." -ForegroundColor Yellow

# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 3

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm start" -WindowStyle Normal

Write-Host "Backend running at: http://localhost:5000" -ForegroundColor Green
Write-Host "Frontend running at: http://localhost:3000" -ForegroundColor Green
Write-Host "Opening browser in 5 seconds..." -ForegroundColor Cyan

Start-Sleep -Seconds 8
Start-Process "http://localhost:3000"

@echo off
echo Starting Supply Setu App...
echo.
echo Opening client (frontend) in development mode...
cd client
start cmd /k "npm run dev"
timeout /t 3 > nul

echo.
echo Opening server (backend) in development mode...
cd ../server
start cmd /k "npm run dev"

echo.
echo Both client and server have been started!
echo Access the application at http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul
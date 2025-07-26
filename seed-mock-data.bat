@echo off
echo Seeding Supply Setu Mock Data...
echo.

echo 1/3: Seeding mock supplier data...
curl -X POST http://localhost:3005/api/suppliers/seed -H "Content-Type: application/json" -d "{}"
echo.

echo 2/3: Seeding mock product data...
curl -X POST http://localhost:3005/api/products/seed -H "Content-Type: application/json" -d "{}"
echo.

echo 3/3: Seeding mock food data...
curl -X POST http://localhost:3005/api/foods/seed -H "Content-Type: application/json" -d "{}"
echo.

echo All mock data seeded successfully!
echo.
echo Press any key to exit this window...
pause > nul

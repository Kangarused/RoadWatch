@echo off

set COMMAND=%1
set PARAM=%2

"../../../packages/FluentMigrator.1.6.2/tools/Migrate.exe" -c "Data Source='DA5355\LOCALHOST';Initial Catalog=RoadWatch_DEV;Trusted_Connection=True;MultipleActiveResultSets=True;Application Name=RoadWatch" -a "../../bin/Debug/RoadWatch.Migrations.dll" -db SqlServer %COMMAND% %PARAM%
pause
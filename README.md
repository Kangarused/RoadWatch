# RoadWatch
ASP.NET Angular application for allowing a single party to distribute traffic information to the public in real time.

####Main Setup
1. Pull or Fork this repo 
2. Open the solution with visual studio
3. Build the solution (the NuGet packages should restore)
6. -- See Migrations Setup --
7. The solution should be configured to start the private and public web packages at the same time
   - If not, you will need to edit the properties of the Solution and make sure that privateweb and publicweb are both started
8. The application private and public websites should start.

####Migrations Setup
I will only explain the setup process for SQL Server Management Studio, if you are using anything else you will likely have to edit the webconfig in privateweb and appconfig in common to reflect your database software.

1. Open SQL Server Management Studio and create a new database called RoadWatch_DEV
2. With the solution open in Visual Stuido go to the Migrations package
3. Run the up-dev.bat file using powershell (double click, you may need to specify powershell as the default app)
   - You may need to adjust your powershell execution policy which by default blocks powershell scripts from being run
4. The migrations script will run populating the database with the required tables and inserting authentication data
5. The database should be up and running now

Additional migrations scripts can be created, just ensure that they have a greater migration number. Fluent Migrator will use this to determine where it fits within the migrations list. The up.bat will roll the database up to the most recent migration, up-dev.bat performs the same function as up.bat but inserts data from the development profile into the database at the end.

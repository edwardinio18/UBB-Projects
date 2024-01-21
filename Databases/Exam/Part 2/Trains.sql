USE master 
GO
ALTER DATABASE ModelPractic 
SET single_user WITH ROLLBACK IMMEDIATE
DROP DATABASE ModelPractic

CREATE DATABASE ModelPractic

GO
USE ModelPractic
GO

-- 1. Write an SQL script that creates the corresponding relational data model.

CREATE TABLE TrainTypes (
	id INT PRIMARY KEY IDENTITY (1, 1),
	description VARCHAR(100)
);

CREATE TABLE Trains (
	id INT PRIMARY KEY IDENTITY (1, 1),
	name VARCHAR(50),
	type INT FOREIGN KEY REFERENCES TrainTypes(id)
);


CREATE TABLE Stations (
	id INT PRIMARY KEY IDENTITY (1, 1),
	name VARCHAR(50) UNIQUE
);

CREATE TABLE Routes (
	id INT PRIMARY KEY IDENTITY (1, 1),
	name VARCHAR(50) UNIQUE,
	train INT FOREIGN KEY REFERENCES Trains(id)
);

CREATE TABLE ListOfStations (
	routes INT FOREIGN KEY REFERENCES Routes(id),
	stations INT FOREIGN KEY REFERENCES Stations(id),
	arrival TIME,
	departure TIME,
	CONSTRAINT PK_ListOfStations PRIMARY KEY (routes, stations)
);

INSERT INTO TrainTypes VALUES ('description 1'), ('descrition 2')
INSERT INTO Trains VALUES ('InterRegio', 1), ('Intercity', 1), ('Regio', 2)
INSERT INTO Stations VALUES ('Cluj-Napoca'), ('Brasov'), ('Bucuresti')
INSERT INTO Routes VALUES ('Sighisoara', 1), ('Medias', 2)
INSERT INTO ListOfStations VALUES (1, 1,'12:00:00', '18:00:00'), (1, 2,'15:30:00', '22:42:00'), (2, 2,'08:05:00', '21:48:00')

SELECT * FROM TrainTypes
SELECT * FROM Trains
SELECT * FROM Stations
SELECT * FROM Routes
SELECT * FROM ListOfStations

-- 2. Implement a stored procedure that receives a route, a station, arrival and departure times, and adds the station to the route. 
-- If the station is already on the route, the arrival and departure times are updated.

GO 
CREATE OR ALTER PROCEDURE addStationToRoute (@route INT, @station INT, @arrival TIME, @departure TIME)
AS
BEGIN
	DECLARE @n INT
	SET @n = (SELECT COUNT(*) FROM ListOfStations LS WHERE routes = @route AND stations = @station)

	IF @n = 1
	BEGIN
		RAISERROR ('This station is already on the route!', 10, 1)
		UPDATE ListOfStations SET arrival = @arrival, departure = @departure
		WHERE routes = @route AND stations = @station
		RETURN
	END

	IF @n = 0
	BEGIN
		INSERT INTO ListOfStations VALUES (@route, @station, @arrival, @departure)
	END
END
GO

-- insert
SELECT * FROM ListOfStations
EXEC addStationToRoute 2, 1, '5:00:00', '9:00:00'
SELECT * FROM ListOfStations

-- already inserted
SELECT * FROM ListOfStations
EXEC addStationToRoute 2, 1, '15:00:00', '19:00:00'
SELECT * FROM ListOfStations

-- 3. Create a view that shows the names of the routes that pass through all the stations.

GO
CREATE OR ALTER VIEW routesPassStations 
AS
	SELECT name
	FROM Routes R INNER JOIN ListOfStations LS ON R.id = LS.routes
	GROUP BY name
	HAVING COUNT(*) = (SELECT COUNT(*) FROM Stations)
GO

SELECT * FROM routesPassStations

-- 4. Implement a function that lists the names of the stations with more than R routes, where R >= 1 is a function parameter.

GO
CREATE OR ALTER FUNCTION listStations (@R INT) RETURNS TABLE
AS 
RETURN 
	SELECT DISTINCT S.id, S.name, COUNT(S.name) AS NoOfRoutes
	FROM Stations S INNER JOIN ListOfStations LS ON LS.stations = S.id
	GROUP BY S.id, S.name
	HAVING COUNT(S.name) >= @R
GO

SELECT * FROM listStations(1)
SELECT * FROM listStations(2)
SELECT * FROM listStations(3)
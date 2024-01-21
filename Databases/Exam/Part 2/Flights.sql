USE master 
GO
ALTER DATABASE ModelPractic 
SET single_user WITH ROLLBACK IMMEDIATE
DROP DATABASE ModelPractic

CREATE DATABASE ModelPractic

GO
USE ModelPractic
GO

-- 1. Create tables Airplanes, Flights, Passengers, Reservations, Payments and the final diagram
CREATE TABLE Airplanes (
	aid INT PRIMARY KEY IDENTITY,
	modNum INT,
	regNum INT UNIQUE,
	capacity INT
);

CREATE TABLE Flights (
	fid INT PRIMARY KEY IDENTITY,
	aid INT FOREIGN KEY REFERENCES Airplanes(aid),
	fliNum INT UNIQUE,
	depPort VARCHAR(100),
	destPort VARCHAR(100),
	depDate DATETIME,
	arrDate DATETIME
);

CREATE TABLE Passengers (
	pid INT PRIMARY KEY IDENTITY,
	fName VARCHAR(100),
	lName VARCHAR(100),
	email VARCHAR(100) UNIQUE
);

CREATE TABLE Bookings (
	fid INT FOREIGN KEY REFERENCES Flights(fid),
	pid INT FOREIGN KEY REFERENCES Passengers(pid),
	CONSTRAINT PK_Bookings PRIMARY KEY (fid, pid)
);

CREATE TABLE Payments (
	payid INT PRIMARY KEY,
	amount FLOAT,
	payDate DATETIME,
	payType VARCHAR(100)
);

CREATE TABLE Reservations (
	rid INT PRIMARY KEY IDENTITY,
	fid INT FOREIGN KEY REFERENCES Flights(fid),
	pid INT FOREIGN KEY REFERENCES Passengers(pid),
	payid INT FOREIGN KEY REFERENCES Payments(payid)
);

DROP TABLE Reservations
DROP TABLE Payments
DROP TABLE Bookings
DROP TABLE Passengers
DROP TABLE Flights
DROP TABLE Airplanes

-- 2. Implement a stored procedure
GO
CREATE OR ALTER PROCEDURE addPayToRes (@payid INT)
AS
BEGIN
	DECLARE @n INT
	SET @n = (SELECT COUNT(*) FROM Reservations R WHERE @payid = R.payid)

	IF @n = 1
	BEGIN
		RAISERROR ('The payment for the reservation already exists!', 10, 1)
		RETURN
	END

	IF @n = 0
	BEGIN
		UPDATE Reservations SET payid = @payid
	END
END

-- 3. 
GO
CREATE OR ALTER VIEW showPass 
AS
	SELECT P.fName, P.lName
	FROM Passengers P 
	INNER JOIN Reservations R ON P.pid = R.pid
	INNER JOIN Flights F ON F.fid = R.fid
	WHERE F.depPort = 'Madrid'
GO


INSERT INTO Airplanes(modNum, regNum, capacity) VALUES (34, 87, 800), (3, 8, 900), (64, 97, 870), (90, 77, 500), (8, 7, 100)
INSERT INTO Passengers(fName, lName, email) VALUES ('hog', 'vasi', 'vas@gamil'), ('pop', 'ion', 'ion@gamil'), ('gor', 'ina', 'ina@gamil'),
												   ('iaka', 'ilie', 'ilie@gamil'), ('coste', 'ana', 'ana@gamil')

INSERT INTO Flights(aid, fliNum, depPort, destPort, depDate, arrDate) VALUES (1, 4, 'Madrid', 'Dublin', GETDATE(), GETDATE()), 
(2, 9, 'Focsani', 'Vaslui', GETDATE(), GETDATE()), (3, 2, 'Madrid', 'Croatia', GETDATE(), GETDATE()),
(4, 8, 'muie', 'pula', GETDATE(), GETDATE()), (5, 3, 'Madrid', 'curuvacii', GETDATE(), GETDATE())

INSERT INTO Payments(payid, amount, payDate, payType) VALUES (1, 2,GETDATE(), 'cash'), (2,6,GETDATE(), 'card')

INSERT INTO Reservations(fid, pid, payid) VALUES (1, 1, NULL), (3, 1, NULL), (4, 2, NULL), (5, 5, NULL), (3, 3, NULL)
INSERT INTO Reservations(fid, pid, payid) VALUES (1, 5, 1), (4, 1, 2)

SELECT * FROM showPass
SELECT * FROM Flights
-- 4.

GO
CREATE OR ALTER FUNCTION listFlights (@start_time DATETIME, @end_time DATETIME, @x INT) RETURNS TABLE
AS 
RETURN 
(
	SELECT f.fliNum, f.depPort, f.destPort, f.depDate, f.arrDate
    FROM Flights f
    INNER JOIN Reservations r ON f.fid = r.fid
    INNER JOIN Payments p ON r.payid = p.payid
    WHERE f.depDate BETWEEN @start_time AND @end_time
    GROUP BY f.fliNum, f.depPort, f.destPort, f.depDate, f.arrDate
    HAVING COUNT(*) > @x
)

UPDATE Flights SET depDate = GETDATE() WHERE fid %2 =1
SELECT *FROM listFlights('2023-01-12 22:46:25.870', '2023-01-12 22:49:52.803', 0)
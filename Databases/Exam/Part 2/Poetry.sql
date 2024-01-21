USE master 
GO
ALTER DATABASE ModelPractic
SET single_user WITH ROLLBACK IMMEDIATE
DROP DATABASE ModelPractic

CREATE DATABASE PracticPart2

GO
USE ModelPractic
GO

CREATE TABLE Users (
	usid INT PRIMARY KEY IDENTITY,
	usName VARCHAR(100),
	penName VARCHAR(100) UNIQUE,
	yob INT
);

CREATE TABLE Awards (
	aid INT PRIMARY KEY IDENTITY,
	usid INT FOREIGN KEY REFERENCES Users(usid),
	aName VARCHAR(100)
);

CREATE TABLE Competitions (
	cid INT PRIMARY KEY IDENTITY,
	yearc INT,
	weekc INT,
	unique (yearc, weekc)
);

CREATE TABLE Poems (
	poid INT PRIMARY KEY IDENTITY,
	usid INT FOREIGN KEY REFERENCES Users(usid),
	cid INT FOREIGN KEY REFERENCES Competitions(cid),
	title VARCHAR(100),
	textdesc VARCHAR(100)
);

CREATE TABLE Judge (
	jid INT PRIMARY KEY IDENTITY,
	jName VARCHAR(100)
);

CREATE TABLE Evaluation (
	poid INT FOREIGN KEY REFERENCES Poems(poid),
	jid INT FOREIGN KEY REFERENCES Judge(jid),
	points int,
	PRIMARY KEY (poid, jid),
	CONSTRAINT points_between_1and10 CHECK(1 <= points and points <= 10)
);

GO
CREATE OR ALTER PROCEDURE delJudge (@name VARCHAR(100))
AS
BEGIN
	DECLARE cur CURSOR FOR
	SELECT jid FROM Judge WHERE jName = @name

	OPEN cur
	DECLARE @jid INT
	FETCH cur INTO @pID

	WHILE @@FETCH_STATUS = 0
	BEGIN
		DELETE FROM Evaluation WHERE jid = @jid
		DELETE FROM Judge WHERE jid = @jid
		FETCH cur INTO @jid
	END

	CLOSE cur
	DEALLOCATE cur
END

GO
CREATE OR ALTER VIEW showComp 
AS
	SELECT C2.yearc, C2.weekc
	FROM (SELECT C.cid AS tcid FROM Evaluation E JOIN Poems P ON E.poid = P.poid JOIN Competitions C ON P.cid = C.cid
		  WHERE P.poid NOT IN (SELECT DISTINCT E2.poid FROM Evaluation E2 WHERE E2.points >= 5)
		  GROUP BY C.cid
		  HAVING COUNT(*) >= 10) T JOIN Competitions C2 ON T.tcid = C2.cid
GO

GO
CREATE OR ALTER FUNCTION listUsers(@P INT) RETURNS TABLE RETURN
	SELECT P3.usid, P3.penName
	FROM (SELECT P.usid AS tpid
		  FROM Users P JOIN Poems P2 ON P.usid = P2.usid
		  GROUP BY P.usid
		  HAVING COUNT(*) >= @P) T JOIN Users P3 ON T.tpid = P3.usid
GO

INSERT INTO Users(usName, penName, yob) VALUES ('John', 'Johnnie', 2001), ('Jack', 'Jackie', 2002), ('Matt', 'Mattie', 2003)

INSERT INTO Competitions(yearc, weekc) VALUES (2014, 21), (2015, 22), (2020, 1)
INSERT INTO Poems(poid, cid, title, textdesc) VALUES (1, 1, 'a', 'b'), (1, 1, 'c', 'd'), (1, 1, 'e', 'f'), (2, 1, 'g', 'h'),
												(2, 1, 'i', 'j'), (2, 1, 'k', 'l'), (3, 1, 'm', 'n'), (3, 1, 'o', 'p'),
												(3, 1, 'q', 'r'), (1, 1, 's', 't'), (1, 1, 'u', 'v'), (1, 2, 'w', 'x')
INSERT INTO Judge (jName) VALUES ('Ron'), ('Tim'), ('Ron')
INSERT INTO Evaluation (poid, jid, points) VALUES (1, 1, 4), (1, 2, 3), (2, 3, 6), (2, 2, 2), (3, 1, 4), (3, 3, 3), (3, 2, 2),
												  (4, 1, 1), (5, 2, 4), (6, 3, 2), (7, 3, 1), (8, 2, 3), (9, 1, 3), (10, 2, 3),
												  (11, 3, 1)
SELECT * FROM Users
SELECT * FROM Poems
SELECT * FROM Competitions
SELECT * FROM Judge
SELECT * FROM Evaluation

SELECT * FROM listUsers(3)
SELECT * FROM listUsers(4)
SELECT * FROM showComp
EXEC delJudge 'Ron'

SELECT * FROM Users
SELECT * FROM Poems
SELECT * FROM Competitions
SELECT * FROM Judge

DROP TABLE Evaluation
DROP TABLE Judge
DROP TABLE Poems
DROP TABLE Competitions
DROP TABLE Awards
DROP TABLE Users






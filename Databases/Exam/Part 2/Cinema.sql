USE master 
GO
ALTER DATABASE ModelPractic
SET single_user WITH ROLLBACK IMMEDIATE
DROP DATABASE ModelPractic

CREATE DATABASE ModelPractic

GO
USE ModelPractic
GO

CREATE TABLE Actors (
	actor_id INT PRIMARY KEY IDENTITY (1, 1),
	name VARCHAR(50),
	ranking INT
);

CREATE TABLE Companies (
	company_id INT PRIMARY KEY IDENTITY (1, 1),
	name VARCHAR(50)
);

CREATE TABLE StageDirectors (
	director_id INT PRIMARY KEY IDENTITY (1, 1),
	name VARCHAR(50),
	awards INT
);

CREATE TABLE Movies (
	movie_id INT PRIMARY KEY IDENTITY (1, 1),
	name VARCHAR(50),
	release_date DATE,
	company_id INT FOREIGN KEY REFERENCES Companies(company_id),
	director_id INT FOREIGN KEY REFERENCES StageDirectors(director_id)
);

CREATE TABLE CinemaProductions (
	production_id INT PRIMARY KEY IDENTITY (1, 1),
	title VARCHAR(50),
	movie_id INT FOREIGN KEY (movie_id) REFERENCES Movies(movie_id)
);

CREATE TABLE ActorCinemaProductions (
	actor_id INT FOREIGN KEY REFERENCES Actors(actor_id),
	production_id INT FOREIGN KEY REFERENCES CinemaProductions(production_id),
	entry_moment DATETIME,
	CONSTRAINT PK_ActorCinemaProductions PRIMARY KEY (actor_id, production_id)
);

INSERT INTO Actors (name, ranking) VALUES ('Leonardo DiCaprio', 9);
INSERT INTO Actors (name, ranking) VALUES ('Meryl Streep', 8);
INSERT INTO Actors (name, ranking) VALUES ('Tom Hanks', 8);
INSERT INTO Actors (name, ranking) VALUES ('Natalie Portman', 7);
INSERT INTO Actors (name, ranking) VALUES ('Johnny Depp', 7);

INSERT INTO Companies (name) VALUES ('Warner Bros');
INSERT INTO Companies (name) VALUES ('Disney');
INSERT INTO Companies (name) VALUES ('Paramount Pictures');
INSERT INTO Companies (name) VALUES ('20th Century Fox');
INSERT INTO Companies (name) VALUES ('Universal Pictures');

INSERT INTO StageDirectors (name, awards) VALUES ('Martin Scorsese', 4);
INSERT INTO StageDirectors (name, awards) VALUES ('Steven Spielberg', 3);
INSERT INTO StageDirectors (name, awards) VALUES ('Christopher Nolan', 2);
INSERT INTO StageDirectors (name, awards) VALUES ('Quentin Tarantino', 2);
INSERT INTO StageDirectors (name, awards) VALUES ('Kathryn Bigelow', 1);

INSERT INTO Movies (name, release_date, company_id, director_id) VALUES ('The Dark Knight', '2008-07-18', 4, 3);
INSERT INTO Movies (name, release_date, company_id, director_id) VALUES ('Inception', '2010-07-16', 4, 3);
INSERT INTO Movies (name, release_date, company_id, director_id) VALUES ('The Shawshank Redemption', '1994-09-23', 5, 1);
INSERT INTO Movies (name, release_date, company_id, director_id) VALUES ('The Godfather', '1972-03-24', 1, 5);
INSERT INTO Movies (name, release_date, company_id, director_id) VALUES ('Forrest Gump', '1994-07-06', 3, 2);

INSERT INTO CinemaProductions (title, movie_id) VALUES ('The Dark Knight', 1);
INSERT INTO CinemaProductions (title, movie_id) VALUES ('Inception', 2);
INSERT INTO CinemaProductions (title, movie_id) VALUES ('The Shawshank Redemption', 3);
INSERT INTO CinemaProductions (title, movie_id) VALUES ('The Godfather', 4);
INSERT INTO CinemaProductions (title, movie_id) VALUES ('Forrest Gump', 5);

-- Insert 5 tuples into the ActorCinemaProductions table
INSERT INTO ActorCinemaProductions (actor_id, production_id, entry_moment) VALUES
  (1, 1, '2022-01-01 10:00:00'),
  (2, 1, '2022-01-01 10:00:00'),
  (3, 1, '2022-01-01 10:00:00'),
  (4, 2, '2022-01-02 15:30:00'),
  (5, 3, '2022-01-03 20:00:00');


-- 2) Create a stored procedure that receives an actor, an entry moment and a cinema production and adds the new actor to the cinema production.

GO
CREATE PROCEDURE AddActorToProduction (@actor_name VARCHAR(50), @entry_moment DATETIME, @production_title VARCHAR(50))
AS
BEGIN
  DECLARE @actorid INT;
  DECLARE @productionid INT;
  
  SET @actorid = (SELECT actor_id FROM Actors WHERE name = @actor_name)

  IF @actorid IS NULL
  BEGIN
		INSERT INTO Actors (name, ranking) VALUES (@actor_name, 0)
  END 
  
  SET @productionid = (SELECT production_id FROM CinemaProductions WHERE title = @production_title)
  
  IF @productionid IS NULL 
  BEGIN
		SELECT movie_id INTO production_id FROM Movies WHERE name = @production_title
		INSERT INTO CinemaProductions (title, movie_id) VALUES (@production_title, @productionid)
  END
  
  INSERT INTO ActorCinemaProductions (actor_id, production_id, entry_moment) VALUES (@actorid, @productionid, @entry_moment);
END
GO

SELECT * FROM ActorCinemaProductions
EXEC AddActorToProduction 'Mama Mia', '2022-02-03 20:01:00', 'idk?'
SELECT * FROM ActorCinemaProductions

-- 3. Create a view that shows the name of the actors that appear in all cinema productions.
GO
CREATE OR ALTER VIEW ActorsInAllProductions 
AS
  SELECT AC.actor_id, A.name
  FROM ActorCinemaProductions AC
  JOIN Actors A ON AC.actor_id = A.actor_id
  GROUP BY AC.actor_id
  HAVING COUNT(DISTINCT AC.production_id) = (SELECT COUNT(*) FROM CinemaProductions)
GO

SELECT * FROM ActorsInAllProductions

-- 4. Create a function that returns all movies that have the relase date after *2018-01-01 and have at least p productions, where p is a function parameter.

GO
CREATE OR ALTER FUNCTION GetMoviesAfterDate (@date DATE, @p INT) RETURNS TABLE
AS
RETURN
  SELECT M.name, M.release_date
  FROM Movies M
  JOIN CinemaProductions CP ON M.movie_id = CP.movie_id
  GROUP BY M.name, M.release_date
  HAVING COUNT(*) >= @p AND M.release_date > @date
GO

SELECT * FROM GetMoviesAfterDate('2018-01-01', 2)

-- implement a function that lists the names of the departments with more than n employees, where n is a function parameter.

GO
CREATE OR ALTER FUNCTION GetDepartmentsWithMoreThan (@n INT) RETURNS TABLE
AS
RETURN
  SELECT D.name
  FROM Departments D
  JOIN Employees E ON D.department_id = E.department_id
  GROUP BY D.name
  HAVING COUNT(*) > @n
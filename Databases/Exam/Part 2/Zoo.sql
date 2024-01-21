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

CREATE TABLE Zoos (
    id INT PRIMARY KEY,
    admin VARCHAR(100),
    name VARCHAR(100)
);

CREATE TABLE Animals (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    dob DATE,
    zoo_id INT,
    FOREIGN KEY (zoo_id) REFERENCES Zoos(id)
);

CREATE TABLE Foods (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE AnimalFoods (
    animal_id INT,
    food_id INT,
    quota INT,
    PRIMARY KEY (animal_id, food_id),
    FOREIGN KEY (animal_id) REFERENCES Animals(id),
    FOREIGN KEY (food_id) REFERENCES Foods(id)
);

CREATE TABLE Visitors (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT
);

CREATE TABLE Visits (
    id INT PRIMARY KEY,
    day DATE,
    price INT,
    visitor_id INT,
    zoo_id INT,
    FOREIGN KEY (visitor_id) REFERENCES Visitors(id),
    FOREIGN KEY (zoo_id) REFERENCES Zoos(id)
);

INSERT INTO Zoos VALUES (1, 'admin1', 'zoo1'), (2, 'admin2', 'zoo2')
INSERT INTO Animals VALUES (1, 'animal1', '2019-01-01', 1), (2, 'animal2', '2019-01-01', 1), (3, 'animal3', '2019-01-01', 2)
INSERT INTO Foods VALUES (1, 'food1'), (2, 'food2')
INSERT INTO AnimalFoods VALUES (1, 1, 1), (1, 2, 2), (2, 1, 3), (2, 2, 4), (3, 1, 5), (3, 2, 6)
INSERT INTO Visitors VALUES (1, 'visitor1', 1), (2, 'visitor2', 2), (3, 'visitor3', 3)
INSERT INTO Visits VALUES (1, '2019-01-01', 1, 1, 1), (2, '2019-01-01', 2, 2, 1), (3, '2019-01-01', 3, 3, 2)

SELECT * FROM Zoos
SELECT * FROM Animals
SELECT * FROM Foods
SELECT * FROM AnimalFoods
SELECT * FROM Visitors
SELECT * FROM Visits

-- 2. Implement a stored procedure that receives an animal and deletes all the data about the food quotas for that animal.

GO
CREATE OR ALTER PROCEDURE DeleteAnimalFoodQuotas (@animal_id INT)
AS
BEGIN
    DELETE FROM AnimalFoods
    WHERE animal_id = @animal_id
END
GO

SELECT * FROM AnimalFoods
EXEC DeleteAnimalFoodQuotas 1
SELECT * FROM AnimalFoods

-- 3. Create a view that shows the ids of the zoos with the smallest number of visits.

GO
CREATE OR ALTER VIEW ZoosWithSmallestNumberOfVisits 
AS
    SELECT zoo_id, COUNT(*) AS num_visits
    FROM Visits
    GROUP BY zoo_id
    HAVING COUNT(*) = (SELECT MIN(num_visits) FROM (SELECT COUNT(*) AS num_visits FROM Visits GROUP BY zoo_id) AS count_table);
GO

SELECT * FROM ZoosWithSmallestNumberOfVisits

-- 4. Implement a function that lists the ids of the visitors who went to zoos that have at least N animals, where N >= 1 is a function parameter. 

GO
CREATE OR ALTER FUNCTION ListVisitorsWithNAnimals (@n INT) RETURNS TABLE
AS
RETURN
    SELECT visitor_id
    FROM Visits
    WHERE zoo_id IN (SELECT id FROM Zoos WHERE id IN (SELECT zoo_id FROM Animals GROUP BY zoo_id HAVING COUNT(*) >= @n));
GO

SELECT * FROM ListVisitorsWithNAnimals(1)
SELECT * FROM ListVisitorsWithNAnimals(2)
    
USE master 
GO
ALTER DATABASE ModelPractic 
SET single_user WITH ROLLBACK IMMEDIATE
DROP DATABASE ModelPractic

CREATE DATABASE ModelPractic

GO
USE ModelPractic
GO

-- 1) Write an SQL script that creates the corresponding relational data model. (4p)

CREATE TABLE ShoeModels (
    id INT PRIMARY KEY IDENTITY (1, 1),
    name VARCHAR(100),
    season VARCHAR(100)
);

CREATE TABLE Shoes (
    id INT PRIMARY KEY IDENTITY (1, 1),
    price INT,
    model_id INT FOREIGN KEY REFERENCES ShoeModels(id),
);

CREATE TABLE PresentationShops (
    id INT PRIMARY KEY IDENTITY (1, 1),
    name VARCHAR(100),
    city VARCHAR(100)
);

CREATE TABLE Women (
    id INT PRIMARY KEY IDENTITY (1, 1),
    name VARCHAR(100),
    max_amount INT
);

CREATE TABLE ShoeShop (
    shoe_id INT FOREIGN KEY REFERENCES Shoes(id),
    shop_id INT FOREIGN KEY REFERENCES PresentationShops(id),
    quantity INT,
    CONSTRAINT PK_ShoeShop PRIMARY KEY (shoe_id, shop_id)
);

CREATE TABLE WomenShoes (
    woman_id INT FOREIGN KEY REFERENCES Women(id),
    shoe_id INT FOREIGN KEY REFERENCES Shoes(id),
    quantity INT,
    spent_amount INT,
    CONSTRAINT PK_WomenShoes PRIMARY KEY (woman_id, shoe_id)
);

INSERT INTO ShoeModels (name, season) VALUES
('Classic Pump', 'Fall'),
('Ankle Boot', 'Winter'),
('Sandal', 'Summer'),
('Running Shoe', 'Spring'),
('Flat', 'Summer');

INSERT INTO Shoes (price, model_id) VALUES
(50, 1),
(100, 2),
(80, 3),
(120, 4),
(70, 5);

INSERT INTO PresentationShops (name, city) VALUES
('Shoe Palace', 'New York'),
('Happy Feet', 'Los Angeles'),
('The Shoe Box', 'Miami'),
('Footwear Unlimited', 'Chicago'),
('Sole Searching', 'San Francisco');

INSERT INTO Women (name, max_amount) VALUES
('Jane Doe', 200),
('Samantha Smith', 300),
('Emily Jones', 150),
('Amy Lee', 250),
('Maggie Brown', 175);

INSERT INTO ShoeShop (shoe_id, shop_id, quantity) VALUES
(1, 1, 10),
(2, 2, 8),
(3, 3, 15),
(4, 4, 12),
(5, 5, 5);

INSERT INTO WomenShoes (woman_id, shoe_id, quantity, spent_amount) VALUES
(1, 1, 1, 50),
(1, 2, 2, 200),
(2, 3, 1, 80),
(2, 4, 1, 120),
(3, 5, 1, 70);

SELECT * FROM ShoeModels
SELECT * FROM Shoes
SELECT * FROM PresentationShops
SELECT * FROM Women
SELECT * FROM ShoeShop
SELECT * FROM WomenShoes

-- 2) Create a stored procedure that receives a shoe. a presentation shop and the number of shoes and adds the shoe to the presentation shop.

GO
CREATE OR ALTER PROCEDURE AddShoeToShop (@shoe_id INT, @shop_id INT, @quantity INT)
AS
BEGIN
    DECLARE @existing_quantity INT;
    SET @existing_quantity = (SELECT quantity FROM ShoeShop WHERE shoe_id = @shoe_id AND shop_id = @shop_id);

    IF @existing_quantity IS NULL
    BEGIN
        INSERT INTO ShoeShop (shoe_id, shop_id, quantity) VALUES (@shoe_id, @shop_id, @quantity);
    END
    ELSE
    BEGIN
        UPDATE ShoeShop SET quantity = @existing_quantity + @quantity WHERE shoe_id = @shoe_id AND shop_id = @shop_id;
    END
END
GO

SELECT * FROM ShoeShop
EXEC AddShoeToShop 3, 2, 10
SELECT * FROM ShoeShop

-- 3) Create a view that shows the women that bought at least 2 shoes from a given shoe model.

GO
CREATE OR ALTER VIEW WomenWithMultipleShoes 
AS
	SELECT ws.woman_id, COUNT(ws.shoe_id) AS num_shoes
    FROM WomenShoes ws
    INNER JOIN Shoes s ON s.id = ws.shoe_id
	INNER JOIN ShoeModels sm ON sm.id = s.model_id
    GROUP BY ws.woman_id
    HAVING COUNT(ws.shoe_id) >= 2
GO

SELECT * FROM WomenWithMultipleShoes

-- 4) Create a function that lists the shoes that can be found in at least T presentation shops, where T>=1 is a function parameter. 

GO
CREATE OR ALTER FUNCTION FindShoesInMultipleShops(@num_shops INT) RETURNS TABLE
AS
RETURN
    SELECT s.id, s.price, sm.name AS model_name, ps.name AS shop_name, ss.quantity
    FROM Shoes s
    INNER JOIN ShoeModels sm ON s.model_id = sm.id
    INNER JOIN ShoeShop ss ON ss.shoe_id = s.id
    INNER JOIN PresentationShops ps ON ss.shop_id = ps.id
    WHERE ss.quantity > 0
    GROUP BY s.id, s.price, sm.name, ps.name, ss.quantity
    HAVING COUNT(DISTINCT ss.shop_id) >= @num_shops;
GO

SELECT * FROM FindShoesInMultipleShops(1)
SELECT * FROM FindShoesInMultipleShops(2)
SELECT * FROM FindShoesInMultipleShops(3)
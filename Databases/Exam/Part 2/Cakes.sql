USE master 
GO
ALTER DATABASE ModelPractic
SET single_user WITH ROLLBACK IMMEDIATE
DROP DATABASE ModelPractic

CREATE DATABASE ModelPractic

GO
USE ModelPractic
GO

-- 1. Write an SOL script that creates the corresponding relational data model.

CREATE TABLE Chefs (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    gender VARCHAR(6),
    date_of_birth DATE
);

CREATE TABLE CakeTypes (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    description VARCHAR(255)
);

CREATE TABLE Cakes (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    shape VARCHAR(100),
    weight DECIMAL(10, 2),
    price DECIMAL(10, 2),
    type_id INT FOREIGN KEY REFERENCES CakeTypes(id)
);

CREATE TABLE ChefSpecializations (
    chef_id INT FOREIGN KEY REFERENCES Chefs(id),
    cake_id INT FOREIGN KEY REFERENCES Cakes(id),
    CONSTRAINT PK_ChefSpecializations PRIMARY KEY (chef_id, cake_id)
);

CREATE TABLE Orders (
    id INT PRIMARY KEY,
    date DATE
);

CREATE TABLE CakeOrders (
    order_id INT FOREIGN KEY REFERENCES Orders(id),
    cake_id INT FOREIGN KEY REFERENCES Cakes(id),
    quantity INT,
    CONSTRAINT PK_CakeOrders PRIMARY KEY (order_id, cake_id)
);

INSERT INTO Chefs (id, name, gender, date_of_birth) VALUES (1, 'John Doe', 'M', '1990-01-01');
INSERT INTO Chefs (id, name, gender, date_of_birth) VALUES (2, 'Jane Smith', 'F', '1985-02-15');
INSERT INTO Chefs (id, name, gender, date_of_birth) VALUES (3, 'Bob Johnson', 'M', '1982-05-30');
INSERT INTO Chefs (id, name, gender, date_of_birth) VALUES (4, 'Sara Lee', 'F', '1995-07-22');
INSERT INTO Chefs (id, name, gender, date_of_birth) VALUES (5, 'David Lee', 'M', '1993-11-10');

INSERT INTO CakeTypes (id, name, description) VALUES (1, 'Chocolate Cake', 'A rich, moist chocolate cake');
INSERT INTO CakeTypes (id, name, description) VALUES (2, 'Strawberry Cake', 'A light and fluffy cake with fresh strawberries');
INSERT INTO CakeTypes (id, name, description) VALUES (3, 'Carrot Cake', 'A delicious cake with grated carrots and cream cheese frosting');
INSERT INTO CakeTypes (id, name, description) VALUES (4, 'Red Velvet Cake', 'A classic southern cake with cream cheese frosting');
INSERT INTO CakeTypes (id, name, description) VALUES (5, 'Lemon Cake', 'A tangy and sweet cake with lemon frosting');

INSERT INTO Cakes (id, name, shape, weight, price, type_id) VALUES (1, 'Chocolate Fudge Cake', 'Round', 2.5, 30.99, 1);
INSERT INTO Cakes (id, name, shape, weight, price, type_id) VALUES (2, 'Strawberry Shortcake', 'Square', 2, 25.99, 2);
INSERT INTO Cakes (id, name, shape, weight, price, type_id) VALUES (3, 'Carrot and Walnut Cake', 'Round', 3, 35.99, 3);
INSERT INTO Cakes (id, name, shape, weight, price, type_id) VALUES (4, 'Red Velvet Cupcakes', 'Cup', 0.5, 5.99, 4);
INSERT INTO Cakes (id, name, shape, weight, price, type_id) VALUES (5, 'Lemon Drizzle Loaf Cake', 'Loaf', 1, 12.99, 5);

INSERT INTO ChefSpecializations (chef_id, cake_id) VALUES (1, 1);
INSERT INTO ChefSpecializations (chef_id, cake_id) VALUES (2, 2);
INSERT INTO ChefSpecializations (chef_id, cake_id) VALUES (3, 3);
INSERT INTO ChefSpecializations (chef_id, cake_id) VALUES (4, 4);
INSERT INTO ChefSpecializations (chef_id, cake_id) VALUES (5, 5);

INSERT INTO Orders (id, date) VALUES (1, '2023-01-20');
INSERT INTO Orders (id, date) VALUES (2, '2023-01-19');
INSERT INTO Orders (id, date) VALUES (3, '2023-01-18');
INSERT INTO Orders (id, date) VALUES (4, '2023-01-17');
INSERT INTO Orders (id, date) VALUES (5, '2023-01-16');

INSERT INTO CakeOrders (order_id, cake_id, quantity) VALUES (1, 1, 2);
INSERT INTO CakeOrders (order_id, cake_id, quantity) VALUES (1, 2, 1);
INSERT INTO CakeOrders (order_id, cake_id, quantity) VALUES (2, 2, 3);
INSERT INTO CakeOrders (order_id, cake_id, quantity) VALUES (3, 3, 2);
INSERT INTO CakeOrders (order_id, cake_id, quantity) VALUES (4, 4, 1);
INSERT INTO CakeOrders (order_id, cake_id, quantity) VALUES (5, 5, 1);

SELECT * FROM Chefs
SELECT * FROM CakeTypes
SELECT * FROM Cakes
SELECT * FROM ChefSpecializations
SELECT * FROM Orders
SELECT * FROM CakeOrders

-- 2. Implement a stored procedure that receives an order ID, a cake name, and a positive number P representing the number of ordered pieces, 
-- and adds the cake to the order. If the cake is already on the order the number of ordered pieces is set to P.

GO
CREATE OR ALTER PROCEDURE AddCakeToOrder (@order_id INT, @cake_name VARCHAR(100), @quantity INT)
AS
BEGIN
    DECLARE @cake_id INT
    SELECT @cake_id = id FROM Cakes WHERE name = @cake_name
    
    IF EXISTS (SELECT 1 FROM CakeOrders WHERE order_id = @order_id AND cake_id = @cake_id)
    BEGIN
        UPDATE CakeOrders SET quantity = @quantity WHERE order_id = @order_id AND cake_id = @cake_id
    END
    ELSE
    BEGIN
        INSERT INTO CakeOrders (order_id, cake_id, quantity) VALUES (@order_id, @cake_id, @quantity)
    END
END
GO

SELECT * FROM CakeOrders
EXEC AddCakeToOrder 1, 'Diplomat', 3
SELECT * FROM CakeOrders
EXEC AddCakeToOrder 1, 'Cheesecake', 2
SELECT * FROM CakeOrders
EXEC AddCakeToOrder 2, 'Cheesecake', 3
SELECT * FROM CakeOrders

-- 3. Implement a function that lists the names of the chefs who are specialized in the preparation of all the cakes.

GO
CREATE OR ALTER FUNCTION GetChefsSpecializedInAllCakes ()
RETURNS TABLE
AS
RETURN
(
    SELECT DISTINCT c.name
    FROM Chefs c
    WHERE NOT EXISTS (
        SELECT 1
        FROM Cakes
        WHERE NOT EXISTS (
            SELECT 1
            FROM ChefSpecializations
            WHERE chef_id = c.id AND cake_id = Cakes.id
        )
    )
)
GO

SELECT * FROM GetChefsSpecializedInAllCakes()
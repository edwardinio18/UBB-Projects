DROP TABLE Orders;
DROP TABLE ProductsStores;
DROP TABLE Products;
DROP TABLE HasDiscount;
DROP TABLE WorksIn;
DROP TABLE Feedback;
DROP TABLE Customers;
DROP TABLE Stores;
DROP TABLE Types;
DROP TABLE Employees;
DROP TABLE Products;
DROP TABLE Discounts;

CREATE TABLE Customers (
	cID INT IDENTITY,
	cBackupCode INT NOT NULL,
	cFirstName VARCHAR(50) NOT NULL,
	cLastName VARCHAR(50) NOT NULL,
	cAddress VARCHAR(100) NOT NULL,
	cPhone VARCHAR(15) NOT NULL,
	PRIMARY KEY (cID)
);

CREATE TABLE Stores (
	sID INT IDENTITY,
	sName VARCHAR(50) NOT NULL,
	sLoc VARCHAR(50) NOT NULL,
	PRIMARY KEY (sID)
);

CREATE TABLE Types (
	tID INT IDENTITY,
	tName VARCHAR(50) NOT NULL,
	tPriceRange VARCHAR(50) NOT NULL,
	tQuantity INT NOT NULL,
	PRIMARY KEY (tID)
);

CREATE TABLE Products (
	pID INT IDENTITY,
	pName VARCHAR(50) NOT NULL,
	pPrice FLOAT NOT NULL,
	pStock INT NOT NULL,
	tID INT NOT NULL,
	PRIMARY KEY (pID),
	FOREIGN KEY (tID) REFERENCES Types(tID)
);

CREATE TABLE ProductsStores (
	pID INT FOREIGN KEY REFERENCES Products(pID) NOT NULL,
	sID INT FOREIGN KEY REFERENCES Stores(sID) NOT NULL,
	CONSTRAINT Pk_ProductsStores PRIMARY KEY (pID, sID)
);

CREATE TABLE Orders (
	oID INT IDENTITY,
	cID INT NOT NULL,
	oPrice FLOAT NOT NULL,
	oDate VARCHAR(15) NOT NULL,
	oQuantity INT NOT NULL,
	pID INT NOT NULL,
	sID INT NOT NULL,
	PRIMARY KEY (oID),
	FOREIGN KEY (cID) REFERENCES Customers(cID),
	FOREIGN KEY (pID, sID) REFERENCES ProductsStores(pID, sID)
);

CREATE TABLE Employees (
	eID INT IDENTITY,
	eFirstName VARCHAR(50) NOT NULL,
	eLastName VARCHAR(50) NOT NULL,
	eAddress VARCHAR(50) NOT NULL,
	ePhone VARCHAR(15) NOT NULL,
	PRIMARY KEY (eID)
);

CREATE TABLE WorksIn (
	eID INT FOREIGN KEY REFERENCES Employees(eID) NOT NULL,
	sID INT FOREIGN KEY REFERENCES Stores(sID) NOT NULL,
	CONSTRAINT PK_WorksIn PRIMARY KEY (eID, sID)
);

CREATE TABLE Discounts (
	dID INT IDENTITY,
	dCode INT UNIQUE NOT NULL,
	dAmount INT NOT NULL,
	dValidUntil VARCHAR(15) NOT NULL,
	PRIMARY KEY (dID)
);

CREATE TABLE HasDiscount (
	hdID INT IDENTITY,
	dID INT FOREIGN KEY REFERENCES Discounts(dID) NOT NULL,
	cID INT FOREIGN KEY REFERENCES Customers(cID) NOT NULL,
	PRIMARY KEY (hdID)
);

CREATE TABLE Feedback (
	fID INT IDENTITY,
	fDetails VARCHAR(200) NOT NULL,
	fRating INT NOT NULL,
	cID INT NOT NULL,
	PRIMARY KEY (fID),
	FOREIGN KEY (cID) REFERENCES Customers(cID)
);


-- Insert customer queries
INSERT INTO Customers (cBackupCode, cFirstName, cLastName, cAddress, cPhone) VALUES (14, 'Alex-Edward', 'Iakab', 'Strada Mircea Eliade 44C', '0729364643');
INSERT INTO Customers (cBackupCode, cFirstName, cLastName, cAddress, cPhone) VALUES (7437, 'Cristina', 'Hognogi', 'Strada Artarilor', '0723123456');
INSERT INTO Customers (cBackupCode, cFirstName, cLastName, cAddress, cPhone) VALUES (5125, 'Cristi', 'Ifrim', 'Hasdeu', '0726985123');
INSERT INTO Customers (cBackupCode, cFirstName, cLastName, cAddress, cPhone) VALUES (49182, 'Marian', 'Guceanu', 'Hasdeu', '0725849182');
INSERT INTO Customers (cBackupCode, cFirstName, cLastName, cAddress, cPhone) VALUES (1562, 'Albert', 'Havirneanu', 'Aurel Vlaicu', '0734567890');
INSERT INTO Customers (cBackupCode, cFirstName, cLastName, cAddress, cPhone) VALUES (7255, 'David', 'Horvath', 'Manastur', '0765182938');

SELECT * FROM Customers;


-- Insert store queries
INSERT INTO Stores (sName, sLoc) VALUES ('Riverside', 'Monaco Beach');
INSERT INTO Stores (sName, sLoc) VALUES ('Downtown', 'Central Station');
INSERT INTO Stores (sName, sLoc) VALUES ('Upstate', 'Sandy Groves');
INSERT INTO Stores (sName, sLoc) VALUES ('PasserBy', 'Route 66');
INSERT INTO Stores (sName, sLoc) VALUES ('Old Threeway', 'Bay Area');

SELECT * FROM Stores;


-- Insert type queries
INSERT INTO Types (tName, tPriceRange, tQuantity) VALUES ('Bronze', '$4.99-$9.99', 10);
INSERT INTO Types (tName, tPriceRange, tQuantity) VALUES ('Silver', '$9.99-$19.99', 2);
INSERT INTO Types (tName, tPriceRange, tQuantity) VALUES ('Gold', '$19.99-$39.99', 3);
INSERT INTO Types (tName, tPriceRange, tQuantity) VALUES ('Platinum', '$39.99-$69.99', 20);
INSERT INTO Types (tName, tPriceRange, tQuantity) VALUES ('Diamond', '$69.99-$99.99', 50);

SELECT * FROM Types;


-- Insert employee queries
INSERT INTO Employees (eFirstName, eLastName, eAddress, ePhone) VALUES ('Dorian', 'Hornea', 'Dunarii', '0712345678');
INSERT INTO Employees (eFirstName, eLastName, eAddress, ePhone) VALUES ('Robert', 'Harangus', 'Camin', '0789132465');
INSERT INTO Employees (eFirstName, eLastName, eAddress, ePhone) VALUES ('Dana', 'Hudema', 'Hasdeu', '0769366881');
INSERT INTO Employees (eFirstName, eLastName, eAddress, ePhone) VALUES ('Daniel', 'Gulei', 'Calea Turzii', '0711892387');
INSERT INTO Employees (eFirstName, eLastName, eAddress, ePhone) VALUES ('Alexia', 'Goia', 'Horea', '0776335241');

SELECT * FROM Employees;


-- Insert work in queries
INSERT INTO WorksIn (eID, sID) VALUES (1, 2);
INSERT INTO WorksIn (eID, sID) VALUES (2, 1);
INSERT INTO WorksIn (eID, sID) VALUES (3, 4);
INSERT INTO WorksIn (eID, sID) VALUES (4, 2);
INSERT INTO WorksIn (eID, sID) VALUES (5, 3);

SELECT * FROM WorksIn;


-- Insert feedback queries
INSERT INTO Feedback (fDetails, fRating, cID) VALUES ('Honestly, best pot I have smoked in a while! Really calms you down and brings you back down to Earth! Recommend 10/10!', 5, 1);
INSERT INTO Feedback (fDetails, fRating, cID) VALUES ('Absolutely wicked! Highly recommend!', 5, 4);
INSERT INTO Feedback (fDetails, fRating, cID) VALUES ('Seems like a bit of a scam at those prices, but still, worth a shot.', 2, 5);
INSERT INTO Feedback (fDetails, fRating, cID) VALUES ('Horrifying! I feel absolutely disgusted after trying their platinum edition marijuana! Such a let down!', 1, 2);
INSERT INTO Feedback (fDetails, fRating, cID) VALUES ('Not the best, not the worst. Always room for improvement, but nonetheless, weed was legit', 4, 3);

SELECT * FROM Feedback;


-- Insert product queries
INSERT INTO Products (pName, pPrice, pStock, tID) VALUES ('Cannabis Indica', 5, 200, 1);
INSERT INTO Products (pName, pPrice, pStock, tID) VALUES ('White Fire OG', 10.49, 180, 2);
INSERT INTO Products (pName, pPrice, pStock, tID) VALUES ('Dr. Zodiak’s Moonrocks Ice', 22.49, 70, 3);
INSERT INTO Products (pName, pPrice, pStock, tID) VALUES ('Isla OG', 45.49, 100, 4);
INSERT INTO Products (pName, pPrice, pStock, tID) VALUES ('Cannabis Caviar', 84.99, 30, 5);

SELECT * FROM Products;


-- Insert products stores queries
INSERT INTO ProductsStores (pID, sID) VALUES (1, 2);
INSERT INTO ProductsStores (pID, sID) VALUES (3, 1);
INSERT INTO ProductsStores (pID, sID) VALUES (1, 4);
INSERT INTO ProductsStores (pID, sID) VALUES (5, 2);
INSERT INTO ProductsStores (pID, sID) VALUES (3, 5);
INSERT INTO ProductsStores (pID, sID) VALUES (3, 2);
INSERT INTO ProductsStores (pID, sID) VALUES (5, 1);
INSERT INTO ProductsStores (pID, sID) VALUES (4, 2);
INSERT INTO ProductsStores (pID, sID) VALUES (5, 3);

SELECT * FROM ProductsStores;

-- Insert order queries
INSERT INTO Orders (cID, oPrice, oDate, oQuantity, sID, pID) VALUES (1, 31.47, '2022-10-15', 3, 2, 1);
INSERT INTO Orders (cID, oPrice, oDate, oQuantity, sID, pID) VALUES (2, 25, '2022-09-08', 5, 1, 3);
INSERT INTO Orders (cID, oPrice, oDate, oQuantity, sID, pID) VALUES (3, 89.96, '2022-06-07', 4, 4, 1);
INSERT INTO Orders (cID, oPrice, oDate, oQuantity, sID, pID) VALUES (4, 679.92, '2022-09-10', 8, 2, 5);
INSERT INTO Orders (cID, oPrice, oDate, oQuantity, sID, pID) VALUES (5, 45.49, '2022-03-19', 1, 5, 3);
INSERT INTO Orders (cID, oPrice, oDate, oQuantity, sID, pID) VALUES (2, 136.47, '2022-03-19', 3, 2, 3);
INSERT INTO Orders (cID, oPrice, oDate, oQuantity, sID, pID) VALUES (1, 169.98, '2022-03-19', 2, 1, 5);

SELECT * FROM Orders;

-- Insert discount queries
INSERT INTO Discounts (dCode, dAmount, dValidUntil) VALUES (194, 2, '2022-12-12');
INSERT INTO Discounts (dCode, dAmount, dValidUntil) VALUES (14, 5, '2022-05-02');
INSERT INTO Discounts (dCode, dAmount, dValidUntil) VALUES (55, 10, '2023-01-01');
INSERT INTO Discounts (dCode, dAmount, dValidUntil) VALUES (41, 15, '2023-09-26');
INSERT INTO Discounts (dCode, dAmount, dValidUntil) VALUES (125, 25, '2023-11-17');

SELECT * FROM Discounts;

-- Insert has discount queries
INSERT INTO HasDiscount (dID, cID) VALUES (1, 1);
INSERT INTO HasDiscount (dID, cID) VALUES (2, 3);
INSERT INTO HasDiscount (dID, cID) VALUES (3, 2);
INSERT INTO HasDiscount (dID, cID) VALUES (4, 5);
INSERT INTO HasDiscount (dID, cID) VALUES (5, 4);
INSERT INTO HasDiscount (dID, cID) VALUES (5, 2);

SELECT * FROM HasDiscount;





-- Update customers queries
UPDATE Customers SET cFirstName = 'Edward' WHERE cPhone = '0729364643' AND cAddress = 'Strada Mircea Eliade 44C';


-- Update products queries
UPDATE Products SET pStock = 40 WHERE pPrice < 20 OR tID % 2 = 1;


-- Update orders queries
UPDATE Orders SET oQuantity = 10 WHERE NOT sID < 3;


-- Update feedback queries
UPDATE Feedback SET fRating = 3 WHERE fDetails IS NOT NULL;


-- Update stores queries
UPDATE Stores SET sName = 'Fresh out the box' WHERE sLoc IN ('Sandy Groves', 'Bay Area');


-- Update has discount queries
UPDATE HasDiscount SET dID = 2 WHERE cID BETWEEN 1 AND 3;


-- Update employees queries
UPDATE Employees SET eAddress = 'FSEGA' WHERE eFirstName LIKE 'Dan%';





-- Delete feedback queries
DELETE FROM Feedback WHERE cID > 3;


-- Delete works in queries
DELETE FROM WorksIn WHERE eID % 2 = 1 OR sID = 2;


-- Delete employees queries
DELETE FROM Employees WHERE eAddress LIKE 'F%A';


-- Delete has discount queries
DELETE FROM HasDiscount WHERE cID BETWEEN 2 AND 4;





-- a. 2 queries with the union operation; use UNION [ALL] and OR;
-- 1. All customer names with phone number start with 0729 or address starting with str and all employee names
SELECT cFirstName FROM Customers WHERE cPhone LIKE '0729%' OR cAddress LIKE 'Str%'
UNION
SELECT eFirstName FROM Employees;

-- 2. All order dates where the order quantity is 1 or 2 and expiry dates of all discounts
SELECT oDate FROM Orders WHERE oQuantity = 1 OR oQuantity = 2
UNION
SELECT dValidUntil FROM Discounts;


-- b. 2 queries with the intersection operation; use INTERSECT and IN;
-- 1. All customer IDs from feedback where the customer ID matches a customer with the name Cristi
SELECT cID FROM Feedback
INTERSECT
SELECT cID FROM Customers WHERE cFirstName IN ('Cristi');

-- 2. All product type IDs having their name start with cannabis where each product type ID matches a type
SELECT tID FROM Products WHERE pName LIKE 'Cannabis%'
INTERSECT
SELECT tID FROM Types;


-- c. 2 queries with the difference operation; use EXCEPT and NOT IN;
-- 1. All customer names from each order where the shop ordered from has an ID of 2 except all orders where the shop ordered from has an ID of 3
SELECT c.cFirstName, c.cLastName FROM Orders o, Customers c WHERE c.cID = o.cID AND o.sID = 2
EXCEPT
SELECT c1.cFirstName, c1.cLastName FROM Orders o1, Customers c1 WHERE c1.cID = o1.cID AND o1.sID = 3;

-- 2. All customer names from feedback where their name is different than Edward except all customers where their feedback rating is less than 3
SELECT c.cFirstName, c.cLastName FROM Feedback f, Customers c WHERE c.cID = f.cID AND c.cFirstName NOT IN ('Edward')
EXCEPT
SELECT c1.cFirstName, c1.cLastName FROM Feedback f1, Customers c1 WHERE c1.cID = f1.cID AND f1.fRating < 3;


-- d. 4 queries with INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN (one query per operator);
-- one query will join at least 3 tables, while another one will join at least two many-to-many relationships;
-- 1. All distinct shop names and locations where the shop name is different than Downtown and Riverside and each order price from each distinct shop is greater than 50
SELECT DISTINCT(s.sName), s.sLoc FROM Stores s
INNER JOIN Orders o ON s.sID = o.sID
WHERE s.sName IN ('Downtown', 'Riverside') AND o.oPrice > 50;

-- 2. All customer, has discount and discount information
SELECT * FROM Customers c
LEFT JOIN HasDiscount hd ON c.cID = hd.cID
LEFT JOIN Discounts d ON hd.dID = d.dID;

-- 3. All product names, prices including VAT and product type from each order the product stock of each product found in each order is greater than 40
SELECT p.pName, p.pPrice * 1.25 AS PriceAfterVAT, t.tName
FROM Orders o
RIGHT JOIN Products p ON o.pID = p.pID
INNER JOIN Types t ON p.tID = t.tID
WHERE p.pStock > 40;

-- 4. All customer, has discount, discount, order, products store, product and store information
SELECT * FROM Customers c
FULL JOIN HasDiscount hd ON c.cID = hd.cID
FULL JOIN Discounts d ON hd.dID = d.dID
FULL JOIN Orders o ON c.cID = o.cID
FULL JOIN ProductsStores ps ON o.sID = ps.sID
FULL JOIN Products p ON ps.pID = p.pID
FULL JOIN Stores s ON ps.sID = s.sID;


-- e. 2 queries with the IN operator and a subquery in the WHERE clause;
-- in at least one case, the subquery must include a subquery in its own WHERE clause;
-- 1. All product names, product types and product prices where the product ID is found inside the result of the product price found in each order that is greater than 50 
SELECT p.pName, t.tName, p.pPrice FROM Products p
INNER JOIN Types t ON p.tID = t.tID WHERE p.pID IN
(SELECT o.pID FROM Orders o WHERE o.oPrice > 50);

-- 2. All employee names and addresses where the shop where that employee works is either Riverside or Fresh out the box
SELECT e.eFirstName, e.eLastName, e.eAddress FROM Employees e WHERE e.eID IN
(SELECT wi.eID FROM WorksIn wi WHERE wi.sID IN
(SELECT s.sID FROM Stores s WHERE s.sName IN ('Riverside', 'Fresh out the box')));


-- f. 2 queries with the EXISTS operator and a subquery in the WHERE clause;
-- 1. All customer names where their order prices was greater than 50
SELECT c.cFirstName, c.cLastName FROM Customers c WHERE EXISTS
(SELECT * FROM Orders o WHERE o.oPrice > 50 AND c.cID = o.cID);

-- 2. How many employees work in a shop that has down in its name
SELECT COUNT(e.eID) FROM Employees e
INNER JOIN WorksIn wi ON e.eID = wi.eID
INNER JOIN Stores s ON wi.sID = s.sID WHERE s.sName LIKE '%down%';


-- g. 2 queries with a subquery in the FROM clause; 
-- 1. ALl customer names where the dates of the orders that they have placed is after 2022-09-09
SELECT c.cFirstName, c.cLastName FROM
(SELECT o.cID AS CID, o.oDate AS ODATE FROM Orders o) AS ORDERS
INNER JOIN Customers c ON ORDERS.CID = c.cID WHERE ORDERS.ODATE > '2022-09-09';

-- 2. All customer names where their feedback rating was greater than 2
SELECT c.cFirstName, c.cLastName FROM
(SELECT f.cID AS CID, f.fRating AS FRATING FROM Feedback f) AS FEEDBACK
INNER JOIN Customers c ON FEEDBACK.CID = c.cID WHERE FEEDBACK.FRATING > 2;


-- h. 4 queries with the GROUP BY clause, 3 of which also contain the HAVING clause;
-- 2 of the latter will also have a subquery in the HAVING clause;
-- use the aggregation operators: COUNT, SUM, AVG, MIN, MAX;
-- 1. All distinct customer names, number of placed orders from each customer and their free gifts where the price of their order was greater than 100 and the average quantity of all orders is greater than 3
SELECT c.cFirstName, c.cLastName, COUNT(o.oID) AS NumberOfOrders, COUNT(o.oID) / 2 AS NumberOfFreeOrderGifts FROM Customers c
INNER JOIN Orders o ON c.cID = o.cID
GROUP BY c.cFirstName, c.cLastName
HAVING SUM(o.oPrice) > 100 AND AVG(o.oQuantity) > 3;

-- 2. All distinct shop names and locations and the number of products where the number of products enlisted is greater than the average number of product types
SELECT s.sName, s.sLoc, COUNT(p.pID) AS NumberOfProducts FROM Stores s
INNER JOIN ProductsStores ps ON s.sID = ps.sID
INNER JOIN Products p ON ps.pID = p.pID
GROUP BY s.sName, s.sLoc
HAVING COUNT(p.pID) >
(SELECT AVG(t.tID) AS NumberOfTypes FROM Types t);

-- 3. Top 3 distinct customer names and their raised discount aamounts along with the expiration date where the minimum discount amount is less than the maximum discount amount sorted in descending order
SELECT TOP 3 c.cFirstName, c.cLastName, d.dAmount + 0.75 * d.dAmount AS RaisedDiscount, d.dValidUntil FROM Customers c
INNER JOIN HasDiscount hd ON c.cID = hd.cID
INNER JOIN Discounts d ON hd.dID = d.dID
GROUP BY c.cFirstName, c.cLastName, d.dAmount, d.dValidUntil
HAVING MIN(d.dAmount) <
(SELECT AVG(d1.dAmount) FROM Discounts d1)
ORDER BY d.dValidUntil DESC;

-- 4. All distinct customer names and their corresponding feedback ratings where they gave a rating of 4
SELECT c.cFirstName, c.cLastName, f.fRating FROM Customers c
INNER JOIN Feedback f ON c.cID = f.cID
GROUP BY c.cFirstName, c.cLastName, f.fRating
HAVING f.fRating + 1 = 5;


-- i. 4 queries using ANY and ALL to introduce a subquery in the WHERE clause (2 queries per operator);
-- rewrite 2 of them with aggregation operators, and the other 2 with IN / [NOT] IN.
-- 1. First order price where the order date is equal to any of the order dates after 2022-06-10
SELECT TOP 1 o.oPrice FROM Orders o
WHERE o.oDate = ANY
(SELECT o1.oDate FROM Orders o1 WHERE o1.oDate > '2022-06-10')
ORDER BY o.oPrice ASC;

-- 2. First product name and price where the product price is equal to any of the order prices where their price is less than 50
SELECT TOP 1 p.pName, p.pPrice FROM Products p
WHERE p.pPrice = ANY
(SELECT o.oPrice FROM Orders o WHERE o.oPrice < 50)
ORDER BY p.pPrice DESC;

-- 3. First 2 distinct customer names where the discount amount is not equal to all discount amounts less than 5
SELECT DISTINCT TOP 2 c.cFirstName, c.cLastName FROM Customers c
INNER JOIN HasDiscount hd ON c.cID = hd.cID
INNER JOIN Discounts d ON hd.dID = d.dID
WHERE d.dAmount <> ALL
(SELECT d1.dAmount FROM Discounts d1 WHERE d1.dAmount < 5)
ORDER BY c.cLastName DESC;

-- 4. All customer names and their feedback ratings where the customer who gave the rating is not Cristina, Albert or Marian and the rating is not an even number
SELECT c.cFirstName, c.cLastName, f.fRating FROM Customers c
INNER JOIN Feedback f ON c.cID = f.cID
WHERE f.fRating <> ALL
(SELECT f1.fRating FROM Feedback f1
INNER JOIN Customers c1 ON c1.cID = f1.cID WHERE c1.cFirstName IN ('Cristina', 'Albert', 'Marian') AND f1.fRating % 2 = 0);

-- 5. (rewrite of 2.)
SELECT TOP 1 p.pName, p.pPrice FROM Products p
WHERE p.pPrice =
(SELECT MAX(o.oPrice) FROM Orders o WHERE o.oPrice < 50);

-- 6. (rewrite of 1.)
SELECT TOP 1 o.oPrice FROM Orders o
INNER JOIN Customers c ON o.cID = c.cID
WHERE o.oPrice =
(SELECT MIN(o1.oPrice) FROM Orders o1 WHERE o1.oDate > '2022-06-10');

-- 7. (rewrite of 3.)
SELECT DISTINCT TOP 2 c.cFirstName, c.cLastName FROM Customers c
INNER JOIN HasDiscount hd ON c.cID = hd.cID
INNER JOIN Discounts d ON hd.dID = d.dID
WHERE d.dAmount NOT IN
(SELECT d1.dAmount FROM Discounts d1 WHERE d1.dAmount < 5)
ORDER BY c.cLastName DESC;

-- 8. (rewrite of 4.)
SELECT c.cFirstName, c.cLastName, f.fRating FROM Customers c
INNER JOIN Feedback f ON c.cID = f.cID
WHERE f.fRating NOT IN
(SELECT f1.fRating FROM Feedback f1
INNER JOIN Customers c1 ON c1.cID = f1.cID WHERE c1.cFirstName IN ('Cristina', 'Albert', 'Marian') AND f1.fRating % 2 = 0);
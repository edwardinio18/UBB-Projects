-- Procedures

-- 1.
-- a table with a single-column primary key and no foreign keys;
-- Types

-- 2.
-- a table with a single-column primary key and at least one foreign key;
-- Products

-- 3.
-- a table with a multicolumn primary key;
-- ProductsStores

-- 1 insert.
CREATE OR ALTER PROCEDURE addProductType
@n INT
AS
BEGIN
	DECLARE @i INT = 0
	WHILE @i < @n
	BEGIN
		INSERT INTO Types (tName, tPriceRange) VALUES (CONCAT('Type ', @i), CONCAT('', @i))
		SET @i = @i + 1
	END
END


-- 1 delete.
CREATE OR ALTER PROCEDURE deleteProductType
AS
BEGIN
	DELETE FROM Types WHERE tName LIKE 'Type %'
END


-- 2. insert
CREATE OR ALTER PROCEDURE addProduct
@n INT
AS
BEGIN
	DECLARE @i INT = 0
	DECLARE @type INT = (SELECT TOP 1 tID FROM Types WHERE tName LIKE 'Type %')
	WHILE @i < @n
	BEGIN
		INSERT INTO Products (pName, pPrice, pStock, tID) VALUES (CONCAT('Type ', @i), 0, 0, @type)
		SET @i = @i + 1
	END
END

-- 2. delete
CREATE OR ALTER PROCEDURE deleteProduct
AS
BEGIN
	DELETE FROM Products WHERE pName LIKE 'Type %'
END


-- 3. insert
CREATE OR ALTER PROCEDURE addProductsStores
@n INT
AS
BEGIN
	DECLARE @pID INT
	DECLARE @sID INT
	DECLARE curs CURSOR
		FOR
		SELECT p.pID, s.sID FROM (SELECT p.pID FROM Products p WHERE pName LIKE 'Type %') p CROSS JOIN Stores s
	OPEN curs
	DECLARE @i INT = 0
	WHILE @i < @n
	BEGIN
		FETCH NEXT FROM curs INTO @pID, @sID
		INSERT INTO ProductsStores (pID, sID, psQuantity) VALUES (@pID, @sID, -420)
		SET @i = @i + 1
	END
	CLOSE curs
	DEALLOCATE curs
END

-- 3. delete
CREATE OR ALTER PROCEDURE deleteProductsStores
AS
BEGIN
	DELETE FROM ProductsStores WHERE psQuantity = -420
END


-- Views

-- 1.
-- a view with a SELECT statement operating on one table;

-- 2.
-- a view with a SELECT statement that operates on at least 2 different tables and contains at least one JOIN operator;

-- 3.
-- a view with a SELECT statement that has a GROUP BY clause, operates on at least 2 different tables and contains at least one JOIN operator.


-- 1.
CREATE OR ALTER VIEW view1
AS
	SELECT * FROM Types

-- 2.
CREATE OR ALTER VIEW view2
AS
	SELECT p.pName, t.tName FROM Products p
	JOIN Types t ON p.tID = t.tID

-- 3.
CREATE OR ALTER VIEW view3
AS
	SELECT AVG(p.pStock) AS avgStock, t.tName FROM Products p
	JOIN Types t ON p.tID = t.tID
	WHERE p.pPrice < 30
	GROUP BY t.tName

	
	
CREATE OR ALTER PROCEDURE selectView
(@name VARCHAR(100))
AS
BEGIN
	DECLARE @sql VARCHAR(250) = CONCAT('SELECT * FROM ', @name)
	EXEC (@sql)
END


INSERT INTO Tests (Name) VALUES ('addProductType'), ('deleteProductType'), ('addProduct'), ('deleteProduct'), ('addProductsStores'), ('deleteProductsStores'), ('selectView')

INSERT INTO Tables (Name) VALUES ('Types'), ('Products'), ('ProductsStores')

INSERT INTO Views (Name) VALUES ('view1'), ('view2'), ('view3')

INSERT INTO TestViews (TestID, ViewID) VALUES (7, 1), (7, 2), (7, 3)

INSERT INTO TestTables (TestID, TableID, NoOfRows, [Position]) VALUES (1, 1, 420, 1), (2, 1, 4200, 2), (3, 2, 690, 3), (4, 2, 6900, 1), (5, 3, 4269, 2), (6, 3, 6942, 3)



-- in TestRuns we save when the test started and when it finished
-- in TestRunsTables we save when the test for tables started
-- in TestRunsViews we save when the test for views started
-- for each TestRun we have to have 3 lines in TestRunsTable and TestRunsViews
-- must be ran >= 5 times




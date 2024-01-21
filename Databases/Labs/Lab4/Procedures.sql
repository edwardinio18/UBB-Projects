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
	DECLARE c CURSOR
		LOCAL
		FOR
		SELECT p.pID, s.sID FROM (SELECT p.pID FROM Products p WHERE pName LIKE 'Type %') p CROSS JOIN Stores s
	OPEN c
	DECLARE @i INT = 0
	WHILE @i < @n
	BEGIN
		FETCH NEXT FROM c INTO @pID, @sID
		INSERT INTO ProductsStores (pID, sID, psQuantity) VALUES (@pID, @sID, -420)
		SET @i = @i + 1
	END
	CLOSE c
	DEALLOCATE c
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

INSERT INTO TestTables (TestID, TableID, NoOfRows, [Position]) VALUES (1, 1, 69, 1), (2, 1, 420, 3), (3, 2, 429, 2), (4, 2, 694, 2), (5, 3, 496, 3), (6, 3, 296, 1)

CREATE OR ALTER PROCEDURE runDeleteTests
AS
BEGIN
	DECLARE @tID INT
	DECLARE @tName VARCHAR(128)
	
	DECLARE c CURSOR
		LOCAL
		FOR SELECT t2.Name, t1.TestID FROM TestTables t1 INNER JOIN Tests t2 ON t1.TestID = t2.TestID WHERE t2.Name LIKE 'delete%'
		ORDER BY t1.[Position] ASC
		
	OPEN c
	FETCH NEXT FROM c INTO @tName, @tID
	WHILE @@FETCH_STATUS = 0
	BEGIN
		
		EXEC @tName
		
		FETCH NEXT FROM c INTO @tName, @tID
	END
	
	CLOSE c
	DEALLOCATE c
END

CREATE OR ALTER PROCEDURE runInsertTests (@tID INT)
AS
BEGIN
	DECLARE @testID INT
	DECLARE @tableID INT
	DECLARE @rows INT
	DECLARE @tName VARCHAR(128)
	
	DECLARE c CURSOR
		LOCAL
		FOR SELECT t2.Name, t1.TestID, t1.TableID, t1.NoOfRows FROM TestTables t1 INNER JOIN Tests t2 ON t1.TestID = t2.TestID WHERE t2.Name LIKE 'add%'
		ORDER BY [Position] ASC
		
	OPEN c
	FETCH NEXT FROM c INTO @tName, @testID, @tableID, @rows
	WHILE @@FETCH_STATUS = 0
	BEGIN
		DECLARE @t1 DATETIME = GETDATE()
		
		EXEC @tName @rows
		
		DECLARE @t2 DATETIME = GETDATE()
		
		INSERT INTO TestRunTables (TestRunID, TableID, StartAt, EndAt) VALUES (@tID, @tableID, @t1, @t2)
		
		FETCH NEXT FROM c INTO @tName, @testID, @tableID, @rows
	END
	
	CLOSE c
	DEALLOCATE c
END

CREATE OR ALTER PROCEDURE runViewTests
@tID INT
AS
BEGIN
	DECLARE @vID INT
	
	DECLARE c CURSOR
		LOCAL
		FOR SELECT ViewID FROM TestViews
		
	OPEN c
	FETCH NEXT FROM c INTO @vID
	WHILE @@FETCH_STATUS = 0
	BEGIN
		DECLARE @t1 DATETIME = GETDATE()
		
		DECLARE @vName VARCHAR(128) = (SELECT Name FROM Views WHERE ViewID = @vID)
		DECLARE @testName VARCHAR(128) = (SELECT Name FROM Tests t INNER JOIN TestViews tv ON t.TestID = tv.TestID WHERE tv.ViewID = @vID)
		
		EXEC @testName @vName
		
		DECLARE @t2 DATETIME = GETDATE()
		
		INSERT INTO TestRunViews (TestRunID, ViewID, StartAt, EndAt) VALUES (@tID, @vID, @t1, @t2)
		
		FETCH NEXT FROM c INTO @vID
	END
	
	CLOSE c
	DEALLOCATE c
END

CREATE OR ALTER PROCEDURE runProcs
AS
BEGIN
	INSERT INTO TestRuns (StartAt) VALUES (GETDATE())
	
	DECLARE @tID INT = SCOPE_IDENTITY()
	
	DECLARE @t0 DATETIME = GETDATE()
	
	EXEC runDeleteTests
	EXEC runInsertTests @tID
	EXEC runViewTests @tID
	
	UPDATE TestRuns SET Description = 'test tigara', EndAt = GETDATE() WHERE TestRunID = @tID
END

CREATE OR ALTER PROCEDURE runAllTests (@n INT)
AS
BEGIN
	DECLARE @i INT = 0
	WHILE @i < @n
	BEGIN
		EXEC runProcs
		
		SET @i = @i + 1
	END
	
	SELECT * FROM TestRunTables
	SELECT * FROM TestRunViews
	SELECT * FROM TestRuns
END

EXEC runAllTests 1
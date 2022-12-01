-- a1. modify the type of a column
-- change fRating from int to string

CREATE OR ALTER PROCEDURE fRatingIntToString
AS
BEGIN
	ALTER TABLE Feedback
	ALTER COLUMN fRating VARCHAR(1)
END

EXEC fRatingIntToString

-- a2. modify the type of a column
-- undo fRatingIntToString

CREATE OR ALTER PROCEDURE undoFRatingIntToString
AS
BEGIN
	ALTER TABLE Feedback
	ALTER COLUMN fRating INT
END

EXEC undoFRatingIntToString

-- b1. add / remove a column
-- add a column cCredibility

CREATE OR ALTER PROCEDURE addCredibility
AS
BEGIN
	ALTER TABLE Feedback
	ADD cCredibility INT
END

EXEC addCredibility 

-- b2. add / remove a column
-- undo addCredibility

CREATE OR ALTER PROCEDURE undoAddCredibility
AS
BEGIN
	ALTER TABLE Feedback
	DROP COLUMN cCredibility
END

EXEC undoAddCredibility

-- c1. add / remove a DEFAULT constraint
-- add default product stock = 0

CREATE OR ALTER PROCEDURE addDefaultProdStock
AS
BEGIN
	ALTER TABLE Products
	ADD CONSTRAINT prodStockDef DEFAULT 0
	FOR pStock
END

EXEC addDefaultProdStock

-- c2. add / remove a DEFAULT constraint
-- undo default product stock = 0

CREATE OR ALTER PROCEDURE undoAddDefaultProdStock
AS
BEGIN
	ALTER TABLE Products
	DROP CONSTRAINT prodStockDef
END

EXEC undoAddDefaultProdStock

-- d1. add / remove a primary key
-- remove a primary key from works in

CREATE OR ALTER PROCEDURE removePrimaryKeyWorksIn
AS
BEGIN
	ALTER TABLE WorksIn
	DROP CONSTRAINT PK_WorksIn
END

EXEC removePrimaryKeyWorksIn

-- d2. add / remove a primary key
-- add a primary key to works in

CREATE OR ALTER PROCEDURE addPrimaryKeyWorksIn
AS
BEGIN
	ALTER TABLE WorksIn
	ADD CONSTRAINT PK_WorksIn
	PRIMARY KEY (eID, sID)
END

EXEC addPrimaryKeyWorksIn

-- e1. add / remove a candidate key
-- add a candidate key (cFirstName and cPhone is a candidate key)

CREATE OR ALTER PROCEDURE addCandidateKeyCustomers
AS
BEGIN
	ALTER TABLE Customers
	ADD CONSTRAINT CK_Customers UNIQUE(cFirstName, cPhone)
END

EXEC addCandidateKeyCustomers

-- e2. add / remove a candidate key
-- remove a candidate key (cFirstName and cPhone)

CREATE OR ALTER PROCEDURE undoAddCandidateKeyCustomers
AS
BEGIN
	ALTER TABLE Customers
	DROP CONSTRAINT CK_Customers
END

EXEC undoAddCandidateKeyCustomers

-- f1. add / remove a foreign key
-- remove a foreign key (products type)

CREATE OR ALTER PROCEDURE removeForeignKeyProducts
AS
BEGIN
	ALTER TABLE Products
	DROP CONSTRAINT FK__Products__tID__05D8E0BE
END

EXEC removeForeignKeyProducts

-- f2. add / remove a foreign key
-- add a foreign key (products type)

CREATE OR ALTER PROCEDURE addForeignKeyProducts
AS
BEGIN
	ALTER TABLE Products
	ADD CONSTRAINT FK__Products__tID__05D8E0BE
	FOREIGN KEY(tID) REFERENCES Types(tID)
END

EXEC addForeignKeyProducts

-- g1. create / drop a table
-- create a table (rewards table)

CREATE OR ALTER PROCEDURE createRewardsTable
AS
BEGIN
	CREATE TABLE Rewards (
		rID INT IDENTITY,
		rName VARCHAR(50) NOT NULL,
		rValue FLOAT NOT NULL
	)
END

EXEC createRewardsTable

-- g2. create / drop a table
-- remove a table (rewards table)

CREATE OR ALTER PROCEDURE removeRewardsTable
AS
BEGIN
	DROP TABLE IF EXISTS Rewards
END

EXEC removeRewardsTable



-- second part of homework
-- create a new table that keeps track of the current version

CREATE TABLE CurrentVersion (
	currVer INT DEFAULT 0
)

INSERT INTO CurrentVersion (currVer) VALUES (0)

-- create a new table that holds the version of the database schema
CREATE TABLE ProcTable (
	ptID INT IDENTITY,
	firstProc VARCHAR(50),
	secondProc VARCHAR(50)
)

INSERT INTO ProcTable(firstProc, secondProc) VALUES ('fRatingIntToString', 'undoFRatingIntToString');
INSERT INTO ProcTable(firstProc, secondProc) VALUES ('addCredibility', 'undoAddCredibility');
INSERT INTO ProcTable(firstProc, secondProc) VALUES ('addDefaultProdStock', 'undoAddDefaultProdStock');
INSERT INTO ProcTable(firstProc, secondProc) VALUES ('removePrimaryKeyWorksIn', 'addPrimaryKeyWorksIn');
INSERT INTO ProcTable(firstProc, secondProc) VALUES ('addCandidateKeyCustomers', 'undoAddCandidateKeyCustomers');
INSERT INTO ProcTable(firstProc, secondProc) VALUES ('removeForeignKeyProducts', 'addForeignKeyProducts');
INSERT INTO ProcTable(firstProc, secondProc) VALUES ('createRewardsTable', 'removeRewardsTable');

CREATE OR ALTER PROCEDURE goToVer(@ver INT)
AS
BEGIN
	DECLARE @currVer INT
	IF @ver < 0 OR @ver > 7
		BEGIN
			RAISERROR ('ERROR: Version must be greater than 0 and smaller than 7!', 10, 1)
			RETURN
		END
	ELSE
		BEGIN
			DECLARE @currentProc VARCHAR(100)
			SET @currVer = (SELECT currVer FROM CurrentVersion)

			IF @currVer < @ver 
				BEGIN
					WHILE @currVer < @ver 
						BEGIN
							SET @currentProc = (SELECT firstProc FROM ProcTable WHERE ptID = @currVer + 1)

							EXEC (@currentProc)
							SET @currVer += 1
						END
				END
			ELSE
				IF @currVer > @ver 
					BEGIN
						WHILE @currVer > @ver 
							BEGIN
								SET @currentProc = (SELECT secondProc FROM ProcTable WHERE ptID = @currVer)

								EXEC (@currentProc)
								SET @currVer -= 1
							END
					END
				ELSE
					IF @currVer = @ver
						BEGIN
							RETURN
						END

			UPDATE CurrentVersion SET currVer = @currVer
		END
END

SELECT * FROM CurrentVersion;

EXEC goToVer 3
EXEC goToVer 7
EXEC goToVer 5
EXEC goToVer 2
EXEC goToVer 0
EXEC goToVer -1
EXEC goToVer 8
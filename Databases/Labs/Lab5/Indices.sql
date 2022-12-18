-- Ta = Discounts
-- Tb = Customers
-- Tc = HasDiscount

-- clustered index scan
-- cost = 0.0032875
SELECT * FROM Discounts

-- clustered index seek
-- cost = 0.0032875 
SELECT * FROM Discounts
WHERE dCode = 41

-- non-clustered index scan
-- cost = 0.0032875
SELECT dCode FROM Discounts
ORDER BY dCode

-- non-clustered index seek
-- cost = 0.0032832
SELECT dCode FROM Discounts
WHERE dCode > 100

-- key lookup
-- cost = 0.01313658
SELECT dCode, dAmount FROM Discounts
WHERE dCode = 55

-- b) Write a query on table Tb with a WHERE clause of the form WHERE b2 = value and analyze its execution plan.
-- Create a nonclustered index that can speed up the query.
-- Examine the execution plan again.

-- before adding non clustered index
-- cost = 0.0032886
SELECT cBackupCode FROM Customers
WHERE cBackupCode = 7437

CREATE NONCLUSTERED INDEX NCI_Customers_IDX ON Customers(cBackupCode)

-- after adding non clustered index
-- cost = 0.0032831
SELECT cBackupCode FROM Customers
WHERE cBackupCode = 7437

-- c) Create a view that joins at least 2 tables.
-- Check whether existing indexes are helpful;
-- if not, reassess existing indexes / examine the cardinality of the tables.

CREATE OR ALTER VIEW V1
AS
SELECT d.dID, c.cID, hd.hdID FROM HasDiscount hd
INNER JOIN Discounts d ON hd.dID = d.dID
INNER JOIN Customers c ON hd.cID = c.cID
WHERE d.dCode % 2 = 0 AND c.cBackupCode < 5500

SELECT * FROM V1

-- with existing indices
-- cost = 0.01835286

-- with a non clustered index added to cBackupCode
-- cost = 0.01835286
CREATE NONCLUSTERED INDEX NCI_Customers_IDX ON Customers(cBackupCode)

-- with a non clustered index added to dCode
-- cost = 0.01835286
CREATE NONCLUSTERED INDEX NCI_Discounts_IDX ON Discounts(dCode)

-- with 2 non clustered index added to to HasDiscount
-- cost = 0.01723134
CREATE NONCLUSTERED INDEX NCI_HasDiscount_IDX ON HasDiscount(dID, cID)
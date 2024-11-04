-- Drop all foreign key constraints
DECLARE @sql NVARCHAR(MAX) = '';

SELECT @sql += 'ALTER TABLE ' + QUOTENAME(OBJECT_SCHEMA_NAME(parent_object_id)) 
               + '.' + QUOTENAME(OBJECT_NAME(parent_object_id)) 
               + ' DROP CONSTRAINT ' + QUOTENAME(name) + ';' + CHAR(13)
FROM sys.foreign_keys;

EXEC sp_executesql @sql;


-- Drop all functions
SET @sql = '';

SELECT @sql += 'DROP FUNCTION ' + QUOTENAME(SCHEMA_NAME(schema_id)) + '.' + QUOTENAME(name) + ';' + CHAR(13)
FROM sys.objects
WHERE type IN ('FN', 'IF', 'TF'); -- FN = Scalar function, IF = Inline table-valued function, TF = Table-valued function

EXEC sp_executesql @sql;


-- Drop all stored procedures
SET @sql = '';

SELECT @sql += 'DROP PROCEDURE ' + QUOTENAME(SCHEMA_NAME(schema_id)) + '.' + QUOTENAME(name) + ';' + CHAR(13)
FROM sys.objects
WHERE type = 'P'; -- P = Stored procedure

EXEC sp_executesql @sql;


-- Drop all user-defined types
SET @sql = '';

SELECT @sql += 'DROP TYPE ' + QUOTENAME(name) + ';' + CHAR(13)
FROM sys.types
WHERE is_user_defined = 1;

EXEC sp_executesql @sql;


-- Drop all tables
EXEC sp_MSforeachtable 'DROP TABLE ?';

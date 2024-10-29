use WorkBoard;

IF OBJECT_ID('dbo.usp_DeleteOldTasks', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_DeleteOldTasks;
END

GO

CREATE PROCEDURE usp_DeleteOldTasks
AS
BEGIN
    DELETE FROM [dbo].[Task]
    WHERE FlgDelete = 1
    AND DateDelete <= DATEADD(MONTH, -1, GETDATE());  
END
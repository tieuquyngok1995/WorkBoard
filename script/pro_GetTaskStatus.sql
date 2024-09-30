use WorkBoard;

IF OBJECT_ID('dbo.GetTaskStatus', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.GetTaskStatus;
END

GO

CREATE PROCEDURE GetTaskStatus
AS
BEGIN

	SET NOCOUNT ON;

SELECT 
	ID as [key]
	,name as value
	FROM [dbo].[TaskStatuses] 
END

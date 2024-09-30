use WorkBoard;

IF OBJECT_ID('dbo.GetTaskType', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.GetTaskType;
END

GO

CREATE PROCEDURE GetTaskType
AS
BEGIN

	SET NOCOUNT ON;

SELECT 
	ID as [key]
	,name as value
	FROM [dbo].[TaskType] 
END

use WorkBoard;

IF OBJECT_ID('dbo.usp_GetTaskType', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_GetTaskType;
END

GO

CREATE PROCEDURE usp_GetTaskType
AS
BEGIN

SET NOCOUNT ON;

	SELECT 
	  ID as [key]
	 ,name as value
	FROM [dbo].[TaskType] 
END

use WorkBoard;

IF OBJECT_ID('dbo.GetTaskTypeJP', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.GetTaskTypeJP;
END

GO

CREATE PROCEDURE GetTaskTypeJP
AS
BEGIN

	SET NOCOUNT ON;

SELECT 
	ID as [key]
	,NameJP as value
	FROM [dbo].[TaskType] 
END

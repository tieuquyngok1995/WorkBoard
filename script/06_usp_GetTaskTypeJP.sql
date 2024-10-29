use WorkBoard;

IF OBJECT_ID('dbo.usp_GetTaskTypeJP', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_GetTaskTypeJP;
END

GO

CREATE PROCEDURE usp_GetTaskTypeJP
AS
BEGIN

SET NOCOUNT ON;

	SELECT 
	  ID as [key]
	 ,NameJP as value
	FROM [dbo].[TaskType] 
END

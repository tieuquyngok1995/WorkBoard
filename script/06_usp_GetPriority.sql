IF OBJECT_ID('dbo.usp_GetPriority', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_GetPriority;
END

GO

CREATE PROCEDURE usp_GetPriority
AS
BEGIN

SET NOCOUNT ON;

	SELECT 
	  ID as [key]
	 ,name as value
	FROM [dbo].[Priority] 
END

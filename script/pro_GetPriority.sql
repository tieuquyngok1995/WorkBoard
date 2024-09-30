use WorkBoard;

IF OBJECT_ID('dbo.GetPriority', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.GetPriority;
END

GO

CREATE PROCEDURE GetPriority
AS
BEGIN

	SET NOCOUNT ON;

SELECT 
	ID as [key]
	,name as value
	FROM [dbo].[Priority] 
END

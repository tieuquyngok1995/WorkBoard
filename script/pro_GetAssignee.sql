IF OBJECT_ID('dbo.GetAssignee', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.GetAssignee;
END

GO

CREATE PROCEDURE GetAssignee
AS
BEGIN

	SET NOCOUNT ON;

SELECT 
	UserID as [key]
	,UserName as value
	FROM [dbo].[Users] 
END

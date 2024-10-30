IF OBJECT_ID('dbo.usp_GetAssignee', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_GetAssignee;
END

GO

CREATE PROCEDURE usp_GetAssignee
AS
BEGIN

SET NOCOUNT ON;

	SELECT 
	  UserID as [key]
	 ,UserName as value
	FROM [dbo].[Users] 
END

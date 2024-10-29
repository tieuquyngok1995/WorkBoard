use WorkBoard;

IF OBJECT_ID('dbo.usp_GetRole', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_GetRole;
END

GO

CREATE PROCEDURE usp_GetRole
AS
BEGIN

SET NOCOUNT ON;

	SELECT 
	  RoleID as [key]
	 ,RoleName as value
	FROM [dbo].[Roles] 
END

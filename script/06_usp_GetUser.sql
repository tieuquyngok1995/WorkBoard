IF OBJECT_ID('dbo.usp_GetUser', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_GetUser;
END

GO

CREATE PROCEDURE usp_GetUser
AS
BEGIN

SET NOCOUNT ON;

SELECT [UserID]
      ,[Email]
      ,[UserName]
      ,[Password]
	  ,U.[RoleID]
      ,R.[RoleName]
  FROM [dbo].[Users] U
	LEFT JOIN [dbo].[Roles] R
			ON U.RoleID = R.RoleID
  WHERE U.[RoleID] != 0
  ORDER BY 
	RoleID ASC, UserID ASC
END

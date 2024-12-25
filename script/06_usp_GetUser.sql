IF OBJECT_ID('dbo.usp_GetUser', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_GetUser;
END

GO

CREATE PROCEDURE usp_GetUser
	@userID smallint 
AS
BEGIN

SET NOCOUNT ON;

SELECT [UserID]
      ,[Email]
      ,[UserName]
      ,[PasswordEmail] as [Password]
	  ,U.[RoleID]
      ,R.[RoleName]
  FROM [dbo].[Users] U
	LEFT JOIN [dbo].[Roles] R
			ON U.RoleID = R.RoleID
  WHERE U.UserID = @userID

END

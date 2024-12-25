IF OBJECT_ID('dbo.usp_GetListUser', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_GetListUser;
END

GO

CREATE PROCEDURE usp_GetListUser
	@userID smallint 
AS
BEGIN

SET NOCOUNT ON;

DECLARE @roleID as smallint;
SET @roleID = (select roleid from Users where UserID = @userID);

SELECT [UserID]
      ,[Email]
      ,[UserName]
      ,[PasswordEmail] as [Password]
	  ,U.[RoleID]
      ,R.[RoleName]
  FROM [dbo].[Users] U
	LEFT JOIN [dbo].[Roles] R
			ON U.RoleID = R.RoleID
  WHERE (@roleID = 0) OR (U.RoleID != 0)
  ORDER BY 
	RoleID ASC, UserID ASC
END

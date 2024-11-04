IF OBJECT_ID('dbo.usp_UpdateUser', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_UpdateUser;
END

GO

CREATE PROCEDURE usp_UpdateUser
	@userID smallint,
    @email nvarchar(100),
    @userName nvarchar(50), 
    @password nvarchar(256),
	@passwordEmail NVARCHAR(256),
    @roleID int
AS
BEGIN
	UPDATE [dbo].[Users] SET 
	   [Email] = @email
      ,[UserName] = @userName
      ,[Password] = @password
	  ,[PasswordEmail] = @passwordEmail
      ,[RoleID] = @roleID
	WHERE UserID = @userID
END

use WorkBoard;

IF OBJECT_ID('dbo.usp_DeleteUser', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_DeleteUser;
END

GO

CREATE PROCEDURE usp_DeleteUser
	@userID smallint
AS
BEGIN
	DELETE FROM [dbo].[Users]
      WHERE UserID = @userID
END

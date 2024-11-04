IF OBJECT_ID('dbo.usp_GetEmailFromUser', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_GetEmailFromUser;
END

GO

CREATE PROCEDURE usp_GetEmailFromUser
	@listUserID NVARCHAR(100) 
AS
BEGIN

SET NOCOUNT ON;

  SELECT [Email]
  FROM Users
  WHERE
	 (@listUserID = '-1' AND RoleID != 0) OR 
    UserID IN (SELECT CAST(value AS INT) FROM STRING_SPLIT(@listUserID, ','));
END

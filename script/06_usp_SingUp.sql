﻿IF OBJECT_ID('dbo.usp_SignUp', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_SignUp;
END

GO

CREATE PROCEDURE usp_SignUp
	@Email NVARCHAR(100),
	@UserName NVARCHAR(50),
	@Password NVARCHAR(256),
	@PasswordEmail NVARCHAR(256)
AS
BEGIN
    -- Check exist user
    IF NOT EXISTS (
        SELECT 1 
        FROM Users 
        WHERE UserName = @UserName 
        AND Email = @Email
    )
    BEGIN
        -- register user
        INSERT INTO Users
		VALUES( @Email, @UserName, @Password, @PasswordEmail, 2)

		SELECT 
            UserID,
            Email,
            UserName,
            Password,
			PasswordEmail,
            RoleID
        FROM Users
        WHERE UserName = @UserName;
    END
END;
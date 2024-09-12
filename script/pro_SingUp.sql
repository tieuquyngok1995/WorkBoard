CREATE PROCEDURE SignUp
	@Email NVARCHAR(50),
    @UserName NVARCHAR(50),
    @Password NVARCHAR(50)
AS
BEGIN
    -- Check exist user
    IF NOT EXISTS (
        SELECT 1 
        FROM Users 
        WHERE UserName = @UserName 
        AND Password = @Password
    )
    BEGIN
        -- register user
        INSERT INTO Users
		VALUES( @Email, @UserName, @Password, 3)

		SELECT 
            UserID,
            Email,
            UserName,
            Password,
            RoleID
        FROM Users
        WHERE UserName = @UserName 
        AND Password = @Password;
    END
END;
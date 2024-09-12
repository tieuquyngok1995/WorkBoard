CREATE PROCEDURE SignIn
    @UserName NVARCHAR(50),
    @Password NVARCHAR(50)
AS
BEGIN
    -- Check exist user
    IF EXISTS (
        SELECT 1 
        FROM Users 
        WHERE UserName = @UserName 
        AND Password = @Password
    )
    BEGIN
        -- get user
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
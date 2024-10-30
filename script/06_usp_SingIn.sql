IF OBJECT_ID('dbo.usp_SignIn', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_SignIn;
END

GO

CREATE PROCEDURE usp_SignIn
    @UserName NVARCHAR(50)
AS
BEGIN
    -- Check exist user
    IF EXISTS (
        SELECT 1 
        FROM Users 
        WHERE UserName = @UserName
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
    END
    
END;
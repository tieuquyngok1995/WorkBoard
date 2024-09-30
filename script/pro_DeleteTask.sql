use WorkBoard;

IF OBJECT_ID('dbo.DeleteTask', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.DeleteTask;
END

GO

CREATE PROCEDURE DeleteTask
    @moduleID nvarchar(25)
AS
BEGIN
    UPDATE [dbo].[Task] SET 
		[FlgDelete] = 1
	FROM [dbo].[Task] WHERE 
		ModuleID = @moduleID AND 
		FlgDelete = 0
END

IF OBJECT_ID('dbo.usp_DeleteTask', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_DeleteTask;
END

GO

CREATE PROCEDURE usp_DeleteTask
	@id int,
    @moduleID nvarchar(25)
AS
BEGIN
    UPDATE [dbo].[Task] SET 
		[FlgDelete] = 1,
		[DateDelete] = GETDATE()
	FROM [dbo].[Task] WHERE 
		ID = @id AND
		ModuleID = @moduleID AND 
		FlgDelete = 0
END

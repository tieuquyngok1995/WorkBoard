IF OBJECT_ID('dbo.UpdateTaskStatus', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.UpdateTaskStatus;
END

GO

CREATE PROCEDURE UpdateTaskStatus
    @moduleID nvarchar(25),
	@taskStatus smallint
AS
BEGIN
	UPDATE [dbo].[Task] SET [TaskStatus] = @taskStatus
	FROM [dbo].[Task] WHERE ModuleID = @moduleID
END

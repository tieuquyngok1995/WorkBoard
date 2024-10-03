use WorkBoard;

IF OBJECT_ID('dbo.UpdateTaskStatus', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.UpdateTaskStatus;
END

GO

CREATE PROCEDURE UpdateTaskStatus
	@id int,
    @moduleID nvarchar(25),
	@taskStatus smallint,
	@workHour decimal(5, 2),
	@progress smallint,
	@dateStartWork datetime
AS
BEGIN
	UPDATE [dbo].[Task] SET 
		[TaskStatus] = @taskStatus,
		[WorkHour] = @workHour,
		[Progress] = @progress,
		[DateStartWork] = @dateStartWork
	FROM [dbo].[Task] WHERE 
		ID = @id AND
		ModuleID = @moduleID AND 
		FlgDelete = 0
END

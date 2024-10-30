IF OBJECT_ID('dbo.usp_UpdateTaskStatus', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_UpdateTaskStatus;
END

GO

CREATE PROCEDURE usp_UpdateTaskStatus
	@id int,
	@moduleID nvarchar(25),
	@taskStatus smallint,
	@workHour decimal(5, 2),
	@progress smallint,
	@dateWork datetime
AS
BEGIN
	UPDATE [dbo].[Task] SET 
		[TaskStatus] = @taskStatus,
		[WorkHour] = @workHour,
		[Progress] = @progress,
		[DateWork] = @dateWork,
		[DateWorkStart] = CASE WHEN @taskStatus = 1 AND DateWorkStart IS NULL 
							THEN @dateWork 
							ELSE DateWorkStart 
                          END,
		[DateWorkEnd] = CASE WHEN @taskStatus = 3
							THEN @dateWork 
							ELSE DateWorkEnd 
                          END
	FROM [dbo].[Task] WHERE 
		ID = @id AND
		ModuleID = @moduleID AND 
		FlgDelete = 0
END

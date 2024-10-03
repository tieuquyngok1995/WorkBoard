use WorkBoard;

IF OBJECT_ID('dbo.UpdateTaskProgress', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.UpdateTaskProgress;
END

GO

CREATE PROCEDURE UpdateTaskProgress
	@id int,
    @moduleID nvarchar(25),
	@workHour smallint,
	@progress smallint,
	@note nvarchar(max)
AS
BEGIN
	UPDATE [dbo].[Task] SET 
		[WorkHour] = @workHour
       ,[Progress] = @progress
       ,[Note] = @note
	FROM [dbo].[Task] WHERE 
		ID = @id AND
		ModuleID = @moduleID AND 
		FlgDelete = 0
END

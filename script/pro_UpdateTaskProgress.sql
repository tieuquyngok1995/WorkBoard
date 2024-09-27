IF OBJECT_ID('dbo.UpdateTaskProgress', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.UpdateTaskProgress;
END

GO

CREATE PROCEDURE UpdateTaskProgress
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
	FROM [dbo].[Task] WHERE ModuleID = @moduleID
END

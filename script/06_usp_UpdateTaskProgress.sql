IF OBJECT_ID('dbo.usp_UpdateTaskProgress', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_UpdateTaskProgress;
END

GO

CREATE PROCEDURE usp_UpdateTaskProgress
	@id int,
	@moduleID nvarchar(25),
	@workHour decimal(5, 2),
	@progress smallint,
	@dateWorkStart datetime,
	@note nvarchar(max)
AS
BEGIN
	UPDATE [dbo].[Task] SET 
		[WorkHour] = @workHour
	   ,[Progress] = @progress
	   ,[DateWorkStart] = @dateWorkStart
	   ,[Note] = @note
	FROM [dbo].[Task] WHERE 
		ID = @id AND
		ModuleID = @moduleID AND 
		FlgDelete = 0
END

IF OBJECT_ID('dbo.DeleteTask', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.DeleteTask;
END

GO

CREATE PROCEDURE DeleteTask
    @moduleID nvarchar(25)
AS
BEGIN
    DELETE FROM [dbo].[Task] WHERE ModuleID = @moduleID
END

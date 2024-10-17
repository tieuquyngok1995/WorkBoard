use WorkBoard;

IF OBJECT_ID('dbo.CreateTask', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.CreateTask;
END

GO

CREATE PROCEDURE CreateTask
    @data TaskType READONLY,
	@newID int OUTPUT
AS
BEGIN
    INSERT INTO Task (
		 ModuleID 
		,TaskName
		,Type
        ,NumRedmine
        ,Assignee
        ,Priority
        ,DateCreate
        ,WorkHour
        ,EstimatedHour
        ,Progress
        ,DateDelivery
        ,Note
		,TaskStatus
		,FlgDelete)
	SELECT 
		 ModuleID
		,TaskName
		,Type
		,NumRedmine
		,Assignee
		,Priority
		,DateCreate
		,0
		,EstimatedHour
		,0
		,DateDelivery
		,Note
		,0
		,0
    FROM @data

	SET @newID = SCOPE_IDENTITY()
END

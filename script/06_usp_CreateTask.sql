IF OBJECT_ID('dbo.usp_CreateTask', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_CreateTask;
END

GO

CREATE PROCEDURE usp_CreateTask
    @data udt_TaskType READONLY,
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

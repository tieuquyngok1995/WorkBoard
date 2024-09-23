IF OBJECT_ID('dbo.CreateTask', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.CreateTask;
END

GO

CREATE PROCEDURE CreateTask
    @data TaskType READONLY
AS
BEGIN
    INSERT INTO Task (
		 [ModuleID] 
		,[TaskName]
		,[TaskType]
        ,[NumRedmine]
        ,[Assignee]
        ,[Priority]
        ,[DateCreate]
        ,[WorkHour]
        ,[EstimatedHour]
        ,[Progress]
        ,[DateDelivery]
        ,[Note]
		,[JobStatus]
        ,[UserUpdate]
        ,[DateUpdate])
	SELECT 
		 ModuleID
		,TaskName
		,TaskType
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
		, null
		, null
    FROM @data
END

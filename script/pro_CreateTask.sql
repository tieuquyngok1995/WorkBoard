CREATE PROCEDURE CreateTask
	@UserUpdate varchar(25),
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
        ,[UserUpdate]
        ,[DateUpdate]
        ,[Note])
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
		,@UserUpdate
		, GETDATE()
		,Note
    FROM @data
END

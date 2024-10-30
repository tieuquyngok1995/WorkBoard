IF OBJECT_ID('dbo.usp_UpdateTask', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_UpdateTask;
END

GO

CREATE PROCEDURE usp_UpdateTask
    @data udt_TaskType READONLY
AS
BEGIN
    UPDATE T SET 
		T.TaskName = TD.TaskName,
		T.Type = TD.Type,
		T.NumRedmine = TD.NumRedmine,
		T.Assignee = TD.Assignee,
		T.Priority = TD.Priority,
		T.DateCreate = TD.DateCreate,
		T.EstimatedHour = TD.EstimatedHour,
		T.DateDelivery = TD.DateDelivery,
		T.Note = TD.Note
    FROM 
        [dbo].[Task] T
    INNER JOIN 
        @data TD ON 
			T.ID = TD.ID AND
			T.ModuleID = TD.ModuleID
	WHERE FlgDelete = 0
END

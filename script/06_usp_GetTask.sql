use WorkBoard;

IF OBJECT_ID('dbo.usp_GetTask', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_GetTask;
END

GO

CREATE PROCEDURE usp_GetTask
    @UserID smallint 
AS
BEGIN

SET NOCOUNT ON;

DECLARE @roleID as smallint;
SET @roleID = (select roleid from Users where UserID = @USERID);

	SELECT 
	   T.ID
	  ,T.ModuleID
	  ,T.TaskName
	  ,T.type as Type
	  ,TT.Name as TypeName
	  ,T.NumRedmine
	  ,T.Assignee
	  ,U.UserName as AssigneeName
	  ,T.Priority
	  ,T.DateCreate
	  ,T.EstimatedHour
	  ,T.DateDelivery
	  ,T.Note
	  ,T.DateWork
	  ,T.WorkHour
	  ,T.Progress
	  ,T.DateWorkStart
	  ,T.TaskStatus
	FROM [dbo].[Task] T
		LEFT JOIN [dbo].[TaskType] TT
			ON T.type = TT.ID
		LEFT JOIN [dbo].[Users] U
			ON T.Assignee = U.UserID
	WHERE 
		CASE WHEN @roleID < 2 THEN 1
		ELSE CASE WHEN @roleID = 2 and T.Assignee = @USERID THEN 1 END
		END = 1 AND 
		FlgDelete = 0
	ORDER BY 
		TaskStatus ASC,
		Priority ASC, 
		Type ASC
END

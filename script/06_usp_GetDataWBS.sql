use WorkBoard;

IF OBJECT_ID('dbo.usp_GetDataWBS', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_GetDataWBS;
END

GO

CREATE PROCEDURE usp_GetDataWBS
AS
BEGIN

SET NOCOUNT ON;

	SELECT
	   [ModuleID]
	  ,[TaskName]
	  ,[type]
	  ,TT.Name as TypeName
	  ,[NumRedmine]
	  ,U.UserName as AssigneeName
	  ,[WorkHour]
	  ,[EstimatedHour]
	  ,[DateWorkStart]
	  ,[DateWorkEnd]
	  ,[DateCreate]
	  ,[DateDelivery]
	  ,[Progress]
  FROM [dbo].[Task] T
	LEFT JOIN [dbo].[TaskType] TT
		ON T.type = TT.ID
	LEFT JOIN [dbo].[Users] U
		ON T.Assignee = U.UserID
  WHERE dbo.udf_IsDateInRange(T.DateCreate) = 1 
	AND dbo.udf_IsDateInRange(T.DateDelivery) = 1 
  ORDER BY ModuleID, Type;
END

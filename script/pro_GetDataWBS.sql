use WorkBoard;

IF OBJECT_ID('dbo.GetDataWBS', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.GetDataWBS;
END

GO

CREATE PROCEDURE GetDataWBS
AS
BEGIN

SET NOCOUNT ON;

SELECT [ModuleID]
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
  ORDER BY ModuleID, Type;
END

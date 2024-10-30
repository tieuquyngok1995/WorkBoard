IF OBJECT_ID('dbo.usp_GetTaskStatus', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_GetTaskStatus;
END

GO

CREATE PROCEDURE usp_GetTaskStatus
AS
BEGIN

	SET NOCOUNT ON;

	SELECT 
	  ID as [key]
	 ,name as value
	FROM [dbo].[TaskStatuses] 
END

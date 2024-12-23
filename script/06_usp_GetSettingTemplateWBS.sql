IF OBJECT_ID('dbo.usp_GetSettingTemplateWBS', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_GetSettingTemplateWBS;
END

GO

CREATE PROCEDURE usp_GetSettingTemplateWBS
AS
BEGIN

	SELECT moduleId,
		taskName,
		taskType,
		assignee,
		estimatedHour,
		workHour,
		dateWorkStart,
		dateWorkEnd,
		dateCreate,
		dateDelivery
	FROM SettingTemplateWBS
	WHERE ID = 0;

END
IF OBJECT_ID('dbo.usp_UpdateSettingTemplateWBS', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_UpdateSettingTemplateWBS;
END

GO

CREATE PROCEDURE usp_UpdateSettingTemplateWBS
	@moduleId nvarchar(2),
	@taskName nvarchar(2),
	@taskType nvarchar(2),
	@assignee nvarchar(2),
	@estimatedHour nvarchar(2),
	@workHour nvarchar(2),
	@dateWorkStart nvarchar(2),
	@dateWorkEnd nvarchar(2),
	@dateCreate nvarchar(2),
	@dateDelivery nvarchar(2) 
AS
BEGIN

	IF NOT EXISTS (SELECT 1 FROM SettingTemplateWBS)
		BEGIN
			INSERT INTO SettingTemplateWBS 
			VALUES (
				UPPER(@moduleId), UPPER(@taskName), UPPER(@taskType), UPPER(@assignee), UPPER(@estimatedHour), UPPER(@workHour), 
				UPPER(@dateWorkStart), UPPER(@dateWorkEnd), UPPER(@dateCreate), UPPER(@dateDelivery));
		END
	ELSE
		BEGIN
			UPDATE SettingTemplateWBS
			SET moduleId = UPPER(@moduleId),
			taskName = UPPER(@taskName),
			taskType = UPPER(@taskType),
			assignee = UPPER(@assignee),
			estimatedHour = UPPER(@estimatedHour),
			workHour = UPPER(@workHour),
			dateWorkStart = UPPER(@dateWorkStart),
			dateWorkEnd = UPPER(@dateWorkEnd),
			dateCreate = UPPER(@dateCreate),
			dateDelivery = UPPER(@dateDelivery)
		WHERE ID = 0;
	END
END
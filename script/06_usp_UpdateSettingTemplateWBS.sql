IF OBJECT_ID('dbo.usp_UpdateSettingTemplateWBS', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_UpdateSettingTemplateWBS;
END

GO

CREATE PROCEDURE usp_UpdateSettingTemplateWBS
	@moduleId nvarchar(4),
	@taskName nvarchar(4),
	@taskType nvarchar(4),
	@assignee nvarchar(4),
	@estimatedHour nvarchar(4),
	@workHour nvarchar(4),
	@dateWorkStart nvarchar(4),
	@dateWorkEnd nvarchar(4),
	@dateCreate nvarchar(4),
	@dateDelivery nvarchar(4) 
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
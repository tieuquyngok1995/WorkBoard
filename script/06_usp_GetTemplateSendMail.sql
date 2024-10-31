IF OBJECT_ID('dbo.usp_GetTemplateSendMail', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_GetTemplateSendMail;
END

GO

CREATE PROCEDURE usp_GetTemplateSendMail
AS
BEGIN

SET NOCOUNT ON;

SELECT [ID] as TemplateID
      ,[TemplateName]
      ,[Subject]
      ,[Content]
      ,[ToUser]
  FROM [dbo].[TemplateSendMail]
  ORDER BY 
	TemplateName ASC
END

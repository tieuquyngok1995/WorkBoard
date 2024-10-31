IF OBJECT_ID('dbo.usp_CreateTemplateSendMail', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_CreateTemplateSendMail;
END

GO

CREATE PROCEDURE usp_CreateTemplateSendMail
    @templateName nvarchar(100),
	@subject nvarchar(100),
	@content nvarchar(max),
	@toUser varchar(256)
AS
BEGIN
    INSERT INTO [dbo].[TemplateSendMail] VALUES(
	   @templateName
      ,@subject
	  ,@content
	  ,@toUser)
END

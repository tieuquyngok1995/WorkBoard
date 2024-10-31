IF OBJECT_ID('dbo.usp_UpdateTemplateSendMail', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.usp_UpdateTemplateSendMail;
END

GO

CREATE PROCEDURE usp_UpdateTemplateSendMail
    @templateID smallint,
	@subject nvarchar(100),
	@content nvarchar(max),
	@toUser varchar(256)
AS
BEGIN
	UPDATE [dbo].[TemplateSendMail] SET 
		   [Subject] = @subject
		  ,[Content] = @content
		  ,[ToUser] = @toUser
	WHERE ID = @templateID
END

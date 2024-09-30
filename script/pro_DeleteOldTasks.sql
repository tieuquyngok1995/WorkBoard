use WorkBoard;

IF OBJECT_ID('dbo.DeleteOldTasks', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.DeleteOldTasks;
END

GO

CREATE PROCEDURE DeleteOldTasks
AS
BEGIN
    -- Xóa các bản ghi có cờ FlgDelete = 1 và đã đánh dấu xóa trước 1 tháng
    DELETE FROM [dbo].[Task]
    WHERE FlgDelete = 1
    AND DateDelete <= DATEADD(MONTH, -1, GETDATE());  -- Các bản ghi đã bị xóa trước 1 tháng
END
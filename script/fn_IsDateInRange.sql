IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.fn_IsDateInRange') AND type = N'FN')
BEGIN
    DROP FUNCTION dbo.fn_IsDateInRange;
END

GO

CREATE FUNCTION dbo.fn_IsDateInRange (@DateToCheck DATETIME)
RETURNS BIT
AS
BEGIN
    DECLARE @Result BIT;  -- Tạo biến chứa kết quả
    DECLARE @StartDate DATETIME, @EndDate DATETIME;

    -- Tính ngày 26 của tháng trước
    SET @StartDate = DATEADD(MONTH, -1, DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 26));

    -- Tính ngày 26 của tháng này
    SET @EndDate = DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 26);

    -- Kiểm tra nếu ngày cần kiểm tra nằm trong khoảng
    IF @DateToCheck >= @StartDate AND @DateToCheck < @EndDate
    BEGIN
        SET @Result = 1;  -- Nếu đúng, gán @Result = 1
    END
    ELSE
    BEGIN
        SET @Result = 0;  -- Nếu sai, gán @Result = 0
    END

    -- Trả về kết quả đã tính toán
    RETURN @Result;
END;
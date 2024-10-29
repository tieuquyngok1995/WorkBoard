use WorkBoard;

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.udf_IsDateInRange') AND type = N'FN')
BEGIN
    DROP FUNCTION dbo.udf_IsDateInRange;
END

GO

CREATE FUNCTION dbo.udf_IsDateInRange (@DateToCheck DATETIME)
RETURNS BIT
AS
BEGIN
    DECLARE @Result BIT;  
	DECLARE @CurrentDate DATE = GETDATE();
    DECLARE @StartDate DATETIME, @EndDate DATETIME;

	-- Check date current 
	IF DAY(@CurrentDate) <= 25
    BEGIN
		-- Set time from 26 months ago to 25 months this month
        SET @StartDate = DATEADD(MONTH, -1, DATEFROMPARTS(YEAR(@CurrentDate), MONTH(@CurrentDate), 26));
        SET @EndDate = DATEFROMPARTS(YEAR(@CurrentDate), MONTH(@CurrentDate), 25);
    END
    ELSE
    BEGIN
		-- Set time from 25th of this month to 26th of next month
        SET @StartDate = DATEFROMPARTS(YEAR(@CurrentDate), MONTH(@CurrentDate), 26);
        SET @EndDate = DATEADD(MONTH, 1, DATEFROMPARTS(YEAR(@CurrentDate), MONTH(@CurrentDate), 25));
    END

    -- Check range date
    IF @DateToCheck >= @StartDate AND @DateToCheck < @EndDate
    BEGIN
        SET @Result = 1;  
    END
    ELSE
    BEGIN
        SET @Result = 0;  
    END

    RETURN @Result;
END;
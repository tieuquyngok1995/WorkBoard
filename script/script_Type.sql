DROP TYPE IF EXISTS TaskType;

CREATE TYPE TaskType AS TABLE
(
	ModuleID nvarchar(25),
	TaskName nvarchar(100) NULL,
	TaskType smallint,
	NumRedmine int,
	Assignee smallint, 
	Priority smallint,
	DateCreate date,
	EstimatedHour smallint,
	DateDelivery date,
	Note nvarchar(max) NULL
);
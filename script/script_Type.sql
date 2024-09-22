DROP TYPE IF EXISTS TaskType;

CREATE TYPE TaskType AS TABLE
(
	ModuleID nvarchar(25),
	TaskName nvarchar(100),
	TaskType smallint,
	NumRedmine int,
	Assignee smallint not null, 
	Priority smallint,
	DateCreate date,
	EstimatedHour smallint,
	DateDelivery date,
	Note nvarchar(max)
);
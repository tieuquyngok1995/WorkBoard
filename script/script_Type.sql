DROP TYPE IF EXISTS TaskType;

CREATE TYPE TaskType AS TABLE
(
	ModuleID nvarchar(25),
	TaskName nvarchar(100),
	Type smallint not null,
	NumRedmine int,
	Assignee smallint not null, 
	Priority smallint,
	DateCreate date not null,
	EstimatedHour smallint not null,
	DateDelivery date not null,
	Note nvarchar(max)
);
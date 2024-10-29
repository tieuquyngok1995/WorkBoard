use WorkBoard;

DROP TYPE IF EXISTS udt_TaskType;

CREATE TYPE udt_TaskType AS TABLE
(
	ID int,
	ModuleID nvarchar(25),
	TaskName nvarchar(100),
	Type smallint not null,
	NumRedmine int,
	Assignee smallint not null, 
	Priority smallint,
	DateCreate date not null,
	EstimatedHour decimal(5, 2) not null,
	DateDelivery date not null,
	Note nvarchar(max)
);
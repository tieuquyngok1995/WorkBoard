use WorkBoard;

IF OBJECT_ID('dbo.Task', 'U') IS NOT NULL BEGIN DROP TABLE dbo.Task; END

IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL BEGIN DROP TABLE dbo.Users; END

IF OBJECT_ID('dbo.TaskType', 'U') IS NOT NULL BEGIN DROP TABLE dbo.TaskType; END

IF OBJECT_ID('dbo.Roles', 'U') IS NOT NULL BEGIN DROP TABLE dbo.Roles; END

IF OBJECT_ID('dbo.Priority', 'U') IS NOT NULL BEGIN DROP TABLE dbo.Priority; END

IF OBJECT_ID('dbo.TaskStatuses', 'U') IS NOT NULL BEGIN DROP TABLE dbo.TaskStatuses; END


CREATE TABLE Roles (
    RoleID INT PRIMARY KEY IDENTITY(0,1),
    RoleName NVARCHAR(50) NOT NULL
);

CREATE TABLE TaskType (
    ID smallint PRIMARY KEY IDENTITY(0,1),
    Name NVARCHAR(50) NOT NULL
);

create table Users (
	UserID smallint primary key identity (0,1),
	Email varchar(100) not null,
	UserName varchar(25) not null,
	Password varchar(100) not null,
	RoleID int, 
	FOREIGN KEY (RoleID) REFERENCES dbo.Roles(RoleID)
);

CREATE TABLE Priority (
    ID smallint PRIMARY KEY IDENTITY(0,1),
    Name NVARCHAR(50) NOT NULL
);

CREATE TABLE TaskStatuses (
    ID smallint PRIMARY KEY IDENTITY(0,1),
    Name NVARCHAR(50) NOT NULL
);

create table Task (
    ID int PRIMARY KEY IDENTITY(0,1),
	ModuleID nvarchar(25),
	TaskName nvarchar(100),
	Type smallint not null,
	NumRedmine int,
	Assignee smallint not null, 
	Priority smallint,
	DateCreate date not null,
	WorkHour smallint,
	EstimatedHour smallint not null,
	Progress smallint,
	DateDelivery date not null,
	Note nvarchar(max),
	TaskStatus smallint not null,
	UserUpdate varchar(25),
	DateUpdate date,
	FlgDelete smallint,
	DateDelete date,
	FOREIGN KEY (Type) REFERENCES dbo.TaskType(ID) ,
	FOREIGN KEY (Assignee) REFERENCES dbo.Users(UserID) ,
	FOREIGN KEY (Priority) REFERENCES dbo.Priority(ID) ,
	FOREIGN KEY (TaskStatus) REFERENCES dbo.TaskStatuses(ID)         
);

INSERT INTO Roles (RoleName)
VALUES ('Admin'), ('Leader'), ('User') ;

INSERT INTO Users
VALUES ('admin@fujinet.net', 'admin', '1', 0) ;

INSERT INTO Users
VALUES ('leader@fujinet.net', 'leader', '1', 1) ;

INSERT INTO Users
VALUES ('tuan-vq@fujinet.net', 'tuan-vq', '1', 2) ;

INSERT INTO TaskType (Name)
VALUES ('Coding'), ('Review'), ('Testing'), ('FixBug');

INSERT INTO Priority (Name)
VALUES ('High'), ('Medium'), ('Low');

INSERT INTO TaskStatuses (Name)
VALUES ('Waiting'), ('InProgress'), ('Pending'), ('Completed');


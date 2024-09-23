use WorkBoard;

IF OBJECT_ID('dbo.Task', 'U') IS NOT NULL BEGIN DROP TABLE dbo.Task;END

IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL BEGIN DROP TABLE dbo.Users;END

IF OBJECT_ID('dbo.Roles', 'U') IS NOT NULL BEGIN DROP TABLE dbo.Roles;END

CREATE TABLE Roles (
    RoleID INT PRIMARY KEY IDENTITY(1,1),
    RoleName NVARCHAR(50) NOT NULL
);

create table Users (
	UserID smallint primary key identity (1,1),
	Email varchar(100) not null,
	UserName varchar(25) not null,
	Password varchar(100) not null,
	RoleID int, 
	FOREIGN KEY (RoleID) REFERENCES dbo.Roles(RoleID)
);

create table Task (
	ModuleID nvarchar(25) primary key,
	TaskName nvarchar(100),
	TaskType smallint not null,
	NumRedmine int,
	Assignee smallint not null, 
	Priority smallint,
	DateCreate date,
	WorkHour smallint,
	EstimatedHour smallint,
	Progress smallint,
	DateDelivery date,
	Note nvarchar(max),
	JobStatus smallint not null ,
	UserUpdate varchar(25),
	DateUpdate date
	FOREIGN KEY (Assignee) REFERENCES dbo.Users(UserID)          
);

INSERT INTO Roles (RoleName)
VALUES ('Admin'), ('Leader'), ('User') ;

INSERT INTO Users
VALUES ('admin@gmail.com', 'admin', '1', 1) ;
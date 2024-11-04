IF OBJECT_ID('dbo.Task', 'U') IS NOT NULL BEGIN DROP TABLE dbo.Task; END

IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL BEGIN DROP TABLE dbo.Users; END

IF OBJECT_ID('dbo.TaskType', 'U') IS NOT NULL BEGIN DROP TABLE dbo.TaskType; END

IF OBJECT_ID('dbo.Roles', 'U') IS NOT NULL BEGIN DROP TABLE dbo.Roles; END

IF OBJECT_ID('dbo.Priority', 'U') IS NOT NULL BEGIN DROP TABLE dbo.Priority; END

IF OBJECT_ID('dbo.TaskStatuses', 'U') IS NOT NULL BEGIN DROP TABLE dbo.TaskStatuses; END

IF OBJECT_ID('dbo.TemplateSendMail', 'U') IS NOT NULL BEGIN DROP TABLE dbo.TemplateSendMail; END


CREATE TABLE Roles (
    RoleID INT PRIMARY KEY IDENTITY(0,1),
    RoleName NVARCHAR(50) NOT NULL
);

CREATE TABLE TaskType (
    ID smallint PRIMARY KEY IDENTITY(0,1),
    Name NVARCHAR(50) NOT NULL,
    NameJP NVARCHAR(50) NOT NULL
);

CREATE TABLE Users (
    UserID smallint PRIMARY KEY IDENTITY (0,1),
    Email nvarchar(100) NOT NULL,
    UserName nvarchar(50) NOT NULL UNIQUE, 
    Password nvarchar(256) NOT NULL,
    PasswordEmail nvarchar(256) NOT NULL,
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
	DateCreate datetime not null,
	EstimatedHour decimal(5, 2) not null,
	DateDelivery date not null,
	Note nvarchar(max),
	DateWork datetime,
	WorkHour decimal(5, 2),
	Progress smallint,
	DateWorkStart datetime,
	DateWorkEnd datetime,
	TaskStatus smallint not null,
	FlgDelete smallint,
	DateDelete datetime,
	FOREIGN KEY (Type) REFERENCES dbo.TaskType(ID) ,
	FOREIGN KEY (Assignee) REFERENCES dbo.Users(UserID) ,
	FOREIGN KEY (Priority) REFERENCES dbo.Priority(ID) ,
	FOREIGN KEY (TaskStatus) REFERENCES dbo.TaskStatuses(ID)         
);

CREATE TABLE TemplateSendMail (
    ID smallint PRIMARY KEY IDENTITY(0,1),
	TemplateName nvarchar(100) NOT NULL,
	Subject nvarchar(100) NOT NULL,
	Content nvarchar(max) NOT NULL,
	ToUser varchar(256) NOT NULL
);

INSERT INTO Roles (RoleName)
VALUES ('Admin'), ('Manager'), ('Member') ;

INSERT INTO Users
VALUES ('test_dept3@fujinet.net', 'admin', 'AQAAAAIAAYagAAAAEJ+Bs9r7Zn6H3SrBT4kg2qKK++UV5rWqpX2d7tcrd3eWJnM4VYsDeF8JTmMLKazF2A==', 'Zxc12345', 0) ;

INSERT INTO TaskType (Name, NameJP)
VALUES ('Coding', N'コーディング'), ('Review Coding', N'コーディングのレビュー'), ('Fix Bug Coding', N'コーディングのレビュー結果対応')
     , ('Create Testcases', N'テストケースの作成'), ('Review Testcases', N'テストケースのレビュー'), ('Fix Bug Testcase', N'テストケースのレビュー指摘対応')
	 , ('Testing', N'単体テスト'), ('Review Testing', N'単体テスト結果のレビュー'), ('Fix Bug Testing', N'単体テスト結果の不具合対応ト');

INSERT INTO Priority (Name)
VALUES ('High'), ('Medium'), ('Low');

INSERT INTO TaskStatuses (Name)
VALUES ('waiting'), ('progress'), ('pending'), ('completed');


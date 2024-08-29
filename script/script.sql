use WorkBoard;

CREATE TABLE Roles (
    RoleID INT PRIMARY KEY IDENTITY(1,1), -- Khóa chính, tự động tăng
    RoleName NVARCHAR(50) NOT NULL         -- Tên vai trò
);

create table Users (
	UserID int primary key identity (1,1),
	Email varchar(100) not null,
	UserName varchar(16) not null,
	Password varchar(100) not null,
	RoleID int, 
	CONSTRAINT FK_UserRole                 -- Đặt tên cho khóa ngoại
        FOREIGN KEY (RoleID)                -- Cột khóa ngoại
        REFERENCES Roles (RoleID)          -- Bảng và cột khóa chính mà nó liên kết
);

INSERT INTO Roles (RoleName)
VALUES ('Admin'), ('Leader'), ('User') ;

INSERT INTO Users
VALUES ('admin@gmail.com', 'admin', '1', 1) ;
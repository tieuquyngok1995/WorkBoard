
--INSERT INTO Users (Email, UserName, Password,PasswordEmail, RoleID)
--VALUES
--    ('user1@example.com', 'user1', 'AQAAAAIAAYagAAAAEJhlbRY3AnvsG6wDr14B+Ax33fstuOy0HEExtNRF5gstnkQJoW9wOETGzZjH6tCjng==','1', 1),
--    ('user2@example.com', 'user2', 'AQAAAAIAAYagAAAAEJhlbRY3AnvsG6wDr14B+Ax33fstuOy0HEExtNRF5gstnkQJoW9wOETGzZjH6tCjng==','1', 1),
--    ('user3@example.com', 'user3', 'AQAAAAIAAYagAAAAEJhlbRY3AnvsG6wDr14B+Ax33fstuOy0HEExtNRF5gstnkQJoW9wOETGzZjH6tCjng==','1', 2),
--    ('user4@example.com', 'user4', 'AQAAAAIAAYagAAAAEJhlbRY3AnvsG6wDr14B+Ax33fstuOy0HEExtNRF5gstnkQJoW9wOETGzZjH6tCjng==','1', 2),
--    ('user5@example.com', 'user5', 'AQAAAAIAAYagAAAAEJhlbRY3AnvsG6wDr14B+Ax33fstuOy0HEExtNRF5gstnkQJoW9wOETGzZjH6tCjng==','1', 1),
--    ('user6@example.com', 'user6', 'AQAAAAIAAYagAAAAEJhlbRY3AnvsG6wDr14B+Ax33fstuOy0HEExtNRF5gstnkQJoW9wOETGzZjH6tCjng==','1', 2),
--    ('user7@example.com', 'user7', 'AQAAAAIAAYagAAAAEJhlbRY3AnvsG6wDr14B+Ax33fstuOy0HEExtNRF5gstnkQJoW9wOETGzZjH6tCjng==','1', 1),
--    ('user8@example.com', 'user8', 'AQAAAAIAAYagAAAAEJhlbRY3AnvsG6wDr14B+Ax33fstuOy0HEExtNRF5gstnkQJoW9wOETGzZjH6tCjng==','1', 1),
--    ('user9@example.com', 'user9', 'AQAAAAIAAYagAAAAEJhlbRY3AnvsG6wDr14B+Ax33fstuOy0HEExtNRF5gstnkQJoW9wOETGzZjH6tCjng==','1', 2)

Delete Task;

INSERT INTO Task (
    ModuleID, TaskName, Type, NumRedmine, Assignee, Priority, DateCreate, EstimatedHour, DateDelivery, Note, 
    DateWork, WorkHour, Progress, DateWorkStart, DateWorkEnd, TaskStatus, FlgDelete, DateDelete
)
VALUES
-- Task 1
('Module_01', 'Implement feature A', 1, 10001, 2, 1, GETDATE(), 30.50, '2024-12-31', 'Develop core feature A', NULL, NULL, 0, NULL, NULL, 1, 0, NULL),
-- Task 2
('Module_02', 'Fix bug in feature B', 2, 10002, 4, 2, GETDATE(), 10.00, '2024-12-25', 'Resolve critical bug in feature B', NULL, NULL, 0, NULL, NULL, 2, 0, NULL),
-- Task 3
('Module_01', 'Write unit tests for feature C', 3, 10003, 3, 0, GETDATE(), 20.00, '2024-12-28', 'Add unit tests to ensure feature C works correctly', NULL, NULL, 0, NULL, NULL, 3, 0, NULL),
-- Task 4
('Module_03', 'Optimize database queries', 1, 10004, 4, 0, GETDATE(), 15.50, '2024-12-29', 'Optimize queries for better performance', NULL, NULL, 0, NULL, NULL, 1, 0, NULL),
-- Task 5
('Module_02', 'Design UI for module X', 4, 10005, 2, 1, GETDATE(), 25.00, '2024-12-30', 'Create intuitive UI for module X', NULL, NULL, 0, NULL, NULL, 2, 0, NULL),
-- Task 6
('Module_01', 'Prepare deployment script', 1, 10006, 3, 2, GETDATE(), 8.00, '2024-12-31', 'Prepare script for smooth deployment', NULL, NULL, 0, NULL, NULL, 1, 0, NULL),
-- Task 7
('Module_04', 'Document API endpoints', 5, 10007, 3, 2, GETDATE(), 18.00, '2024-12-27', 'Write detailed documentation for all API endpoints', NULL, NULL, 0, NULL, NULL, 1, 0, NULL),
-- Task 8
('Module_03', 'Conduct code review', 2, 10008, 2, 2, GETDATE(), 12.00, '2024-12-28', 'Review code for module enhancements', NULL, NULL, 0, NULL, NULL, 2, 0, NULL),
-- Task 9
('Module_05', 'Integrate third-party API', 1, 10009, 4, 0, GETDATE(), 40.00, '2024-12-31', 'Integrate payment gateway API', NULL, NULL, 0, NULL, NULL, 3, 0, NULL),
-- Task 10
('Module_06', 'Perform load testing', 6, 10010, 4, 1, GETDATE(), 22.50, '2024-12-30', 'Perform stress and load testing on module Y', NULL, NULL, 0, NULL, NULL, 1, 0, NULL);

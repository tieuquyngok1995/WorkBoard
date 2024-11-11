
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

INSERT INTO Task (ModuleID, TaskName, Type, NumRedmine, Assignee, Priority, DateCreate, EstimatedHour, DateDelivery, Note, DateWork, WorkHour, Progress, DateWorkStart, DateWorkEnd, TaskStatus, FlgDelete, DateDelete)
VALUES 
('ModuleA', 'Task 1', 1, 123456, 2, 2, CAST(GETDATE() AS DATE), 5, '2024-11-25', 'Note for task 1', NULL, 0.00, 0, NULL, NULL, 0, 0, NULL),
('ModuleA', 'Task 2', 1, 123457, 5, 0, CAST(GETDATE() AS DATE), 8, '2024-11-6', 'Note for task 2', NULL, 2.00, 20, NULL, NULL, 1, 0, NULL),
('ModuleB', 'Task 3', 2, 123458, 3, 2, CAST(GETDATE() AS DATE), 10, '2024-11-09', 'Note for task 3', NULL, 0.00, 0, NULL, NULL, 2, 0, NULL),
('ModuleC', 'Task 4', 2, 123459, 6, 0, CAST(GETDATE() AS DATE), 4, '2024-11-20', 'Note for task 4', NULL, 4, 100, '2024-11-05', CAST(GETDATE() AS DATE), 3, 0, NULL),
('ModuleC', 'Task 5', 3, 123460, 5, 1, CAST(GETDATE() AS DATE), 6, '2024-11-10', 'Note for task 5', NULL, 0.00, 0, NULL, NULL, 1, 0, NULL),
('ModuleA', 'Task 6', 3, 123461, 4, 2, CAST(GETDATE() AS DATE), 7, '2024-11-01', 'Note for task 6', NULL, 0.00, 0, '2024-11-23', NULL, 2, 0, NULL),
('ModuleB', 'Task 7', 1, 123462, 7, 1, CAST(GETDATE() AS DATE), 3, '2024-11-15', 'Note for task 7', NULL, 0.00, 0, NULL, NULL, 0, 0, NULL),
('ModuleA', 'Task 8', 2, 123463, 9, 2, CAST(GETDATE() AS DATE), 5, '2024-11-25', 'Note for task 8', NULL, 5, 100, '2024-11-15', CAST(GETDATE() AS DATE), 3, 0, NULL),
('ModuleB', 'Task 9', 3, 123464, 3, 0, CAST(GETDATE() AS DATE), 2, '2024-11-15', 'Note for task 9', NULL, 0.00, 0, NULL, NULL, 2, 0, NULL),
('ModuleC', 'Task 10', 1, 123465, 3, 1, CAST(GETDATE() AS DATE), 4, '2024-11-24', 'Note for task 10', NULL, 0.00, 0, NULL, NULL, 1, 0, NULL),
('ModuleD', 'Task 11', 1, 123456, 3, 0, CAST(GETDATE() AS DATE), 5, '2024-11-22', 'Note for task 1', NULL, 0.00, 0, '2024-11-25', NULL, 0, 0, NULL),
('ModuleD', 'Task 12', 1, 123457, 5, 2, CAST(GETDATE() AS DATE), 8, '2024-11-25', 'Note for task 2', NULL, 0.00, 0, NULL, NULL, 1, 0, NULL),
('ModuleB', 'Task 13', 2, 123458, 3, 2, CAST(GETDATE() AS DATE), 10, '2024-11-05', 'Note for task 3', NULL, 0.00, 0, NULL, NULL, 2, 0, NULL),
('ModuleC', 'Task 14', 2, 123459, 7, 0, CAST(GETDATE() AS DATE), 4, '2024-11-20', 'Note for task 4', NULL, 4, 100, '2024-11-21', CAST(GETDATE() AS DATE), 3, 0, NULL),
('ModuleA', 'Task 15', 3, 123460, 8, 1, CAST(GETDATE() AS DATE), 6, '2024-11-10', 'Note for task 5', NULL, 0.00, 0, NULL, NULL, 1, 0, NULL)




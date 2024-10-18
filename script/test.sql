Delete Task;

INSERT INTO Task (ModuleID, TaskName, Type, NumRedmine, Assignee, Priority, DateCreate, EstimatedHour, DateDelivery, Note, DateWork, WorkHour, Progress, DateWorkStart, DateWorkEnd, TaskStatus, FlgDelete, DateDelete)
VALUES 
('ModuleA', 'Task 1', 1, 123456, 2, 1, GETDATE(), 5, '2024-10-25', 'Note for task 1', NULL, 0.00, 0, NULL, NULL, 0, 0, NULL),
('ModuleA', 'Task 2', 1, 123457, 3, 0, GETDATE(), 8, '2024-10-26', 'Note for task 2', NULL, 2.00, 20, NULL, NULL, 1, 0, NULL),
('ModuleB', 'Task 3', 2, 123458, 3, 2, GETDATE(), 10, '2024-10-05', 'Note for task 3', NULL, 0.00, 0, NULL, NULL, 2, 0, NULL),
('ModuleC', 'Task 4', 2, 123459, 4, 0, GETDATE(), 4, '2024-10-20', 'Note for task 4', NULL, 4, 100, '2024-10-05', GETDATE(), 3, 0, NULL),
('ModuleC', 'Task 5', 3, 123460, 3, 1, GETDATE(), 6, '2024-10-10', 'Note for task 5', NULL, 0.00, 0, NULL, NULL, 1, 0, NULL),
('ModuleA', 'Task 6', 3, 123461, 3, 2, GETDATE(), 7, '2024-10-01', 'Note for task 6', NULL, 0.00, 0, NULL, NULL, 2, 0, NULL),
('ModuleB', 'Task 7', 1, 123462, 2, 1, GETDATE(), 3, '2024-10-15', 'Note for task 7', NULL, 0.00, 0, NULL, NULL, 0, 0, NULL),
('ModuleA', 'Task 8', 2, 123463, 2, 2, GETDATE(), 5, '2024-10-25', 'Note for task 8', NULL, 5, 100, '2024-10-15', GETDATE(), 3, 0, NULL),
('ModuleB', 'Task 9', 3, 123464, 4, 0, GETDATE(), 2, '2024-10-15', 'Note for task 9', NULL, 0.00, 0, NULL, NULL, 2, 0, NULL),
('ModuleC', 'Task 10', 1, 123465, 4, 1, GETDATE(), 4, '2024-10-24', 'Note for task 10', NULL, 0.00, 0, NULL, NULL, 1, 0, NULL),
('ModuleD', 'Task 11', 1, 123456, 4, 0, GETDATE(), 5, '2024-10-22', 'Note for task 1', NULL, 0.00, 0, NULL, NULL, 0, 0, NULL),
('ModuleD', 'Task 12', 1, 123457, 2, 2, GETDATE(), 8, '2024-10-25', 'Note for task 2', NULL, 0.00, 0, NULL, NULL, 1, 0, NULL),
('ModuleB', 'Task 13', 2, 123458, 3, 2, GETDATE(), 10, '2024-10-05', 'Note for task 3', NULL, 0.00, 0, NULL, NULL, 2, 0, NULL),
('ModuleC', 'Task 14', 2, 123459, 2, 0, GETDATE(), 4, '2024-10-20', 'Note for task 4', NULL, 4, 100, '2024-10-21', GETDATE(), 3, 0, NULL),
('ModuleA', 'Task 15', 3, 123460, 2, 1, GETDATE(), 6, '2024-10-10', 'Note for task 5', NULL, 0.00, 0, NULL, NULL, 1, 0, NULL)

﻿using Microsoft.Data.SqlClient;
using System.Data;
using WorkBoardServer.Common;
using WorkBoardServer.Models;

namespace WorkBoardServer.Services
{
    public class TaskService
    {
        private readonly DatabaseService _databaseService;

        public TaskService(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        public bool Create(TaskModel model)
        {
            try
            {
                DataTable taskTable = new DataTable();
                taskTable.Columns.Add("ModuleID", typeof(string));           // nvarchar(25)
                taskTable.Columns.Add("TaskName", typeof(string));           // nvarchar(100)
                taskTable.Columns.Add("Type", typeof(short));                // smallint not null
                taskTable.Columns.Add("NumRedmine", typeof(int));            // int
                taskTable.Columns.Add("Assignee", typeof(short));            // smallint not null
                taskTable.Columns.Add("Priority", typeof(short));            // smallint
                taskTable.Columns.Add("DateCreate", typeof(DateTime));       // date
                taskTable.Columns.Add("EstimatedHour", typeof(short));       // smallint
                taskTable.Columns.Add("DateDelivery", typeof(DateTime));     // date
                taskTable.Columns.Add("Note", typeof(string));               // nvarchar(max) NULL

                taskTable.Rows.Add(
                    model.ModuleID,
                    model.TaskName,
                    model.Type,
                    model.NumRedmine,
                    model.Assignee,
                    model.Priority.HasValue ? model.Priority.Value : 2,
                    model.DateCreate,
                    model.EstimatedHour,
                    model.DateDelivery,
                    model.Note);

                _databaseService.ExecuteNonQuery(
                    GlobalConstants.PCreateTask, new SqlParameter
                    {
                        ParameterName = "@data",
                        SqlDbType = SqlDbType.Structured,
                        TypeName = "TaskType",
                        Value = taskTable
                    });
            }
            catch
            {
                return false;
            }
            return true;
        }

        public bool Update(TaskModel model)
        {
            try
            {
                DataTable taskTable = new DataTable();
                taskTable.Columns.Add("ModuleID", typeof(string));           // nvarchar(25)
                taskTable.Columns.Add("TaskName", typeof(string));           // nvarchar(100)
                taskTable.Columns.Add("Type", typeof(short));                // smallint not null
                taskTable.Columns.Add("NumRedmine", typeof(int));            // int
                taskTable.Columns.Add("Assignee", typeof(short));            // smallint not null
                taskTable.Columns.Add("Priority", typeof(short));            // smallint
                taskTable.Columns.Add("DateCreate", typeof(DateTime));       // date
                taskTable.Columns.Add("EstimatedHour", typeof(short));       // smallint
                taskTable.Columns.Add("DateDelivery", typeof(DateTime));     // date
                taskTable.Columns.Add("Note", typeof(string));               // nvarchar(max) NULL

                taskTable.Rows.Add(
                    model.ModuleID,
                    model.TaskName,
                    model.Type,
                    model.NumRedmine,
                    model.Assignee,
                    model.Priority.HasValue ? model.Priority.Value : 2,
                    model.DateCreate,
                    model.EstimatedHour,
                    model.DateDelivery,
                    model.Note);

                _databaseService.ExecuteNonQuery(
                    GlobalConstants.PUpdateTask, new SqlParameter
                    {
                        ParameterName = "@data",
                        SqlDbType = SqlDbType.Structured,
                        TypeName = "TaskType",
                        Value = taskTable
                    });
            }
            catch
            {
                return false;
            }
            return true;
        }

        public async Task UpdateTaskStatus(string moduleID, short? taskStatus)
        {
            try
            {
                await _databaseService.ExecuteQueryAsync<bool>(GlobalConstants.PUpdateTaskStatus, new
                {
                    @moduleID = moduleID,
                    @taskStatus = taskStatus
                });
            }
            catch
            {
                throw;
            }
        }

        public bool UpdateProgress(string moduleID, int workHour, int progress, string note)
        {
            try
            {
                _databaseService.ExecuteQuery<bool>(GlobalConstants.PUpdateTaskProgress, new
                {
                    @moduleID = moduleID,
                    @workHour = workHour,
                    @progress = progress,
                    @note = note
                });
            }
            catch { return false; }
            return true;
        }

        public bool Delete(string moduleID)
        {
            try
            {
                _databaseService.ExecuteQuery<bool>(GlobalConstants.PDeleteTask, new
                {
                    @moduleID = moduleID
                });
            }
            catch { return false; }
            return true;
        }
    }
}
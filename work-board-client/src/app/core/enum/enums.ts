export enum ProgramMode {
    CREATE,
    CLONE,
    EDIT,
    READ
}

export enum TaskPriority {
    HIGH,
    MEDIUM,
    LOW
}

export enum TaskType {
    CODING,
    REVIEW_CODING,
    FIXBUG_CODING,
    CREATE_TESTCASES,
    REVIEW_TESTCASES,
    FIXBUG_TESTCASES,
    TESTING,
    REVIEW_TESTING,
    FIXBUG_TESTING
}

export enum JobStatus {
    WAITING,
    PROGRESS,
    PENDING,
    COMPLETED
}

export enum Search {
    MODULE_ID,
    TASK_NAME,
    TASK_ASSIGNEE,
    DATE_DELIVERY
}
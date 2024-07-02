import { TaskImportance, TaskStatus } from "../enums/status";

export interface Task {
    id?: number;
    importance: TaskImportance;
    name: string;
    description: string;
    idProject: number | null;
    status: TaskStatus;
  }
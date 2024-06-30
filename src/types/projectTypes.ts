import { ProjectStatus} from "../enums/status";

export interface Project {
    id: number, title: string, description: string, status: ProjectStatus
}
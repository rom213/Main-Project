import { ProjectStatus} from "../enums/status";

export interface Project {
    id: number, name: string, description: string, status: ProjectStatus, color:string
}
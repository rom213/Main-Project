import { defineStore } from 'pinia'
import { useProjectStore } from "./projects";
import { Project } from '../types/projectTypes';
import { ref } from 'vue';
import { ProjectStatus } from '../enums/status';




export const useNavigationStore= defineStore('navigation',()=>{
    const projectStore = useProjectStore();
    const dataInit={
        color:"",
        description:"",
        id:100,
        name:"",
        status:ProjectStatus.Active
    }
    const project = ref<Project>(dataInit)
    const idTaskDrop = ref();

    const setProject=(index:any)=>{
        project.value=projectStore.projects[index]
    }

    const resetProjectNav=()=>{
        project.value=dataInit;
    }

    return { project, setProject, idTaskDrop, resetProjectNav };
})
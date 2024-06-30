import { defineStore } from 'pinia'
import { useProjectStore } from "./projects";
import { Project } from '../types/projectTypes';
import { ref } from 'vue';




export const useNavigationStore= defineStore('navigation',()=>{
    const projectStore = useProjectStore();
    const project = ref<Project>(projectStore.projects[0])

    const setProject=(index:any)=>{
        project.value=projectStore.projects[index]
    }

    return { project, setProject };
})
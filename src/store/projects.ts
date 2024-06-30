import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { ProjectStatus } from '../enums/status'
import { Project } from '../types/projectTypes';
const data = [
    {id: 1, title: "Primer proyecto", description: "creación de panel admin", status: ProjectStatus.Active},
    {id: 2, title: "Otro proyecto", description: "soluciones de software", status: ProjectStatus.Active},
    {id: 3, title: "Proyecto de marketing", description: "desarrollo de campaña publicitaria", status: ProjectStatus.Active},
    {id: 4, title: "Proyecto de e-commerce", description: "creación de tienda en línea", status: ProjectStatus.Active},
    {id: 5, title: "Proyecto de migración", description: "migración de base de datos", status: ProjectStatus.Active},
    {id: 6, title: "Proyecto de soporte", description: "implementación de sistema de soporte técnico", status: ProjectStatus.Active},
    {id: 7, title: "Proyecto de automatización", description: "automatización de procesos internos", status: ProjectStatus.Active}
];


export const useProjectStore= defineStore('projects',()=>{
    const projects = ref<Array<Project>>(data)

    
    let idProject = 0

    const addProject=()=>{
        valuesForms.id = idProject++
        projects.value.push({...valuesForms})
        valuesForms.title=""
        valuesForms.description=""
    }


    const findProjectsByStatus=(status: ProjectStatus)=>{
        return projects.value.filter(project=> project.status===status);
    }

    const deleteProject=(id: number)=>{
        projects.value = projects.value.filter(project=>project.id !== id)
    }

    const updateProject=(id: number)=>{
        const index = projects.value.findIndex(project => project.id === id)
        if (index !== -1) {
            projects.value[index].title = valuesForms.title
            projects.value[index].description= valuesForms.description
        }
    }

    const searchProjectsByName=(title: String)=>{
        return projects.value.filter(project=>project.title.toLowerCase().includes(title.toLowerCase()))
    }

    const valuesForms=reactive({
        id: idProject,
        title:"",
        description:"",
        status:ProjectStatus.Active
    }) 

    return {valuesForms, addProject, projects, deleteProject, updateProject, findProjectsByStatus, searchProjectsByName};
})
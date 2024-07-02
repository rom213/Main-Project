import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { ProjectStatus } from '../enums/status';
import { Project } from '../types/projectTypes';

const data = [
    {id: 1, name: "Primer proyecto", description: "creación de panel admin", status: ProjectStatus.Active, color: "#FF5733"},
    {id: 2, name: "Otro proyecto", description: "soluciones de software", status: ProjectStatus.Active, color: "#33FF57"},
    {id: 3, name: "Proyecto de marketing", description: "desarrollo de campaña publicitaria", status: ProjectStatus.Active, color: "#3357FF"},
    {id: 4, name: "Proyecto de e-commerce", description: "creación de tienda en línea", status: ProjectStatus.Active, color: "#FF33A1"},
    {id: 5, name: "Proyecto de migración", description: "migración de base de datos", status: ProjectStatus.Inactive, color: "#33FFF1"},
    {id: 7, name: "Proyecto de automatización", description: "automatización de procesos internos", status: ProjectStatus.Inactive, color: "#FF8C33"}
];

export const useProjectStore = defineStore('projects', () => {
    const projects = ref<Array<Project>>(data);

    let idProject = data.length+1;

    const addProject = () => {
        valuesForms.id = idProject++;
        projects.value.push({...valuesForms});
        valuesForms.name = "";
        valuesForms.description = "";
        valuesForms.color = "#009FBD";
    };

    const findProjectsByStatus = (status: ProjectStatus) => {
        return projects.value.filter(project => project.status === status);
    };

    const deleteProject = (id: number) => {
        projects.value = projects.value.filter(project => project.id !== id);
    };

    const updateProject = (id: number) => {
        const index = projects.value.findIndex(project => project.id === id);
        if (index !== -1) {
            projects.value[index].name = valuesForms.name;
            projects.value[index].description = valuesForms.description;
            projects.value[index].color = valuesForms.color;
        }
    };

    const searchProjectsByName = (name: string) => {
        return projects.value.filter(project => project.name.toLowerCase().includes(name.toLowerCase()));
    };

    const valuesForms = reactive({
        id: idProject,
        name: "",
        description: "",
        status: ProjectStatus.Active,
        color: "#009FBD"
    });

    return { valuesForms, addProject, projects, deleteProject, updateProject, findProjectsByStatus, searchProjectsByName };
});

<script setup lang="ts">
import CreateProject from "../project/CreateProject.vue";
import { ref, computed } from "vue";
import { useProjectStore } from "../../store/projects";
import { useNavigationStore } from "../../store/navigation";
const navigationStore = useNavigationStore();
import { ProjectStatus } from "../../enums/status";
import { useRouter } from "vue-router";
const projectStore = useProjectStore();
const modalCreate = ref(false);

const router= useRouter()

const allProjectsActive = computed(() => {
    return projectStore.findProjectsByStatus(ProjectStatus.Active)
})

const toogleModalCreate = () => {
    modalCreate.value = !modalCreate.value
}

const resetNavStore=()=>{
    navigationStore.resetProjectNav();
    router.push('/');
}
</script>

<template>

    <div class="pt-32 ">
        <div class="pb-9">
            <div class="flex flex-col gap-3  px-10">
                <div  @click="resetNavStore()">
                    <div  class="flex gap-3 text-gray-500 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                        </svg>
                        <span>Home</span>
                    </div>

                </div>


            </div>
        </div>
        <hr>
        <div class="p-5 relative">
            <div class="flex justify-between"><span class="text-sm">MY PROJECTS</span>
                <div v-on:click="toogleModalCreate()" class="cursor-pointer hover:scale-125 "><svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                </div>
            </div>
            <router-link to="/projects">
                <div class="w-full flex gap-2 flex-col">
                <div class="min-h-9 px-3 rounded-sm flex gap-3 justify-between group cursor-pointer hover:bg-blue-200 items-center"
                    v-for="(project, index) in allProjectsActive" :key="project.id"
                    v-on:click="navigationStore.setProject(index)"
                    :class="{ 'bg-blue-200': navigationStore.project.id === project.id }">
                    <div class="flex items-center gap-3">
                        <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: project.color }"></div>
                        <div>{{ project.name }}</div>
                    </div>
                    <div class="opacity-0 group-hover:opacity-100 text-2xl hover:scale-125"><svg
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </div>
                </div>
            </div>
            </router-link>


        </div>

        <div v-if="modalCreate">
            <CreateProject @update:toogleModalCreate="toogleModalCreate" />
        </div>
    </div>

</template>
<script setup lang="ts">
    import { computed } from "vue";
import { useProjectStore } from "../store/projects";
import { useTaskStore } from "../store/tasks";
import { ProjectStatus, TaskStatus } from "../enums/status";
import CardProject from "./CardProject.vue";


    const projectStore= useProjectStore()
    const taskStore= useTaskStore()

    const allProjectsForStatusActive=computed(()=>{
        return projectStore.findProjectsByStatus(ProjectStatus.Active)
    })

    const allProjectsForStatusInactive=computed(()=>{
        return projectStore.findProjectsByStatus(ProjectStatus.Inactive)
    })
</script>

<template>
    <div class="py-28 p-10 grid gap-5">
        <div>
            <div class="text-2xl font-semibold">Projects and Tasks</div>
        </div>
        <div class="grid grid-cols-4">
            <div class="flex items-center bg-[#fbc7b2] w-[220px] p-4 px-10 justify-between rounded-lg">
                <div>
                    <div>{{ taskStore.allTaskByStatus(TaskStatus.Pending).length }}</div>
                    <div class="font-light">Pending</div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-20">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>

                </div>
            </div>

            <div class="flex items-center bg-[#fce8b3] w-[220px] p-4 px-10 justify-between rounded-lg">
                <div>
                    <div>{{ taskStore.allTaskByStatus(TaskStatus.InProgress).length }}</div>
                    <div class="font-light">In Progress</div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-20">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                    </svg>

                </div>
            </div>

            <div class="flex items-center bg-[#c6afff] w-[220px] p-4 px-10 justify-between rounded-lg">
                <div>
                    <div>{{ taskStore.allTaskByStatus(TaskStatus.Completed).length }}</div>
                    <div class="font-light">completed</div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-20">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>

                </div>
            </div>

            <div class="flex items-center bg-[#b7f7e6] w-[220px] p-4 px-10 justify-between rounded-lg">
                <div>
                    <div>{{ allProjectsForStatusActive.length }}</div>
                    <div class="font-light">Total Projects</div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-20 font-light">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                    </svg>
                </div>
            </div>
        </div>

        <div>
            <div class="text-xl font-semibold">Active Projects</div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div v-for="project in allProjectsForStatusActive">
                <CardProject :project="project"/>
            </div>
        </div>


        <div>
            <div class="text-xl font-semibold">Inactive Projects</div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div v-for="project in allProjectsForStatusInactive">
                <CardProject :project="project"/>
            </div>
        </div>



    </div>
</template>
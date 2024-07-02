<script setup lang="ts">
import { computed, ref } from "vue";
import { useTaskStore } from "../store/tasks";
import { useNavigationStore } from "../store/navigation";
import {  TaskStatus } from "../enums/status";
import { Task } from "../types/taskTypes";
import BodyHeader from "./BodyHeader.vue";
import CardCreate from "./CardCreate.vue";
import TaskCard from "./TaskCard.vue";

const navigationStore = useNavigationStore();
const tasksStore = useTaskStore();

const newTask = ref(false);
const dragItem = ref<number | null>(null);






const handleDragStart = (id?: number) => {
    if (id !== undefined) {
        dragItem.value = id;
        navigationStore.idTaskDrop=id;
    }
};



const addValuesTask = (task: Task) => {
    tasksStore.valuesFormsEdit = task;
};

const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
};

const handleDrop = (id?: number, taskStatus?: TaskStatus) => {
    if (id !== undefined && taskStatus !== undefined) {
        tasksStore.handleDrop(id, dragItem, taskStatus);
        dragItem.value = null;
    }
};

const handleDropChangeStatus = (taskStatus: TaskStatus) => {
    if (dragItem.value !== null) {
        tasksStore.changeTaskStatus(dragItem.value, taskStatus);
        dragItem.value = null;
    }
};

const toggleModalCreate = () => {
    newTask.value = !newTask.value;
};




const allTasksForStatusPending = computed(() =>
    tasksStore.allTaskForProjectByStatus(TaskStatus.Pending, navigationStore.project.id)
);

const allTasksForStatusProgress = computed(() =>
    tasksStore.allTaskForProjectByStatus(TaskStatus.InProgress, navigationStore.project.id)
);

const allTasksForStatusCompleted = computed(() =>
    tasksStore.allTaskForProjectByStatus(TaskStatus.Completed, navigationStore.project.id)
);
</script>



<template>
    <div class="relative px-10 pt-32 overflow-auto max-h-[800px] scrollbar-small">

        <BodyHeader />

        
        <!-- contente cards -->
        <div class="grid gap-1 grid-cols-3 py-7">
            <div class="relative  bg-blue-50 rounded-xl py-3 max-h-[800px] overflow-y-scroll scrollbar-small"
                @dragover="handleDragOver" @drop="handleDropChangeStatus(TaskStatus.Pending)">
                <div class=" px-4 grid gap-3">
                    <div class="flex gap-3 justify-between">
                        <div class="flex gap-2 items-center">
                            <div>Pendding</div>
                            <div class="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs">{{ allTasksForStatusPending.length }}</div>
                        </div>
                        <div class="w-6 h-6 bg-blue-200 text-blue-700 rounded-sm cursor-pointer hover:scale-125"
                            @click="toggleModalCreate">
                            <svg v-if="!newTask" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <svg v-if="newTask" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="size-6 text-red-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                    <div class="bg-blue-300 h-1"></div>
                </div>
                <div class="grid gap-2 p-5">
                    <div v-if="newTask" class="top-0 min-h-36 bg-white shadow-sm rounded-md p-2">
                        <CardCreate :newTask="newTask" @update:newTask="toggleModalCreate" />
                    </div>


                    <div class="group relative min-h-36 bg-white shadow-sm rounded-md"
                        v-for="(task) in allTasksForStatusPending" :key="task.id" :draggable="true"
                        @dragstart="handleDragStart(task.id)" @dragover="handleDragOver"
                        @drop="handleDrop(task.id, TaskStatus.Pending)"
                        :class="{ 'bg-slate-200': task.id === dragItem }" @click="(addValuesTask(task))">
                        <TaskCard :task="task" />

                    </div>
                </div>

            </div>

            <div class="relative  bg-blue-50 rounded-xl py-3 max-h-[800px] overflow-y-scroll scrollbar-small"
                @dragover="handleDragOver" @drop="handleDropChangeStatus(TaskStatus.InProgress)">
                <div class=" px-4 grid gap-3">
                    <div class="flex gap-3 justify-between">
                        <div class="flex gap-2 items-center">
                            <div>On progress</div>
                            <div class="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs">{{ allTasksForStatusProgress.length }}</div>
                        </div>
                    </div>
                    <div class="bg-orange-200 h-1"></div>
                </div>
                <div class="grid gap-2 p-5">
                    <div class="group relative min-h-36 bg-white shadow-sm rounded-md"
                        v-for="(task) in allTasksForStatusProgress" :key="task.id" :draggable="true"
                        @dragstart="handleDragStart(task.id)" @dragover="handleDragOver"
                        @drop="handleDrop(task.id, TaskStatus.InProgress)"
                        :class="{ 'bg-slate-200': task.id === dragItem }" @click="(addValuesTask(task))">
                        <TaskCard :task="task" />
                    </div>
                </div>

            </div>


            <div class="relative  bg-blue-50 rounded-xl py-3 max-h-[800px] overflow-y-scroll scrollbar-small"
                @dragover="handleDragOver" @drop="handleDropChangeStatus(TaskStatus.Completed)">
                <div class=" px-4 grid gap-3">
                    <div class="flex gap-3 justify-between">
                        <div class="flex gap-2 items-center">
                            <div>Completed</div>
                            <div class="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs">{{ allTasksForStatusCompleted.length }}</div>
                        </div>
                    </div>
                    <div class="bg-green-400 h-1"></div>
                </div>
                <div class="grid gap-2 p-5">
                    <div class="group relative min-h-36 bg-white shadow-sm rounded-md"
                        v-for="(task) in allTasksForStatusCompleted" :key="task.id" :draggable="true"
                        @dragstart="handleDragStart(task.id)" @dragover="handleDragOver"
                        @drop="handleDrop(task.id, TaskStatus.Completed)"
                        :class="{ 'bg-slate-200': task.id === dragItem }" @click="(addValuesTask(task))">
                        <TaskCard :task="task" :completed="true" />
                    </div>
                </div>

            </div>


        </div>
    </div>

</template>
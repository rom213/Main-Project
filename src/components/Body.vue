<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useTaskStore } from "../store/tasks";
import { useNavigationStore } from "../store/navigation";
import { TaskImportance, TaskStatus } from "../enums/status";
import { Task } from "../types/taskTypes";
import BodyHeader from "./BodyHeader.vue";


const navigationStore = useNavigationStore();

const tasksStore = useTaskStore();


const newTask = ref(false)
const dragItem = ref<number | null>(null);

const hadleDragStart = (id: number | undefined) => {
    if (id) {
        dragItem.value = id
    }
}

const deleteTask = (id: number | undefined) => {
    if (id) {
        tasksStore.deleteTask(id)
    }
}

const addValuesTask = (task: Task) => {
    tasksStore.valuesFormsEdit = task
}


const handeleDragOver = (event) => {
    event.preventDefault();
}

/* const handleDragLeave = (event) => {
  // Quitar estilos temporales
  const target = event.currentTarget;
  target.style.marginBottom = "0px";
}; */

const handleDrop = (id: number | undefined, taskStatus: TaskStatus) => {
    if (id) {
        tasksStore.handleDrop(id, dragItem, taskStatus)
        dragItem.value = null;
    }
};

const handleDropChangeStatus = (taskStatus: TaskStatus) => {
    if (dragItem.value !== null) {
        tasksStore.changeTaskStatus(dragItem.value, taskStatus);
        dragItem.value = null;
    }
};



const modalCreate = () => {
    newTask.value = !newTask.value
}


const submitTask = () => {
    tasksStore.addTask(navigationStore.project.id);
    newTask.value = false
}


const allTasksForStatusPending = computed(() => {
    return tasksStore.allTaskForProjectByStatus(TaskStatus.Pending, navigationStore.project.id)
})

const allTasksForStatusProgress = computed(() => {
    return tasksStore.allTaskForProjectByStatus(TaskStatus.InProgress, navigationStore.project.id)
})

const allTasksForStatusCompleted = computed(() => {
    return tasksStore.allTaskForProjectByStatus(TaskStatus.Completed, navigationStore.project.id)
})
</script>


<template>
    <div class="relative px-10 pt-32 overflow-auto max-h-[800px] scrollbar-small">
        <BodyHeader />
        <div class="grid gap-1 grid-cols-3 py-7">
            <div class="relative  bg-blue-50 rounded-xl py-3 max-h-[800px] overflow-y-scroll scrollbar-small"
                @dragover="handeleDragOver" @drop="handleDropChangeStatus(TaskStatus.Pending)">
                <div class=" px-4 grid gap-3">
                    <div class="flex gap-3 justify-between">
                        <div>
                            <span class="bg-blue-400 h-3 w-3 rounded-full"></span>
                            <span>Pendding</span>
                        </div>
                        <div class="w-6 h-6 bg-blue-200 text-blue-700 rounded-sm cursor-pointer hover:scale-125"
                            @click="modalCreate">
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
                        <form class="grid gap-4" @submit.prevent="submitTask">
                            <select name="taskImportance" id="taskImportance"
                                class="h-8 px-3 py-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option v-for="taskImportance in TaskImportance" :key="taskImportance"
                                    :value="taskImportance">
                                    {{ taskImportance }}
                                </option>
                            </select>

                            <input v-model="tasksStore.valuesForms.nombre" name="nombre" id="nombre" type="text"
                                class="border focus:border-black focus:outline-none pl-1 py-1 rounded-md"
                                placeholder="Nombre de la tarea">

                            <textarea v-model="tasksStore.valuesForms.description" name="description" id="description"
                                class="border focus:border-black focus:outline-none pl-1 py-1 rounded-md"
                                placeholder="Escribe una descripción" rows="4"></textarea>
                            <button class="flex justify-end pr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6 hover:text-green-500 cursor-pointer">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                            </button>
                        </form>
                    </div>


                    <!--                    <div  class="min-h-36 bg-white shadow-sm rounded-md">

                    </div> -->


                    <div class="group relative min-h-36 bg-white shadow-sm rounded-md"
                        v-for="(task, index) in allTasksForStatusPending" :key="task.id" :draggable="true"
                        @dragstart="hadleDragStart(task.id)" @dragover="handeleDragOver"
                        @drop="handleDrop(task.id, TaskStatus.Pending)"
                        :class="{ 'bg-slate-200': task.id === dragItem }" @click="(addValuesTask(task))">
                        <div class="group-focus-within:opacity-0 group-focus-within:absolute p-4">
                            <div class="flex justify-between">
                                <div class="h-5 w-8  text-[10px] flex items-center justify-center rounded-sm" :class="{
                                    'bg-orange-50 text-orange-600': task.importance === TaskImportance.Low,
                                    'bg-red-100 text-red-700': task.importance === TaskImportance.High,
                                    'bg-yellow-100 text-yellow-700': task.importance === TaskImportance.Half,
                                }">{{
                                    task.importance === TaskImportance.Low ? 'low' : task.importance ===
                                        TaskImportance.High
                                        ? 'high' : 'half' }}</div>
                                <div class="relative">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor"
                                        class="group-focus-within:opacity-0 size-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    <input type="text" class="absolute top-0 w-4 opacity-0">
                                    <div class="flex justify-end pr-3 cursor-pointer" @click="deleteTask(task.id)">
                                        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="size-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="text-xs font-semibold">{{ task.nombre }}</div>
                                <span>{{ task.description }}</span>
                            </div>
                        </div>

                        <div class="hidden absolute group-focus-within:block group-focus-within:relative top-0 left-0">
                            <form class="grid gap-2 p-2 rounded-lg bg-white" @submit.prevent="">
                                <select v-model="tasksStore.valuesFormsEdit.importance" name="taskImportance"
                                    id="taskImportance"
                                    class="h-8 px-3 py-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option v-for="taskImportance in Object.values(TaskImportance)"
                                        :key="taskImportance" :value="taskImportance">
                                        {{ taskImportance }}
                                    </option>
                                </select>

                                <input v-model="tasksStore.valuesFormsEdit.nombre" name="nombre" id="nombre" type="text"
                                    class="border focus:border-black focus:outline-none pl-1 py-1 rounded-md"
                                    placeholder="Nombre de la tarea" autocomplete="off">

                                <textarea v-model="tasksStore.valuesFormsEdit.description" name="description"
                                    id="description"
                                    class="border focus:border-black focus:outline-none pl-1 py-1 rounded-md"
                                    placeholder="Escribe una descripción" rows="4"></textarea>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

            <div class="relative  bg-blue-50 rounded-xl py-3 max-h-[800px] overflow-y-scroll scrollbar-small"
                @dragover="handeleDragOver" @drop="handleDropChangeStatus(TaskStatus.InProgress)">
                <div class=" px-4 grid gap-3">
                    <div class="flex gap-3 justify-between">
                        <div>
                            <span class="bg-blue-400 h-3 w-3 rounded-full"></span>
                            <span>On Progress</span>
                        </div>
                    </div>
                    <div class="bg-orange-200 h-1"></div>
                </div>
                <div class="grid gap-2 p-5">


                    <div class="min-h-36 bg-white p-4 shadow-sm rounded-md"
                        v-for="(task, index) in allTasksForStatusProgress" :key="task.id" :draggable="true"
                        @dragstart="hadleDragStart(task.id)" @dragover="handeleDragOver"
                        @drop="handleDrop(task.id, TaskStatus.InProgress)"
                        :class="{ 'bg-slate-200': task.id === dragItem }">
                        <div class="flex justify-between">
                            <div class="h-5 w-8  text-[10px] flex items-center justify-center rounded-sm" :class="{
                                'bg-orange-50 text-orange-600': task.importance === TaskImportance.Low,
                                'bg-red-100 text-red-700': task.importance === TaskImportance.High,
                                'bg-yellow-100 text-yellow-700': task.importance === TaskImportance.Half,
                            }">{{
                                task.importance === TaskImportance.Low ? 'low' : task.importance === TaskImportance.High
                                    ? 'high' : 'half' }}</div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xs font-semibold">{{ task.nombre }}</div>
                            <span>{{ task.description }}</span>
                        </div>
                        <div></div>
                    </div>
                </div>


            </div>


            <div class="relative  bg-blue-50 rounded-xl py-3 max-h-[800px] overflow-y-scroll scrollbar-small"
                @dragover="handeleDragOver" @drop="handleDropChangeStatus(TaskStatus.Completed)">
                <div class=" px-4 grid gap-3">
                    <div class="flex gap-3 justify-between">
                        <div>
                            <span class="bg-blue-400 h-3 w-3 rounded-full"></span>
                            <span>Completed</span>
                        </div>
                    </div>
                    <div class="bg-green-400 h-1"></div>
                </div>
                <div class="grid gap-2 p-5">


                    <div class="min-h-36 bg-white p-4 shadow-sm rounded-md"
                        v-for="(task, index) in allTasksForStatusCompleted" :key="task.id" :draggable="true"
                        @dragstart="hadleDragStart(task.id)" @dragover="handeleDragOver"
                        @drop="handleDrop(task.id, TaskStatus.Completed)"
                        :class="{ 'bg-slate-200': task.id === dragItem }">
                        <div class="flex justify-between">
                            <div
                                class="h-5 w-16  text-[10px] flex items-center justify-center rounded-sm bg-green-300 text-green-900">
                                Completed</div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div class="text-xs font-semibold">{{ task.nombre }}</div>
                            <span>{{ task.description }}</span>
                        </div>
                        <div></div>
                    </div>
                </div>


            </div>


        </div>
    </div>

</template>
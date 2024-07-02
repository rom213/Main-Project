<script setup lang="ts">
import { ref, watch } from 'vue';
import { TaskImportance, TaskStatus } from '../../enums/status';
import { useTaskStore } from '../../store/tasks';
import { Task } from '../../types/taskTypes';

const tasksStore = useTaskStore();

const tempTask = ref<Task>({
    description: "",
    idProject: 0,
    importance: TaskImportance.Low,
    name: "",
    status: TaskStatus.Pending,
});

const status = ref({
    error_descripcion: false,
    error_name: false,
});

const showMessageError = (type: "descripcion" | "name") => {
    status.value[`error_${type}`] = true;
    setTimeout(() => {
        status.value[`error_${type}`] = false;
    }, 4000);
};

const isFormVisible = ref(false);

const submitTask = () => {
    const { description, name } = tempTask.value;

    let hasError = false;

    if (description === "") {
        showMessageError("descripcion");
        tempTask.value.description=props.task.description
        hasError = true;

    }

    if (name === "") {
        showMessageError("name");
        tempTask.value.name=props.task.name
        hasError = true;
    }

    if (!hasError) {
        tasksStore.changeTask(tempTask.value);
        isFormVisible.value = false;
    }
};

const props = defineProps<{
    task: Task,
    completed?: boolean
}>();

watch(() => props.task, (newTask) => {
    tempTask.value = { ...newTask }
}, { immediate: true });

</script>

<template>
    <div>
        <div class="group-focus-within:opacity-0 group-focus-within:absolute p-4">
            <div class="flex justify-between">
                <div v-if="!completed" class="h-5 w-8 text-[10px] flex items-center justify-center rounded-sm" :class="{
                    'bg-orange-50 text-orange-600': task.importance === TaskImportance.Low,
                    'bg-red-100 text-red-700': task.importance === TaskImportance.High,
                    'bg-yellow-100 text-yellow-700': task.importance === TaskImportance.Half,
                }">
                    {{
                        task.importance === TaskImportance.Low ? 'low' :
                            task.importance === TaskImportance.High ? 'high' : 'half'
                    }}
                </div>

                <div v-if="completed"
                    class="h-5 w-16 text-[10px] flex items-center justify-center rounded-sm bg-green-300 text-green-900">
                    Completed
                </div>

                <div class="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="group-focus-within:opacity-0 size-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <input type="text" class="absolute top-0 w-4 opacity-0 cursor-pointer"
                        @focus="isFormVisible = true">
                </div>
            </div>
            <div>
                <div class="text-xs font-semibold">{{ task.name }}</div>
                <span>{{ task.description }}</span>
            </div>
        </div>

        <div v-if="isFormVisible"
            class="hidden absolute group-focus-within:block group-focus-within:relative top-0 left-0">
            <form class="grid gap-4 p-2 rounded-lg bg-white" @submit.prevent="submitTask()">
                <select v-model="tempTask.importance" name="taskImportance" id="taskImportance"
                    class="h-8 px-3 py-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option v-for="taskImportance in Object.values(TaskImportance)" :key="taskImportance"
                        :value="taskImportance">
                        {{ taskImportance }}
                    </option>
                </select>
                <div class="grid relative">
                    <input v-model="tempTask.name" name="name" id="name" type="text"
                        class="border focus:border-black focus:outline-none pl-1 py-1 rounded-md"
                        placeholder="name of the homework" autocomplete="off">
                    <span v-if="status.error_name" class="text-[12px] text-red-600 absolute -bottom-4">Add valid data to
                        the task name</span>
                </div>
                <div class="grid relative">
                    <textarea v-model="tempTask.description" name="description" id="description"
                        class="border focus:border-black focus:outline-none pl-1 py-1 rounded-md"
                        placeholder="Write a description" rows="4"></textarea>
                    <span v-if="status.error_descripcion" class="text-[12px] text-red-600 absolute -bottom-5">Add valid
                        data to the task description</span>
                </div>
                <button class="flex justify-end pr-2" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 hover:text-green-500 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </form>
        </div>
    </div>
</template>

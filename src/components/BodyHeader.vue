<script setup lang="ts">
import { ref } from "vue";
import { useNavigationStore } from "../store/navigation";
import { useTaskStore } from "../store/tasks";

const navigationStore = useNavigationStore();
const taskStore = useTaskStore();
const editTitle = ref(true);
const tempTitle = ref(navigationStore.project.name);
const error = ref(0);

const showMessage = (valError: number) => {
    error.value = valError;
    setTimeout(() => {
        error.value = 0;
    }, 4000);
};

const editTitleAccion = () => {
    if (!editTitle.value) {
        tempTitle.value = navigationStore.project.name;

    }
    editTitle.value = !editTitle.value;
};

const handleSubmit = () => {
    if (tempTitle.value !== "") {
        navigationStore.project.name = tempTitle.value;
        editTitle.value = true;
        return
    }
    editTitle.value = true;
    tempTitle.value = navigationStore.project.name
    showMessage(1);

};

const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
};

const handleDropTask = () => {
    taskStore.deleteTask(navigationStore.idTaskDrop)
}
</script>

<template>
    <div class="grid gap-6">
        <div class="flex justify-between">
            <div class="flex items-center gap-3 relative">
                <h2 v-if="editTitle" class="text-4xl font-bold">{{ navigationStore.project.name }}</h2>
                <form @submit.prevent="handleSubmit" class="grid">
                    <input v-model="tempTitle" v-if="!editTitle" type="text"
                        class="text-4xl font-bold pl-1 border border-black" />
                    <div v-if="error === 1" class="text-red-400 absolute w-96 top-10 left-1">Por favor escribe un titulo
                        valido</div>
                </form>

                <div class="flex gap-2">
                    <button v-if="!editTitle" v-on:click="handleSubmit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-7 hover:text-green-500 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </button>
                    <div v-if="editTitle" @click="editTitleAccion"
                        class="w-5 h-5 bg-blue-200  rounded-md flex items-center justify-center cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-4 text-blue-600">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </div>

                </div>

            </div>
            <div>
                <div class="flex items-center space-x-2">
                    <div class="flex -space-x-2">
                        <img class="w-8 h-8 rounded-full border-2 border-white"
                            src="https://randomuser.me/api/portraits/men/1.jpg" alt="User 1">
                        <img class="w-8 h-8 rounded-full border-2 border-white"
                            src="https://randomuser.me/api/portraits/women/2.jpg" alt="User 2">
                        <img class="w-8 h-8 rounded-full border-2 border-white"
                            src="https://randomuser.me/api/portraits/men/3.jpg" alt="User 3">
                        <img class="w-8 h-8 rounded-full border-2 border-white"
                            src="https://randomuser.me/api/portraits/men/4.jpg" alt="User 4">
                        <div
                            class="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-gray-600">
                            +2</div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div>
                <div class="flex relative space-x-2" @dragover="handleDragOver" @drop="handleDropTask()">
                    <button
                        class="flex justify-around items-center px-1 w-36 py-2 border border-gray-300 rounded-md text-gray-700">
                        drag here
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                    </button>


                </div>
            </div>
        </div>
    </div>
</template>
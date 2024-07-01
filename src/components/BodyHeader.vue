<script setup lang="ts">
import { ref, toRaw } from "vue";
import { useNavigationStore } from "../store/navigation";

const navigationStore = useNavigationStore();
const editTitle = ref(true);
const tempTitle = ref(navigationStore.project.title);
const error = ref(0);

const showMessage = (valError: number) => {
    error.value = valError;
    setTimeout(() => {
        error.value = 0;
    }, 4000);
};

const editTitleAccion = () => {
    if (!editTitle.value) {
        tempTitle.value = navigationStore.project.title;

    }
    editTitle.value = !editTitle.value;
};

const handleSubmit = () => {
    if (tempTitle.value !== "") {
        navigationStore.project.title = tempTitle.value;
        editTitle.value = true;
        return
    }
    editTitle.value = true;
    tempTitle.value = navigationStore.project.title
    showMessage(1);

};
</script>

<template>
    <div class="grid gap-6">
        <div class="flex justify-between">
            <div class="flex items-center gap-3 relative">
                <h2 v-if="editTitle" class="text-4xl font-bold">{{ navigationStore.project.title }}</h2>
                <form @submit.prevent="handleSubmit" class="grid">
                    <input v-model="tempTitle" v-if="!editTitle" type="text" class="text-4xl font-bold pl-1 border border-black" />
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
                    <div v-if="editTitle" class="w-5 h-5 bg-blue-200 rounded-md flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-4 text-blue-600">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg>
                    </div>
                </div>

            </div>
            <div>
                <div class="flex items-center space-x-2">
                    <button class="px-3 py-1 rounded-lg flex gap-1 items-center text-blue-400">
                        <div class="w-5 h-5 bg-blue-200 text-blue-700 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>Invite
                    </button>
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
                <div class="flex relative space-x-2">
                    <button
                        class="flex justify-around items-center px-1 w-36 py-2 border border-gray-300 rounded-md text-gray-700">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v4a1 1 0 01-1 1h-1l-2 7h-2l-2-7h-4l-2 7H6l-2-7H3a1 1 0 01-1-1V4z">
                            </path>
                        </svg>
                        Filter by
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                            </path>
                        </svg>
                    </button>

                    <!--                         <div class="absolute w-36 h-6 bg-red-200 -left-2 top-10">
                            <div class="flex">creation order <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                </svg>
                            </div>
                            <div></div>
                            <div></div>
                        </div> -->
                </div>
            </div>
            <div></div>
        </div>
    </div>
</template>
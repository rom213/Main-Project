<script setup lang="ts">
import { defineEmits, ref } from "vue";
import { useProjectStore } from "../store/projects";

const projectStore = useProjectStore()

const emit = defineEmits<{
    (e: 'update:toogleModalCreate'): void;
}>();

const toogleModalCreate = () => {
    emit('update:toogleModalCreate');
}

const error = ref({
    error_descripcion: false,
    error_name: false,
});

const showMessageError = (type: "descripcion" | "name") => {
    error.value[`error_${type}`] = true;
    setTimeout(() => {
        error.value[`error_${type}`] = false;
    }, 4000);
};

const submitForm = () => {

    const { description, name } = projectStore.valuesForms;
    let hasError = false;

    if (description === "") {
        showMessageError("descripcion");
        hasError = true;
    }

    if (name === "") {
        showMessageError("name");
        hasError = true;
    }

    if (!hasError) {
        projectStore.addProject();
        toogleModalCreate();
    }
}
</script>

<template>
    <form @submit.prevent="submitForm"
        class="fixed grid gap-3 z-50 w-96 bg-white left-1/3 bottom-1/3 rounded-xl p-6 shadow-md">
        <div class="font-semibold">Create new project</div>
        <div class="grid relative">
            <span class="font-light">name</span>
            <input v-model="projectStore.valuesForms.name" type="text"
                class="outline-none border pl-2 border-gray-500 h-8 rounded-sm">
            <span v-if="error.error_name" class="text-[12px] text-red-600 absolute -bottom-4">Add valid data to the task name</span>
        </div>
        <div class="grid relative">
            <span class="font-light">Description</span>
            <textarea v-model="projectStore.valuesForms.description" rows="-2" type="text"
                class="outline-none pl-2 border border-gray-500 h-8 rounded-sm"></textarea>
            <span v-if="error.error_descripcion" class="text-[12px] text-red-600 absolute -bottom-5">Add valid data to
                the task description</span>
        </div>
        <div class="grid">
            <span class="font-light">select an color</span>
            <input v-model="projectStore.valuesForms.color" type="color"
                class="border-none outline-none rounded-xl transition duration-300 ease-in-out hover:scale-105">
        </div>
        <div class="flex justify-end gap-2 font-light">
            <button @click="toogleModalCreate()" class="bg-red-300 py-[8px] px-3 rounded-lg">Close</button>
            <button type="submit" class="bg-blue-300 p-1 px-3 rounded-lg">Save</button>
        </div>
    </form>
</template>

<script setup lang="ts">
    import { useProjectStore } from "../store/projects" 
    const projectsStore= useProjectStore();
    const submitForm=()=>{
        alert("hola")
        projectsStore.addProject();
    }

    const deleteProject=(id:number)=>{
        projectsStore.deleteProject(id);
    }

</script>

<template>
<div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="submitForm">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Title project
      </label>
      <input v-model="projectsStore.valuesForms.title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Description
      </label>
      <textarea v-model="projectsStore.valuesForms.description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text"> </textarea>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Create project
      </button>
      <button @click="deleteProject(1)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            delete project
      </button>
    </div>
  </form>
</div>
</template>
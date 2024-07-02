<script setup lang="ts">
import { useProjectStore } from '../store/projects.ts'
import { computed, ref } from 'vue'

const projectStore = useProjectStore()
const searchQuery = ref('')

const filteredProjects = computed(() => {
    return projectStore.searchProjectsByName(searchQuery.value)
})




</script>


<template>
  <header class="bg-white shadow p-4 flex justify-between items-center fixed w-full z-10 min-w-[840px]">
    <!-- Logo -->
    <div class="flex items-center space-x-2 px-11">
      <img src="https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png" alt="Logo" class="h-8 w-8">
      <span class="text-xl font-semibold">Main Project</span>
    </div>

    <!-- Search bar -->
    <div class="flex-1 mx-4 relative group">
      <input v-model="searchQuery" type="text" placeholder="Search for project"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
      <div class="absolute hidden group-focus-within:block w-full bg-white shadow-md  rounded-sm flex flex-col gap-2 pb-5 rounded-b-xl">
        <div class="hover:bg-slate-300 h-[35px] px-4" v-if="searchQuery !== ''" v-for="project in filteredProjects" :key="project.id">{{ project.name }}</div>
      </div>
    </div>

    <!-- User profile -->
    <div class="flex items-center space-x-4 px-20">
      <button class="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
        </svg>

      </button>
      <button class="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600">
        <svg class="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8h18M3 12h18M3 16h18">
          </path>
        </svg>
      </button>
      <button class="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600">
        <svg class="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </button>
      <div class="flex items-center space-x-1">
        <img
          src="data:image/jpeg;base64,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"
          alt="User" class="h-10 w-10 rounded-full">
        <div class="text-sm">
          <div class="font-semibold">Anima Agrawal</div>
          <div class="text-gray-500">U.P, India</div>
        </div>
      </div>
    </div>
  </header>

</template>
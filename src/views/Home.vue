<script setup lang="ts">
import { ref, computed } from 'vue';
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import Body from "../components/Body.vue";
import Statistics from "../components/Statistics.vue";

const routes = {
  '': Body,
  '/home': Statistics
}

const currentPath = ref(window.location.hash.slice(1) || '')

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash.slice(1) || ''
})

const currentView = computed(() => {
  return routes[currentPath.value] || NotFound
})

// Estado para controlar la visibilidad del sidebar
const isSidebarVisible = ref(true);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};
</script>

<template>
  <div>
    <Header />
    <div class="grid min-w-[1200px]" :class="isSidebarVisible ? 'grid-cols-10' : 'grid-cols-12'">
      <div v-if="isSidebarVisible" class="col-span-2">
        <Sidebar />
      </div>
      <div :class="isSidebarVisible ? 'col-span-8' : 'col-span-12'">
        <component :is="currentView" />
      </div>
    </div>

    <div class="flex justify-end p-2 fixed top-20 left-2">
      <button @click="toggleSidebar" class="">
        <div v-if="isSidebarVisible">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
          </svg>
        </div>
        <div v-if="!isSidebarVisible">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>

  import Home from "./views/Home.vue";
  import { ref, computed } from 'vue'


const routes = {
  '/home': Home
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <Home/>
</template>



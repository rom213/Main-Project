<script setup lang="ts">
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import Body from "../components/Body.vue";
</script>

<template>
  <div>
    <Header />
    <div class="grid grid-cols-10">
      <div class="col-span-2">
        <Sidebar />
      </div>
      <div class="col-span-8">
        <Body />
      </div>

    </div>

  </div>
</template>
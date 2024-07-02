<script setup lang="ts">
import { useTaskStore } from "../store/tasks";
import { useNavigationStore } from "../store/navigation";
import { TaskImportance } from "../enums/status";
import { ref, defineEmits } from "vue";

defineProps<{
  newTask: boolean
}>()

const emit = defineEmits<{
  (e: 'update:newTask'): void;
}>();

const toogleNewTask = () => {
  emit('update:newTask');
}

const navigationStore = useNavigationStore();
const tasksStore = useTaskStore();

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

const submitTask = () => {
  const { description, name } = tasksStore.valuesForms;
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
    tasksStore.addTask(navigationStore.project.id);
    toogleNewTask();
  }
};
</script>

<template>
  <form class="grid gap-4" @submit.prevent="submitTask">
    <select name="taskImportance" id="taskImportance"
      class="h-8 px-3 py-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      <option v-for="taskImportance in TaskImportance" :key="taskImportance" :value="taskImportance">
        {{ taskImportance }}
      </option>
    </select>
    <div class="grid relative">
      <input v-model="tasksStore.valuesForms.name" name="name" id="name" type="text"
        class="border focus:border-black focus:outline-none pl-1 py-1 rounded-md" placeholder="name de la tarea">
      <span v-if="error.error_name" class="text-[12px] text-red-600 absolute -bottom-4">Add valid data to the task name</span>
    </div>
    <div class="grid relative">
      <textarea v-model="tasksStore.valuesForms.description" name="description" id="description"
        class="border focus:border-black focus:outline-none pl-1 py-1 rounded-md" placeholder="Escribe una descripción"
        rows="4"></textarea>
      <span v-if="error.error_descripcion" class="text-[12px] text-red-600 absolute -bottom-5">Add valid data to the task description</span>
    </div>
    <button class="flex justify-end pr-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="size-6 hover:text-green-500 cursor-pointer">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </button>
  </form>
</template>

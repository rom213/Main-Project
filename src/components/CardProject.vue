<script setup lang="ts">
import { Project } from '../types/projectTypes';
import { useTaskStore } from "../store/tasks";
import { computed, ref, watchEffect } from 'vue';
import { TaskStatus } from '../enums/status';

const taskStore = useTaskStore();

const props = defineProps<{
    project: Project,
}>();

const percentaje = ref<number>(0);

const updatePercentaje = () => {
    const pending = taskStore.allTaskForProjectByStatus(TaskStatus.Pending, props.project.id).length;
    const inProgress = taskStore.allTaskForProjectByStatus(TaskStatus.InProgress, props.project.id).length;
    const completed = taskStore.allTaskForProjectByStatus(TaskStatus.Completed, props.project.id).length;

    const totalTasks = pending + inProgress + completed;
    
    percentaje.value = parseFloat(((completed * 100) / totalTasks).toFixed(2)) | 0;
};

watchEffect(() => {
    updatePercentaje();
});

</script>

<template>
    <div class="p-5 h-40 flex flex-col bg-white border border-gray-200 gap-5 rounded-xl">
        <div>
            <div class="text-xl">{{ project.name }}</div>
            <div class="font-thin">{{ project.description }}</div>
        </div>
        <div>
            <div class="h-3 bg-blue-100 rounded-xl">
                <div class="h-3 rounded-xl" :class="{'bg-green-300':percentaje===100, 'bg-red-300':percentaje!==100 }" :style="{ width: percentaje + '%' }"></div>
            </div>
            <div class="font-thin flex justify-between">
                <div>Progress</div>
                <div v-if="percentaje!==100">{{ percentaje }}%</div>
                <div v-if="percentaje===100" class="text-green-800">Complete</div>
            </div>
        </div>
    </div>
</template>

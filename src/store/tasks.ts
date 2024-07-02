import { defineStore } from 'pinia';
import { Ref, reactive, ref } from 'vue';
import { TaskImportance, TaskStatus } from '../enums/status';
import { Task } from '../types/taskTypes';


export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);


  const sampleData: Task[] = [
    { id: 1, importance: TaskImportance.High, name: 'Research Quantum Computing', description: 'Explore the potentials of quantum algorithms for optimization.', idProject: 1, status: TaskStatus.Pending },
    { id: 2, importance: TaskImportance.Half, name: 'Design Marketing Campaign', description: 'Draft initial concept for the spring product launch.', idProject: 1, status: TaskStatus.Completed },
    { id: 3, importance: TaskImportance.Low, name: 'Update Employee Handbook', description: 'Incorporate new policies and guidelines for remote work.', idProject: 4, status: TaskStatus.Pending },
    { id: 4, importance: TaskImportance.High, name: 'Develop Mobile App', description: 'Implement key features for the new fitness tracking app.', idProject: 5, status: TaskStatus.InProgress },
    { id: 5, importance: TaskImportance.Half, name: 'Create Budget Report', description: 'Compile Q1 financial data for board review.', idProject: 6, status: TaskStatus.Completed },
    { id: 6, importance: TaskImportance.Low, name: 'Conduct Customer Survey', description: 'Gather feedback on the latest software update.', idProject: 1, status: TaskStatus.Pending },
    { id: 7, importance: TaskImportance.High, name: 'Organize Hackathon', description: 'Plan event logistics and coordinate with speakers.', idProject: 8, status: TaskStatus.InProgress },
    { id: 8, importance: TaskImportance.Half, name: 'Develop Training Module', description: 'Create materials for new employee onboarding.', idProject: 7, status: TaskStatus.Pending },
    { id: 9, importance: TaskImportance.Low, name: 'Update Website Content', description: 'Revise and update the blog and news sections.', idProject: 1, status: TaskStatus.Completed },
    { id: 10, importance: TaskImportance.High, name: 'Implement Security Protocols', description: 'Enhance network security measures against cyber threats.', idProject: 7, status: TaskStatus.InProgress },
    { id: 11, importance: TaskImportance.Half, name: 'Analyze Market Trends', description: 'Examine the latest industry trends for strategic planning.', idProject: 7, status: TaskStatus.Pending },
    { id: 12, importance: TaskImportance.Low, name: 'Clean Data Sets', description: 'Perform data cleaning for the analytics project.', idProject: 7, status: TaskStatus.Completed },
    { id: 13, importance: TaskImportance.High, name: 'Draft Legal Contract', description: 'Prepare the contract for the new partnership agreement.', idProject: 2, status: TaskStatus.Pending },
    { id: 14, importance: TaskImportance.Half, name: 'Redesign Product Packaging', description: 'Create new designs for eco-friendly packaging.', idProject: 8, status: TaskStatus.InProgress },
    { id: 15, importance: TaskImportance.Low, name: 'Set Up Cloud Infrastructure', description: 'Configure and optimize cloud servers for better performance.', idProject: 16, status: TaskStatus.Completed },
    { id: 16, importance: TaskImportance.High, name: 'Prepare for Investor Meeting', description: 'Compile presentation materials and financial forecasts.', idProject: 1, status: TaskStatus.Pending },
    { id: 17, importance: TaskImportance.Half, name: 'Conduct Code Review', description: 'Review code for the latest software release and ensure quality.', idProject: 1, status: TaskStatus.InProgress },
    { id: 18, importance: TaskImportance.Low, name: 'Plan Team Building Activities', description: 'Organize activities to boost team morale and collaboration.', idProject: 4, status: TaskStatus.Completed },
    { id: 19, importance: TaskImportance.High, name: 'Launch New Product Line', description: 'Execute the launch plan for the new product line.', idProject: 1, status: TaskStatus.Pending },
    { id: 20, importance: TaskImportance.Half, name: 'Optimize SEO Strategy', description: 'Improve search engine optimization for better online visibility.', idProject: 8, status: TaskStatus.InProgress },
  ];

  let idTask = sampleData.length + 1;


  tasks.value = sampleData;

  const handleDrop = (id: number | undefined, dragItem: Ref<number | null>, taskStatus: TaskStatus) => {
    if (id === undefined || dragItem.value === null) return;

    const currentIndex = tasks.value.findIndex(task => task.id === dragItem.value);
    const dropIndex = tasks.value.findIndex(task => task.id === id);

    tasks.value[currentIndex].status = taskStatus
    if (currentIndex !== -1 && dropIndex !== -1) {
      if (dropIndex>=1) {
        const [draggedTask] = tasks.value.splice(currentIndex, 1);
        tasks.value.splice(dropIndex-1, 0, draggedTask);
      }else{
        const [draggedTask] = tasks.value.splice(currentIndex, 1);
        tasks.value.splice(dropIndex, 0, draggedTask);
      }

    }
  };

  const changeTaskStatus = (id: number, newStatus: TaskStatus) => {
    const task = tasks.value.find(task => task.id === id);
    if (task) {
      task.status = newStatus;
    } else {
      console.error(`Task with id ${id} not found`);
    }
  };

  const changeTask = (task: Task) => {
    const taskIndex = tasks.value.findIndex(tas => tas.id === task.id);
    tasks.value[taskIndex]=task
  };


  const orderTasks = () => {
    tasks.value = tasks.value.reverse()
  }

  const allTaskForProjectByStatus = (status: TaskStatus, idProject: number) => {
    return tasks.value.filter(task => task.idProject === idProject && task.status === status);
  };

  const allTaskByStatus = (status: TaskStatus) => {
    return tasks.value.filter(task => task.status === status);
  };

  const findTasksForIdProject = (idProject: number) => {
    return tasks.value.filter(task => task.idProject === idProject);
  };

  const findTaskById = (id: number) => {
    return tasks.value.find(task => task.id === id);
  };

  const addTask = (idProject: number) => {
    valuesForms.id = idTask++;
    valuesForms.idProject = idProject;
    tasks.value.push({ ...valuesForms });
    valuesForms.name = "";
    valuesForms.description = "";
    valuesForms.idProject = null;
  };

  const deleteTask = (id: number) => {
    tasks.value = tasks.value.filter(task => task.id !== id);
  };


  const resetForm = () => {
    valuesForms.name = "";
    valuesForms.description = "";
    valuesForms.idProject = null;
    valuesForms.importance = TaskImportance.Low;
    valuesForms.id = 0;
    valuesForms.status = TaskStatus.Pending

  }

  const valuesForms = reactive<Task>({
    id: 0,
    importance: TaskImportance.Low,
    name: "",
    description: "",
    idProject: null,
    status: TaskStatus.Pending,
  });

  const valuesFormsEdit = reactive<Task>({
    id: 0,
    importance: TaskImportance.Low,
    name: "",
    description: "",
    idProject: null,
    status: TaskStatus.Pending,
  });



  return {
    resetForm,
    valuesForms,
    addTask,
    tasks,
    deleteTask,
    findTasksForIdProject,
    findTaskById,
    allTaskForProjectByStatus,
    orderTasks,
    handleDrop,
    changeTaskStatus,
    valuesFormsEdit,
    changeTask,
    allTaskByStatus
  };
});

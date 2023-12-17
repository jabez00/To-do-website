<script lang="ts">
  import {onMount } from "svelte";
  import { addtask, taskDb} from "$lib/tasks";
  import type { taskType } from "$lib/tasks";
  import TaskListComp from "$lib/components/TaskListComp.svelte";
  const date = new Date().toLocaleDateString();
  let firstload = true;
  let user = "Jabez";
  let currentView = "todo";
  let todoView: taskType[] = [];
  let finishView: taskType[] = [];
  let archivedView: taskType[] = [];
  let priorityView: taskType[] = [];

  onMount(() => {
    firstload = false;
    const localTask = localStorage.getItem("task");
    if (localTask === null) {
      return;
    }
    taskDb.set(JSON.parse(localTask));
    taskDb.subscribe((currentData) => {
      todoView = currentData.filter((e) => !e.satf && !e.sata);
      finishView = currentData.filter((e) => e.satf);
      archivedView = currentData.filter((e) => e.sata);
      priorityView = currentData.filter((e)=> e.sati);
      if (typeof window !== "undefined") {
        localStorage.setItem("task", JSON.stringify(currentData));
      }
    });
  });

</script>

<!-- top section -->
<div class="flex h-24 flex-row bg-yellow-400">
  <div class="my-auto font-bold basis-1/4 text-center">{date}</div>
  <div class="my-auto basis-1/2 text-center text-4xl font-bold">To-Do Tracker</div>
  <div class="my-auto basis-1/4 font-bold text-center">{user}</div>
</div>

<!-- main components -->
<div class="flex min-h-screen flex-row">
  <!-- side bar -->
  <div class="w-1/6 bg-yellow-200">
    <!-- /add a new task -->
    <div class="flex mx-auto">
      <input
        on:keydown={addtask}
        class="mx-auto rounded-lg my-5 p-5"
        placeholder="Add a new task"
        type="text"
        name=""
        id=""
      />
    </div>
    <button
      on:click={() => (currentView = "todo")}
      class="flex w-full border-y-2 border-yellow-300 p-3 text-lg hover:bg-yellow-300"
    >
      <img
        src="https://api.iconify.design/material-symbols:playlist-add-check-rounded.svg?color=%23f6be00"
        alt="+"
        class="mt-1.5 pr-5"
      />
      Todos
    </button>

    <button
      class="flex w-full border-b-2 border-yellow-300 p-3 text-lg hover:bg-yellow-300"
      on:click={() => (currentView="priority")}
    >
      <img
        src="https://api.iconify.design/ic:baseline-star-outline.svg?color=%23f6be00"
        alt="+"
        class="mt-1.5 pr-5"
      />
      Priority tasks
  </button>
    <button
      class="flex w-full border-b-2 border-yellow-300 p-3 text-lg hover:bg-yellow-300"
      on:click={() => (currentView = "archived")}
    >
      <img
        src="https://api.iconify.design/material-symbols:archive-outline.svg?color=%23f6be00"
        alt="+"
        class="mt-1.5 pr-5"
      />
      Archived tasks
  </button>
    <button
      class="flex w-full border-b-2 border-yellow-300 p-3 text-lg hover:bg-yellow-300"
      on:click={() => (currentView = "finished")}
    >
      <img
        src="https://api.iconify.design/material-symbols:checklist-rtl.svg?color=%23f6be00"
        alt="+"
        class="mt-1.5 pr-5"
      />
      Finished tasks
    </button>

  </div>

  <!-- tasks cont -->
  {#if currentView === "todo"}
    <TaskListComp tasksView={todoView} />
  {:else if currentView === "finished"}
    <TaskListComp tasksView={finishView} />
  {:else if currentView === "archived"}
    <TaskListComp tasksView={archivedView} />
  {:else if currentView === 'priority'}
    <TaskListComp tasksView={priorityView}/>
  {/if}
</div>

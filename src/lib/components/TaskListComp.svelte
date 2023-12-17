<script lang="ts">
  import { toggleFinished, toggleArchived,togglePriority, del , type taskType } from "$lib/tasks";
  export let tasksView:taskType[];
  console.log(tasksView);

    
</script>

<div class="w-5/6 bg-yellow-100">
  <!-- main task component -->
  {#each tasksView as task, i}
    <div
      class="m-5 flex rounded-lg border-2 border-yellow-200 py-3 pl-10 font-medium"
    >
      {#if task.satf}
        <div class="w-3/4 line-through">{task.name}</div>
      {:else if task.sata}
        <div class="w-3/4 text-slate-600">{task.name}</div>
      {:else}
        <div class="w-3/4">{task.name}</div>
      {/if}
      <div class="flex space-x-10">
        <!-- Toggle between -->
        {#if task.satf}
          <button on:click={() => toggleFinished(task.id)}
            ><img
              src="https://api.iconify.design/material-symbols:check-box-outline-rounded.svg?color=%23f6be00"
              alt=""
              class="hover:scale-150"
            />
          </button>
          <!-- {finish()} -->
        {:else}
          <button on:click={() => toggleFinished(task.id)}
            ><img
              src="https://api.iconify.design/material-symbols:check-box-outline-blank-sharp.svg?color=%23f6be00"
              alt=""
              class="hover:scale-150"
            />
          </button>
        {/if}
        {#if task.sati}
          <button on:click={() => togglePriority(task.id)}
            ><img
              src="https://api.iconify.design/ic:outline-star.svg?color=%23f6be00"
              alt=""
              class="hover:scale-150"
            />
          </button>
        {:else}
          <button on:click={() => togglePriority(task.id)}
            ><img
              src="https://api.iconify.design/ic:baseline-star-outline.svg?color=%23f6be00"
              alt=""
              class="hover:scale-150"
            />
          </button>
        {/if}
        {#if task.sata}
          <button on:click={() => toggleArchived(task.id)}
            ><img
              src="https://api.iconify.design/material-symbols:unarchive-outline.svg?color=%23f6be00"
              alt=""
              class="hover:scale-150"
            />
          </button>
        {:else}
          <button on:click={() => toggleArchived(task.id)}
            ><img
              src="https://api.iconify.design/material-symbols:archive-outline.svg?color=%23f6be00"
              alt=""
              class="hover:scale-150"
            />
          </button>
        {/if}
        <button on:click={() => del(task.id)}
          ><img
            src="https://api.iconify.design/solar:trash-bin-minimalistic-linear.svg?color=%23f6be00"
            alt=""
            class="hover:scale-150"
          /></button
        >
      </div>
    </div>
  {/each}
</div>

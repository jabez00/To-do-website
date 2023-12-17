<script lang="ts">
    import { counter,increment,decrement } from "$lib/counter";
  </script>
  
  <h1>{ $counter }</h1>
  <button on:click={increment}>Increment</button>
  <button on:click={decrement}>Decrement</button>
  <a href="/hello">Hello</a>
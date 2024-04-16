<script setup>
  import { fetchData } from './services/freecurrency.service.js'

  const cambio = fetchData()

  console.log(cambio)
</script>

<template>
  <div class="hello">
    <span class="child-hello">b</span>
  </div>
</template>

<style lang="scss">
  $bgColor: red;

  .hello{
    background-color: $bgColor;
    .child-hello{
      background-color: blue;
    }
  }
</style>

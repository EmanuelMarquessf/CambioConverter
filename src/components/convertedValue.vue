<script setup>
import { defineProps, defineModel } from "vue";

const props = defineProps({
  cambioConfig: Object,
  value: String,
});
</script>

<template>
  <div class="convertedValueContainer">
    <label for="valueToConvert"><slot></slot></label>
    <div class="inputContainer">
      <span>{{ props.cambioConfig.symbol }}</span>
      <input disabled name="valueToConvert" type="number" :value="props.value" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .convertedValueContainer{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-grow: 1;
  }
</style>

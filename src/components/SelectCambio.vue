<script setup>
  import { ref, watch} from 'vue'

  const cambio = defineModel('cambio')
</script>

<template>
  <div class="selectContainer">
    <label :for="cambio"><slot></slot></label>
    <select v-model="cambio" :name="cambio" id="cambio">
      <option value="">Selecionar</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
  </div> 

</template>

<style scoped lang="scss">
  $bgColor: #242424;
  $inputColor: #131315;
  $text: #e1e1e2;
  $secondaryText: #787883;

  .selectContainer {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.5rem;
    select {
      border: none;
      border-radius: 0.5rem;
      font-size: x-large;
      padding: 8px 4px;
      background-color: $inputColor;
      color: $secondaryText;
    }
  }
</style>

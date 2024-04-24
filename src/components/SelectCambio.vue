<script setup>
  const coinCode = defineModel('coinCode')
  const props = defineProps({
    cambios: Object,
  })
</script>

<template>
  <div class="selectContainer">
    <label :for="coinCode"><slot></slot></label>
    <select v-model="coinCode" :name="coinCode" id="cambio">
      <option value="">Selecionar</option>
      <option v-for="(valueCoin, codeCoin) in props.cambios" :key="codeCoin" :value="codeCoin">{{ valueCoin.name }} ({{valueCoin.code}})</option>
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

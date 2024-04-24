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
      <option v-for="(valueCoin, codeCoin) in props.cambios" :key="codeCoin" :value="codeCoin">{{ valueCoin.name }} ({{valueCoin.code}})</option>
    </select>
  </div> 

</template>

<style scoped lang="scss">
  $bgColor: #005c9e;
  $containerColor: #ffffff;
  $inputColor: #f5f5f5;
  $borderColor:#999999;
  $text: #000000;
  $secondaryText: #5d5d5d;

  $fontPrimary: sans-serif;
  $fontSecondary: sans-serif;


  .selectContainer {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.5rem;
    
    label{
      font-family: $fontPrimary;
      color: $text;
      font-weight: 300;
    }
    select {
      border: 1px solid $borderColor;
      border-radius: 0.5rem;
      font-size: x-large;
      font-weight: 500;
      padding: 8px 4px;
      background-color: $inputColor;
      color: $secondaryText;
      &:focus {
        outline: none;
      }
    }
  }
</style>

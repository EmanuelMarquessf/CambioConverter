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
  @import '../src/styles/_colors';
  @import '../src/styles/_mediaQueries';

  .selectContainer {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.5rem;
    label{
      color: $text;
      font-weight: 500;
    }
    select {
      border: 1px solid $borderColor;
      border-radius: 0.5rem;
      font-size: x-large;
      font-weight: 300;
      padding: 8px 4px;
      background-color: $inputColor;
      color: $secondaryText;
      &:focus {
        outline: none;
      }
      @include tablet {
        font-size: larger;
        width: 100%
      };
      @include mobile{
        font-size: medium;
      }
    }
  }
</style>

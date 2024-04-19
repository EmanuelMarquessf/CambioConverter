<script setup>
  import { ref } from 'vue'
  import { fetchData } from './services/freecurrency.service.js'
  import  SelectCambio from './components/SelectCambio.vue'
  import InvertIcon from './components/icons/invert.vue'

  // const { data } = await fetchData();
  // console.log(data)

  const cambioBase = ref('1')
  const cambioTo = ref('2')
  const valueBase = ref()

  const invertCambio = () => {
    const varAux = cambioBase.value;
    cambioBase.value = cambioTo.value;
    cambioTo.value = varAux;
  }

  const getCambioType = (data) => {
  return Object.keys(data);
};
</script>

<template>
  <div class="container">
    <!-- <span v-for="cambio in cambios" :key="cambio" class="child-hello">{{cambio}}</span> -->
    <div class="formContainer" action="">
      <div class="selectsContainer">
        <SelectCambio v-model:cambio="cambioBase" >Cambio Base</SelectCambio>
        <button @click="invertCambio()"><InvertIcon /></button>
        <SelectCambio v-model:cambio="cambioTo">Convert To</SelectCambio>
      </div>
      <div class="flexContainerColumn">
        <label for="valueToConvert">Value</label>
        <div class="inputContainer">
          <span>R$</span>
          <input v-model="valueBase" name="valueToConvert" type="number" value="valueToConvert">
        </div>
      </div>
    </div>
    <label for="valueToConvert">Converter para</label>
    <div class="inputContainer">
      <span>US</span>
      <input disabled name="valueToConvert" type="number" :value="(valueBase*5).toFixed(2)">
    </div> 
  </div>
</template>

<style lang="scss">
  $bgColor: #242424;
  $inputColor: #131315 ;
  $text: #e1e1e2;
  $secondaryText: #787883;

  .flexContainerRow{
    display: flex;
    flex-direction: row;
    gap:0.5rem;
  }

  .flexContainerColumn{
    display: flex;
    flex-direction: column;
    gap:0.5rem;
  }
  .container{
    background-color: $bgColor;
    padding: 2rem;
    width: 40rem;
    height: 40rem;
    border-radius: 1rem;
    .formContainer{
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    label{
      color: $text;
      font-size: larger;
    }

    .selectsContainer{
      display: flex;
      flex-direction: row;
      align-items:flex-end;
      gap:2rem;
      button{
        border: none;
        border-radius: 0.5rem;
        height: 40px;
        background-color: $inputColor;
        color: $secondaryText;
      }
    }
    .inputContainer{
      align-items: center;
      background-color: $inputColor;
      border-radius:0.5rem;
      color: $text;
      display: flex;
      flex-direction: row;
      
      padding: 0.7rem;
      span{
        font-size:x-large;
      }
      input[type="number"] {
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
          appearance: none;
          margin: 0;
        }
        &:focus {
          outline: none;
        }
        background-color:  $inputColor;
        border: none;
        color: $secondaryText;
        font-size: x-large;
      }
    }
  }
</style>

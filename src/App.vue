<script setup>
  import { ref } from 'vue'
  import { fetchData } from './services/freecurrency.service.js'
  const data = async () => await fetchData();


  console.log(data)

  const valueToConvert = ref(0);
</script>

<template>
  <div class="container">
    <!-- <span v-for="cambio in cambios" :key="cambio" class="child-hello">{{cambio}}</span> -->
    <form class="formContainer" action="">
      <div class="selectsContainer">
        <div class="selectContainer">
          <label for="cars">Convert to</label>
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <button><></button>
        <div class="selectContainer">
          <label for="cars">From:</label>
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </div>
      <div class="flexContainerColumn">
        <label for="valueToConvert">Value</label>
        <div class="inputContainer">
          <span>R$</span>
          <input name="valueToConvert" type="number" >
        </div>
      </div>
    </form>
    <label for="valueToConvert">Converter para</label>
    <div class="inputContainer">
      <span>R$</span>
      <input name="valueToConvert" type="number" >
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
        height: 40px;
        background-color: $inputColor;
        color: $secondaryText;
      }
      .selectContainer{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: 0.5rem;
        select{
          border: none;
          border-radius:0.5rem;
          font-size: x-large;
          padding: 8px 4px;
          background-color: $inputColor;
          color: $secondaryText;
        }
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

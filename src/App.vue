<script setup>
import { ref, onBeforeMount} from "vue";
import { fetchData, fetchCoinDetail } from "./services/freecurrency.service.js";

// Components
import SelectCambio from "./components/SelectCambio.vue";
import ConvertedValue from "./components/convertedValue.vue"
// Icons
import InvertIcon from "./components/icons/invert.vue";

const cambios = ref({});
const cambiosConfig = ref({});
const blockButton = ref(true);

const codeCambioBase = ref("USD");
const codeCambioTo = ref("BRL");
const valueBase = ref(0);

onBeforeMount(async () => {
  const [cambiosData, cambiosConfigData] = await Promise.all([fetchData(codeCambioBase), fetchCoinDetail(codeCambioBase)]);
  
  cambios.value = cambiosData.data;
  cambiosConfig.value = cambiosConfigData.data;
})

const  reloadAPI = async () => {
  const data = await fetchData(codeCambioBase);
  cambios.value = data.data;
};

const invertCambio = () => {
  const varAux = codeCambioBase.value;
  codeCambioBase.value = codeCambioTo.value;
  codeCambioTo.value = varAux;

  reloadAPI();
  blockButtonFunction();
};

const blockButtonFunction = () => {
  blockButton.value = false;
  setTimeout(function(){
    blockButton.value = true;
  }, 2000)
}
</script>

<template>
  <div class="container">
    <div class="formContainer" action="">
      <div class="selectsContainer">
        <SelectCambio :cambios="cambiosConfig" v-model:coinCode="codeCambioBase" @change="reloadAPI">Coin Base</SelectCambio>
        <button class="button" :class="!blockButton ? 'disabled' : ''" :disabled="!blockButton" @click="invertCambio()"><InvertIcon /></button>
        <SelectCambio :cambios="cambiosConfig" v-model:coinCode="codeCambioTo">Convert To</SelectCambio>
      </div>
      <div class="flexContainerRow">
        <div class="flexContainerColumn">
          <label for="valueToConvert">Value</label>
          <div class="inputContainer">
            <span>{{ cambiosConfig[codeCambioBase].symbol }}</span>
            <input v-model="valueBase" name="valueBase" type="number" />
          </div>
        </div>
        <ConvertedValue :value="(valueBase * cambios[codeCambioTo]).toFixed(cambiosConfig[codeCambioTo].decimal_digits)" :cambioConfig="cambiosConfig[codeCambioTo]">Converted Value</ConvertedValue>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$bgColor: #005c9e;
$containerColor: #ffffff;
$inputColor: #f5f5f5;
$borderColor:#999999;
$text: #000000;
$secondaryText: #5d5d5d;


$fontPrimary: sans-serif;
$fontSecondary: sans-serif;

body{
background-color: $bgColor;
font-family: $fontPrimary;
display: flex;
justify-content: center;
}
.flexContainerRow {
  display: flex;
  flex-direction: row;
  gap: 4rem;
  flex-grow: 1;
}

.flexContainerColumn {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
}
.container {
  background-color: $containerColor;
  width: 50rem;
  padding: 2rem;
  margin: 4rem;
  border-radius: 1rem;
  .formContainer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  label {
    color: $text;
    font-size: larger;
  }

  .selectsContainer {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 1rem;
    button {
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      height: 40px;
      background-color: #007ff7;
      color: $secondaryText;
    }
    .disabled{
      cursor: no-drop;
      opacity: 50%;
    }
  }
  
  .inputContainer {
    align-items: center;
    background-color: $inputColor;
    border-radius: 0.5rem;
    color: $text;
    display: flex;
    flex-direction: row;
    padding: 0.7rem 0rem 0.7rem 0.7rem;
    gap: 0.5rem;
    border: 1px solid $borderColor;
    flex-grow: 1;
    span {
      font-size: large;
      width: 1.5rem;
      color: $secondaryText;
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
      background-color: $inputColor;
      border: none;
      color: $secondaryText;
      font-size: x-large;
      flex-grow: 1;
    }
  }
}
</style>

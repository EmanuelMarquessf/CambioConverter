<script setup>
import { ref, onMounted } from "vue";
import { fetchData, fetchCoinDetail } from "./services/freecurrency.service.js";
import SelectCambio from "./components/SelectCambio.vue";
import InvertIcon from "./components/icons/invert.vue";

const cambios = ref({});
const cambiosConfig = ref({});

onMounted(async () => {
  const [cambiosData, cambiosConfigData] = await Promise.all([fetchData(codeCambioBase), fetchCoinDetail(codeCambioBase)]);
  
  cambios.value = cambiosData.data;
  cambiosConfig.value = {
    'valueBase' : cambiosConfigData.data[codeCambioBase.value].symbol,
    'valueTo': cambiosConfigData.data[codeCambioTo.value].symbol,
  }

})

const codeCambioBase = ref("USD");
const codeCambioTo = ref("BRL");

const valueBase = ref(0);

const invertCambio = () => {
  const varAux = codeCambioBase.value;
  codeCambioBase.value = codeCambioTo.value;
  codeCambioTo.value = varAux;

  reloadAPI();
};

const  reloadAPI = async () => {
  console.log("Reload API");
  const [cambiosData, cambiosConfigData] = await Promise.all([fetchData(codeCambioBase), fetchCoinDetail(codeCambioBase)]);
  
  cambios.value = cambiosData.data;
  cambiosConfig.value = {
    'valueBase' : cambiosConfigData.data[codeCambioBase.value].symbol,
    'valueTo': cambiosConfigData.data[codeCambioTo.value].symbol,
  }
};

</script>

<template>
  <div class="container">
    <div class="formContainer" action="">
      <div class="selectsContainer">
        <SelectCambio
          :codesCoin="cambios"
          v-model:cambio="codeCambioBase"
          @change="reloadAPI"
          >Cambio Base</SelectCambio
        >
        <button @click="invertCambio()"><InvertIcon /></button>
        <SelectCambio :codesCoin="cambios" v-model:cambio="codeCambioTo"
          >Convert To</SelectCambio
        >
      </div>
      <div class="flexContainerColumn">
        <label for="valueToConvert">Value</label>
        <div class="inputContainer">
          <span>{{ cambiosConfig.valueBase }}</span>
          <input v-model="valueBase" name="valueBase" type="number" />
        </div>
      </div>
    </div>
    <label for="valueToConvert">Converter para</label>
    <div class="inputContainer">
      <span>{{cambiosConfig.valueTo}}</span>
      <input
        disabled
        name="valueToConvert"
        type="number"
        :value="(valueBase * cambios[codeCambioTo]).toFixed(2)"
      />
    </div>
  </div>
</template>

<style lang="scss">
$bgColor: #242424;
$inputColor: #131315;
$text: #e1e1e2;
$secondaryText: #787883;

.flexContainerRow {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.flexContainerColumn {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.container {
  background-color: $bgColor;
  padding: 2rem;
  width: 40rem;
  height: 40rem;
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
      height: 40px;
      background-color: $inputColor;
      color: $secondaryText;
    }
  }
  .inputContainer {
    align-items: center;
    background-color: $inputColor;
    border-radius: 0.5rem;
    color: $text;
    display: flex;
    flex-direction: row;
    padding: 0.7rem;
    span {
      font-size: x-large;
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
    }
  }
}
</style>

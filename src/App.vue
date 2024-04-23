<script setup>
import { ref, onMounted } from "vue";
import { fetchData, fetchCoinDetail } from "./services/freecurrency.service.js";
import SelectCambio from "./components/SelectCambio.vue";
import InvertIcon from "./components/icons/invert.vue";

const cambios = ref({});
const cambiosConfig = ref({});

const blockButton = ref(true)

onMounted(async () => {
  loadAPI();
})

const codeCambioBase = ref("USD");
const codeCambioTo = ref("BRL");

const valueBase = ref(0);

const invertCambio = () => {
  const varAux = codeCambioBase.value;
  codeCambioBase.value = codeCambioTo.value;
  codeCambioTo.value = varAux;

  loadAPI();
  blockButtonFunction();
};

const blockButtonFunction = () => {
  blockButton.value = false;
  setTimeout(function(){
    blockButton.value = true;
  }, 2000)
}

const  loadAPI = async () => {
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
          @change="loadAPI"
          >Cambio Base</SelectCambio
        >
        <button class="button" :class="!blockButton ? 'disabled' : ''" :disabled="!blockButton" @click="invertCambio()"><InvertIcon /></button>
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
      cursor: pointer;
      height: 40px;
      background-color: $inputColor;
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

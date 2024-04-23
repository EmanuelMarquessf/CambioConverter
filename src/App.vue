<script setup>
import { ref, watch } from "vue";
import { fetchData } from "./services/freecurrency.service.js";
import SelectCambio from "./components/SelectCambio.vue";
import InvertIcon from "./components/icons/invert.vue";

// const { data } = await fetchData();
// console.log(data)
const cambios = {
  BRL: 5.1924908055,
  CAD: 1.3740801402,
  EUR: 0.9381801045,
  USD: 1,
};

const cambioConfig = {
  EUR: {
    symbol: "€",
    name: "Euro",
    symbol_native: "€",
    decimal_digits: 2,
    rounding: 0,
    code: "EUR",
    name_plural: "Euros",
    type: "fiat",
  },
  USD: {
    symbol: "$",
    name: "US Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "USD",
    name_plural: "US dollars",
    type: "fiat",
  },
  BRL: {
    symbol: "R$",
    name: "Brazilian Real",
    symbol_native: "R$",
    decimal_digits: 2,
    rounding: 0,
    code: "BRL",
    name_plural: "Brazilian reals",
    type: "fiat",
  },
  CAD: {
    symbol: "CA$",
    name: "Canadian Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "CAD",
    name_plural: "Canadian dollars",
    type: "fiat",
  },
};

const codeCambioBase = ref("USD");
const codeCambioTo = ref("BRL");

const valueBase = ref(cambios[codeCambioBase.value]);
const valueTo = ref(0);

const invertCambio = () => {
  const varAux = codeCambioBase.value;
  codeCambioBase.value = codeCambioTo.value;
  codeCambioTo.value = varAux;
};


const reloadAPI = () => {
  console.log("Reload API");
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
          <span>{{cambioConfig[codeCambioBase].symbol}}</span>
          <input v-model="valueBase" name="valueBase" type="number" />
        </div>
      </div>
    </div>
    <label for="valueToConvert">Converter para</label>
    <div class="inputContainer">
      <span>{{cambioConfig[codeCambioTo].symbol}}</span>
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
    gap: 2rem;
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

import { apiKey } from "../config/config";
export async function fetchData(baseCurrency){
  const data = fetch(
    `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=&base_currency=${baseCurrency.value}`
  ).then(response => response.json())

  return data;
}

export async function fetchCoinDetail(baseCurrency){
  const data = fetch(
    `https://api.freecurrencyapi.com/v1/currencies?apikey=${apiKey}&currencies=&base_currency=${baseCurrency.value}`
  ).then(response => response.json())

  return data
}


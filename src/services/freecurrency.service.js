import { apiKey } from "../config/config";
export async function fetchData(){
  const currencies = 'BRL%2CEUR';
  console.log({apiKey})
  const data = 0
  fetch(
    `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=BRL%2CEUR`
  ).then(response => response.json())
  .then(json=> console.log({json}))
  return data;
}


import { apiKey } from "../config/config";
export async function fetchData(){
  const currencies = 'BRL%2CEUR';

  const data = fetch(
    `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies%2CEUR&base_currency=USD`
  ).then(response => response.json())
  return data;
}


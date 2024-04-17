import { apiKey } from "../config/config";
export async function fetchData(){
  const currencies = 'BRL%2CEUR';

  const data = fetch(
    `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=BRL%2CEUR`
  ).then(response => response.json())
  return data;
}

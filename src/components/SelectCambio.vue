<script setup>
  import { ref, defineProps, defineEmits, watch} from 'vue'

  const emit = defineEmits(['changeCambio'])
  const props = defineProps(['cambio'])
  
  const cambio = ref(props.cambio)

  const onChange = () => {
    emit('changeCambio', cambio.value)
  }

  watch(() => props.cambio, () =>{
    cambio.value = props.cambio
  })
</script>

<template>
  <div class="selectContainer">
    <label for="cars">Convert</label>
    <select v-model="cambio" @change="onChange" name="cars" id="cars">
      <option value="">Selecionar</option>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
  </div> 

  {{ cambio }}

</template>

<style scoped lang="scss">
  $bgColor: #242424;
  $inputColor: #131315;
  $text: #e1e1e2;
  $secondaryText: #787883;

  .selectContainer {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.5rem;
    select {
      border: none;
      border-radius: 0.5rem;
      font-size: x-large;
      padding: 8px 4px;
      background-color: $inputColor;
      color: $secondaryText;
    }
  }
</style>

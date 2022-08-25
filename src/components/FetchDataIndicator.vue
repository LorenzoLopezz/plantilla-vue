<template>
  <section v-if="indicator === null">
    <h3 class="component-data--none">Sin datos para mostrar</h3>
  </section>
  <section v-else>
    <h3 class="">Haciendo fetch de datos</h3>
  </section>
</template>

<style scoped>
.component-data--none {
  color: #c2c2c2;
  text-align: center;
}
</style>

<script>
export default {
  name: 'FetchDataIndicator',
  props: {
    indicator: Object
  },
  methods: {
    fetchData () {
      return true
    }
  }
}
</script>

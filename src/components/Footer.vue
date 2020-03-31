<template>
 <section class="container">
 <v-card height="150">
    <v-footer
      absolute
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Xhostcom</strong>
      </v-col>
    </v-footer>
  </v-card>
 </section>
</template>

<script>
export default {

}
</script>

<style scoped>
.v-footer {
background-color: gainsboro!important;
}
.text-center {
  text-align:center;
  margin: 0 auto;
}
</style>

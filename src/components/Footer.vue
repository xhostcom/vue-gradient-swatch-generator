<template>
<b-card height="150">
    <b-footer
      absolute
      class="font-weight-medium"
    >
      <b-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Xhostcom</strong>
      </b-col>
    </b-footer>
  </b-card>
</template>

<script>
export default {

}
</script>

<style>
b-footer {
background-color: gainsboro!important;
}
.text-center {
  text-align:center;
  margin: 0 auto;
}
</style>

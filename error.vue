<script setup>
const error = useError()
</script>

<template>
  <div>
    <Nav/>
    <div v-if="(error.statusCode === 404)">
      <h1>404 - page not found</h1>
      <span>Return to the <a href="/">Home</a> page</span>
    </div>

    <h1 v-else>Error - unable to load page.</h1>
  </div>
</template>

<style scoped></style>

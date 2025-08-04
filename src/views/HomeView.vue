<script setup lang="ts">
import AdmissionList from '../components/AdmissionList.vue';
</script>

<template>
  <div class="container">
    <div class="navbar">
      <h1>Admission Easy</h1>
    </div>
    <div class="content">
      <AdmissionList />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1{
  margin: 0;
  font-size: 1.8rem;
}

.content {
  flex: 1;
  padding: 1rem;
  background-color: #f4f4f4;
}
</style>


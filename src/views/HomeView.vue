<script setup lang="ts">
import AdmissionList from '../components/AdmissionList.vue';
</script>

<template>
  <div class="container">
    <div class="navbar">

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
  width: 100%;
}

.navbar {
  background-color: #333;
  color: white;
  padding: 1rem;
}

.content {
  flex: 1;
  padding: 1rem;
  background-color: #f4f4f4;
}
</style>


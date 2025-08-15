<script setup lang="ts">
import AdmissionList from "../components/AdmissionList.vue";
import Footer from "../components/Footer.vue";
import ShareForm from "../components/ShareForm.vue";

import { ref } from "vue";

const openShareForm = ref(false);

const handleClose = () => {
  openShareForm.value = false;
};
const handleShareClick = () => {
  openShareForm.value = true;
};

</script>

<template>
  <div class="container">
    <div class="navbar">
      <h1>Admission Easy</h1>
    </div>
    <div class="content">
      <div class="share-button">
        <button
          class="share-btn"
          @click="handleShareClick"
          aria-label="Share admission list"
        >
          <svg
            class="icon"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="currentColor"
              d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a2.5 2.5 0 000-1.39l7.05-4.11A2.99 2.99 0 1015 5a3 3 0 00.04.45L8 9.56a3 3 0 10-.04 4.88l7.09 4.12c-.01.14-.05.28-.05.42A3 3 0 1018 16.08z"
            />
          </svg>
          <span class="label">分享</span>
        </button>
      </div>
      <AdmissionList />
    </div>
    <Footer />
  </div>

  <ShareForm v-if="openShareForm" @close="handleClose" />
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

h1 {
  margin: 0;
  font-size: 1.8rem;
}

.content {
  flex: 1;
  padding: 1rem;
  background-color: #f4f4f4;
}

.share-button {
  text-align: center;
}

.share-button {
  text-align: center;
  margin-bottom: 10px;
  margin-top: 0;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 15px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s;
  -webkit-tap-highlight-color: transparent;
}

.share-btn .icon {
  display: inline-block;
  color: rgba(255, 255, 255, 0.95);
}

.share-btn .label {
  display: inline-block;
}

.share-btn:hover {
  transform: scale(105%);
  opacity: 0.98;
}


@media (max-width: 480px) {
  .share-btn {
    width: calc(100% - 32px);
    max-width: 420px;
    justify-content: center;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 1rem;
  }
  .share-btn .label { font-size: 1rem; }
}
</style>

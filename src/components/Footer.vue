<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>

<template>
  <div class="footer">
    <div class="footer-content">
      <p>&copy; 2025 AdmissionEasy. All rights reserved.</p>
    </div>
    <div class="links">
      <div class="links-title">友情链接</div>
      <div class="links-list">
        <a href="https://example.com">示例链接 1</a>
        <a href="https://example.com">示例链接 2</a>
        <a href="https://example.com">示例链接 3</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background: #f3f4f6;
  padding: 12px 16px;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-content p {
  font-size: 14px;
  margin: 0;
}

.links {
  font-size: 12px;
}

.links-list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.links-list a {
  margin: 4px 0;
  text-decoration: none;
  color: #007bff;
}

.links-list a:hover {
  text-decoration: underline;
}
</style>

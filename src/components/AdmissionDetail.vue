<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

// Admission Status Enum
enum AdmissionStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

enum TargetDegree {
  Bachelors = "Bachelors",
  Masters = "Masters",
  PhD = "PhD",
}

// Admission Data Interface
interface admissionDetailData {
  id: number;
  name: string;
  degree: string;
  school: string;
  targetSchool: string;
  targetProgramme: string;
  targetDegree: TargetDegree;
  applyYear: string;
  timeLine: Map<string, string>;
  GPA: string;
  Language?: string;
  GRE?: string;
  GMAT?: string;
  status: AdmissionStatus;
}

// 接收父组件传入的 id
const props = defineProps<{ id: number }>();

// Reactive Admission Detail
const admission = ref<admissionDetailData | null>(null);

// 模拟获取详细数据
const fetchAdmissionDetail = (id: number) => {
    // 模拟数据
    const data: admissionDetailData = {
        id,
        name: "John Doe",
        degree: "Bachelor of Science",
        school: "Harvard University",
        targetSchool: "Stanford University",
        targetProgramme: "Computer Science",
        targetDegree: TargetDegree.Bachelors,
        applyYear: "2023",
        timeLine: new Map([["2023-01-01", "Application Submitted"], ["2023-02-01", "Interview Scheduled"]]),
        GPA: "3.8",
        Language: "IELTS:7",
        GRE: "320",
        status: AdmissionStatus.Pending
    };
    admission.value = data;
};

// 监听 id 变化并获取数据
watch(
  () => props.id,
  (newId) => {
    fetchAdmissionDetail(newId);
  },
  { immediate: true }
);


</script>

<template>
  <div v-if="admission" class="admission-detail-overlay">
    <div class="admission-detail">
      <h2>Admission Detail</h2>
      <div class="detail-card">
        <p><strong>ID:</strong> {{ admission.id }}</p>
        <p><strong>Name:</strong> {{ admission.name }}</p>
        <p><strong>Degree:</strong> {{ admission.degree }}</p>
        <p><strong>Current School:</strong> {{ admission.school }}</p>
        <p><strong>Target School:</strong> {{ admission.targetSchool }}</p>
        <p><strong>Target Programme:</strong> {{ admission.targetProgramme }}</p>
        <p><strong>Target Degree:</strong> {{ admission.targetDegree }}</p>
        <p><strong>Application Year:</strong> {{ admission.applyYear }}</p>
        <p><strong>Status:</strong> <span :class="`status-${admission.status.toLowerCase()}`">{{ admission.status }}</span></p>
        <p><strong>GPA:</strong> {{ admission.GPA }}</p>
        <p><strong>Language:</strong> {{ admission.Language }}</p>
        <p><strong>GRE:</strong> {{ admission.GRE }}</p>
        <p><strong>GMAT:</strong> {{ admission.GMAT }}</p>
      </div>
      <div class="timeline">
        <h3>Application Timeline</h3>
        <ul>
          <li v-for="[date, event] in admission.timeLine" :key="date">
            <strong>{{ date }}:</strong> {{ event }}
          </li>
        </ul>
      </div>
      <button class="close-button" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<style scoped>
.admission-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.admission-detail {
  max-width: 700px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.detail-card {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.detail-card p {
  margin: 10px 0;
  font-size: 16px;
}

.timeline {
  margin-top: 20px;
}

.timeline h3 {
  margin-bottom: 10px;
  color: #333;
}

.timeline ul {
  list-style-type: none;
  padding: 0;
}

.timeline li {
  margin: 5px 0;
  font-size: 14px;
}

.status-pending {
  color: #f39c12;
}

.status-approved {
  color: #27ae60;
}

.status-rejected {
  color: #e74c3c;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #c0392b;
}
</style>
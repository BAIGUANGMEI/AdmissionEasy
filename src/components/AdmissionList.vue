<script setup lang="ts">
import { ref, computed } from "vue";
import AdmissionDetail from './AdmissionDetail.vue';

import type { AdmissionData } from '../types/admissionTypes';
import { AdmissionStatus, TargetDegree } from '../types/admissionTypes';

// Reactive Admission Data List
const admissionDataList = ref<AdmissionData[]>([
  {
    id: 1,
    name: "John Doe",
    major: "Computer Science",
    school: "Harvard University",
    targetSchool: "Stanford University",
    targetProgramme: "Computer Science",
    targetDegree: TargetDegree.Masters,
    applyYear: "2023",
    season: "Fall",
    status: AdmissionStatus.Pending,
  },
  {
    id: 2,
    name: "Jane Smith",
    major: "History",
    school: "University of Oxford",
    targetSchool: "University of Cambridge",
    targetProgramme: "History",
    targetDegree: TargetDegree.Masters,
    applyYear: "2023",
    season: "Spring",
    status: AdmissionStatus.Approved,
  },
  {
    id: 3,
    name: "Alice Johnson",
    major: "Physics",
    school: "California Institute of Technology (Caltech)",
    targetSchool: "Massachusetts Institute of Technology (MIT)",
    targetProgramme: "Astrophysics",
    targetDegree: TargetDegree.PhD,
    applyYear: "2023",
    season: "Fall",
    status: AdmissionStatus.Rejected,
  },
  {
    id: 4,
    name: "Michael Brown",
    major: "Philosophy",
    school: "Princeton University",
    targetSchool: "Yale University",
    targetProgramme: "Philosophy",
    targetDegree: TargetDegree.Mphil,
    applyYear: "2024",
    season: "Fall",
    status: AdmissionStatus.Pending,
  },
  {
    id: 5,
    name: "Emily Davis",
    major: "Biotechnology",
    school: "University of Chicago",
    targetSchool: "Columbia University",
    targetProgramme: "Biotechnology",
    targetDegree: TargetDegree.Masters,
    applyYear: "2024",
    season: "Fall",
    status: AdmissionStatus.Approved,
  },
  {
    id: 6,
    name: "Christopher Wilson",
    major: "Mathematics",
    school: "University of California, Berkeley",
    targetSchool: "University of Toronto",
    targetProgramme: "Applied Mathematics",
    targetDegree: TargetDegree.PhD,
    applyYear: "2024",
    season: "Fall",
    status: AdmissionStatus.Rejected,
  },
]);

// Filter state
const selectedStatus = ref<AdmissionStatus | "All">("All");

const selectedDegree = ref<TargetDegree | "All">("All");

// Computed filtered list
const filteredAdmissionDataList = computed(() => {
  return admissionDataList.value.filter((admission) => {
    const statusMatch =
      selectedStatus.value === "All" ||
      admission.status === selectedStatus.value;
    const degreeMatch =
      selectedDegree.value === "All" ||
      admission.targetDegree === selectedDegree.value;
    return statusMatch && degreeMatch;
  });
});

// 当前选中的录取 ID
const selectedId = ref<number | null>(null);

// 显示录取详情弹窗
function showDetail(id: number) {
  selectedId.value = id;
}
</script>

<template>
  <div class="admission-list">
    <!-- Filter Dropdown -->
    <div class="filter-section">
      <label for="status-filter">状态筛选:</label>
      <select id="status-filter" v-model="selectedStatus">
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>

      <label for="status-filter">申请学位筛选:</label>
      <select id="degree-filter" v-model="selectedDegree">
        <option value="All">All</option>
        <option value="Masters">Masters</option>
        <option value="MPhil">MPhil</option>
        <option value="PhD">PhD</option>
      </select>
    </div>

    <table class="admission-table">
      <thead>
        <tr>
          <th>昵称</th>
          <th>专业</th>
          <th>学校</th>
          <th>申请学校</th>
          <th>申请专业</th>
          <th>申请学位</th>
          <th>入学年份</th>
          <th>入学季节</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="admission in filteredAdmissionDataList" :key="admission.id">
          <td @click="showDetail(admission.id)" class="link-name">{{ admission.name }}</td>
          <td>{{ admission.major }}</td>
          <td>{{ admission.school }}</td>
          <td>{{ admission.targetSchool }}</td>
          <td>{{ admission.targetProgramme }}</td>
          <td>{{ admission.targetDegree }}</td>
          <td>{{ admission.applyYear }}</td>
          <td>{{ admission.season }}</td>
          <td
            :class="`status-${admission.status.toLowerCase()}`"
            class="admission-status"
          >
            {{ admission.status }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <AdmissionDetail v-if="selectedId" :id="selectedId" @close="selectedId = null" />
</template>

<style scoped>
.admission-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.filter-section {
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.filter-section label {
  margin: 10px;
  font-weight: bold;
}

.filter-section select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 100%;
  max-width: 200px;
}

.admission-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

thead {
  background-color: #f0f0f0;
}

thead th {
  padding: 10px;
  text-align: left;
  font-weight: bold;
  color: #333;
}

tbody tr {
  transition: background-color 0.3s ease;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

tbody td {
  min-width: 80px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.link-name {
  color: #007bff;
  cursor: pointer;
}

.admission-status {
  font-weight: bold;
  text-transform: capitalize;
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

/* 移动端适配 */
@media (max-width: 768px) {
  .admission-list {
    padding: 10px;
  }

  .admission-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    border-radius: 8px;
    background-color: #fff;
  }

  thead {
    display: none;
  }

  tbody {
    display: block;
  }

  tbody tr {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    border-radius: 8px;
    padding: 10px;
    width: 100%; 
    box-sizing: border-box;
  }

  tbody td {
    display: block;
    text-align: left;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: none;
    white-space: normal;
  }

  tbody td::before {
    content: attr(data-label);
    font-weight: bold;
    margin-right: 10px;
    color: #333;
  }
}

</style>

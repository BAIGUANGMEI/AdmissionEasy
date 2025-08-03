<script setup lang="ts">
import { ref, computed } from "vue";

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
interface admissionData {
  id: number;
  name: string;
  degree: string;
  school: string;
  targetSchool: string;
  targetProgramme: string;
  targetDegree: TargetDegree;
  applyYear: string;
  status: AdmissionStatus;
}

// Reactive Admission Data List
const admissionDataList = ref<admissionData[]>([
  {
    id: 1,
    name: "John Doe",
    degree: "Bachelor of Science",
    school: "Harvard University",
    targetSchool: "Stanford University",
    targetProgramme: "Computer Science",
    targetDegree: TargetDegree.Bachelors,
    applyYear: "2023",
    status: AdmissionStatus.Pending,
  },
  {
    id: 2,
    name: "Jane Smith",
    degree: "Master of Arts",
    school: "University of Oxford",
    targetSchool: "University of Cambridge",
    targetProgramme: "History",
    targetDegree: TargetDegree.Masters,
    applyYear: "2023",
    status: AdmissionStatus.Approved,
  },
  {
    id: 3,
    name: "Alice Johnson",
    degree: "PhD in Physics",
    school: "California Institute of Technology (Caltech)",
    targetSchool: "Massachusetts Institute of Technology (MIT)",
    targetProgramme: "Astrophysics",
    targetDegree: TargetDegree.PhD,
    applyYear: "2023",
    status: AdmissionStatus.Rejected,
  },
  {
    id: 4,
    name: "Michael Brown",
    degree: "Bachelor of Arts",
    school: "Princeton University",
    targetSchool: "Yale University",
    targetProgramme: "Philosophy",
    targetDegree: TargetDegree.Bachelors,
    applyYear: "2024",
    status: AdmissionStatus.Pending,
  },
  {
    id: 5,
    name: "Emily Davis",
    degree: "Master of Science",
    school: "University of Chicago",
    targetSchool: "Columbia University",
    targetProgramme: "Biotechnology",
    targetDegree: TargetDegree.Masters,
    applyYear: "2024",
    status: AdmissionStatus.Approved,
  },
  {
    id: 6,
    name: "Christopher Wilson",
    degree: "PhD in Mathematics",
    school: "University of California, Berkeley",
    targetSchool: "University of Toronto",
    targetProgramme: "Applied Mathematics",
    targetDegree: TargetDegree.PhD,
    applyYear: "2024",
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
</script>

<template>
  <div class="admission-list">
    <h2>Admission List</h2>

    <!-- Filter Dropdown -->
    <div class="filter-section">
      <label for="status-filter">Filter by Status:</label>
      <select id="status-filter" v-model="selectedStatus">
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>

      <label for="status-filter">Filter by Degree:</label>
      <select id="degree-filter" v-model="selectedDegree">
        <option value="All">All</option>
        <option value="Bachelors">Bachelors</option>
        <option value="Masters">Masters</option>
        <option value="PhD">PhD</option>
      </select>
    </div>

    <table class="admission-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Degree</th>
          <th>School</th>
          <th>Target School</th>
          <th>Target Programme</th>
          <th>Target Degree</th>
          <th>Year</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="admission in filteredAdmissionDataList" :key="admission.id">
          <td>{{ admission.id }}</td>
          <td>{{ admission.name }}</td>
          <td>{{ admission.degree }}</td>
          <td>{{ admission.school }}</td>
          <td>{{ admission.targetSchool }}</td>
          <td>{{ admission.targetProgramme }}</td>
          <td>{{ admission.targetDegree }}</td>
          <td>{{ admission.applyYear }}</td>
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

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.filter-section {
  margin-bottom: 20px;
  text-align: center;
}

.filter-section label {
  margin: 10px;
  font-weight: bold;
}

.filter-section select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
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
  padding: 10px;
  border-bottom: 1px solid #ddd;
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
</style>

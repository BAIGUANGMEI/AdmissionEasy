<script setup lang="ts">
import { ref } from "vue";
import type { AdmissionDetailData } from '../types/admissionTypes';
import { AdmissionStatus, TargetDegree } from '../types/admissionTypes';

const emit = defineEmits<{
  (e: "close"): void;
}>();

const shareForm = ref(null);

const name = ref<string>("");
const major = ref<string>("");
const school = ref<string>("");
const targetSchool = ref<string>("");
const targetProgramme = ref<string>("");
const targetDegree = ref<TargetDegree>(TargetDegree.Masters);
const applyYear = ref<string>("");
const season = ref<string>("");
const status = ref<AdmissionStatus>(AdmissionStatus.Pending);
const GPA = ref<string>("");
const Language = ref<string>("");
const GRE = ref<string>("");
const GMAT = ref<string>("");

const log = ():void=> {
    const id = crypto.randomUUID();

    const admissionData: AdmissionDetailData = {
        id: id,
        name: name.value,
        major: major.value,
        school: school.value,
        targetSchool: targetSchool.value,
        targetProgramme: targetProgramme.value,
        targetDegree: targetDegree.value,
        applyYear: applyYear.value,
        season: season.value,
        status: status.value,
        GPA: GPA.value,
        Language: Language.value,
        GRE: GRE.value,
        GMAT: GMAT.value
    };
    console.log(admissionData);
}

</script>

<template>
    <div class="share-form-overlay" @click="emit('close')">
        <form ref="shareForm" class="share-form">
            <label for="name">昵称:</label>
            <input type="text" v-model="name" id="name" name="name" required />

            <label for="major">专业:</label>
            <input type="text" v-model="major" id="major" name="major" required />

            <label for="school">学校:</label>
            <input type="text" v-model="school" id="school" name="school" required />

            <label for="targetSchool">申请学校:</label>
            <input type="text" v-model="targetSchool" id="targetSchool" name="targetSchool" required />

            <label for="targetProgramme">申请专业:</label>
            <input type="text" v-model="targetProgramme" id="targetProgramme" name="targetProgramme" required />
            
            <label for="targetDegree">申请学位:</label>
            <select v-model="targetDegree" id="targetDegree" name="targetDegree" required>
                <option value="" disabled>请选择学位</option>
                <option v-for="degree in Object.values(TargetDegree)" :key="degree" :value="degree">{{ degree }}</option>
            </select>

            <label for="applyYear">入学年份:</label>
            <select v-model="applyYear" id="applyYear" name="applyYear" required>
                <option value="" disabled>请选择年份</option>
                <option v-for="year in [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]" :key="year" :value="year">{{ year }}</option>
            </select>

            <label for="season">入学季节:</label>
            <select v-model="season" id="season" name="season" required>
                <option value="" disabled>请选择季节</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
            </select>
            
            <label for="status">状态:</label>
            <select v-model="status" id="status" name="status" required>
                <option value="" disabled>请选择状态</option>
                <option v-for="status in Object.values(AdmissionStatus)" :key="status" :value="status">{{ status }}</option>
            </select>

            <label for="GPA">GPA:</label>
            <input type="text" v-model="GPA" id="GPA" name="GPA"/>

            <label for="Language">语言成绩:</label>
            <input type="text" v-model="Language" id="Language" name="Language"/>

            <label for="GRE">GRE:</label>
            <input type="text" v-model="GRE" id="GRE" name="GRE"/>

            <label for="GMAT">GMAT:</label>
            <input type="text" v-model="GMAT" id="GMAT" name="GMAT"/>

            <button type="button" @click="log">
                提交
            </button>
            <button type="button" @click="emit('close')">
                关闭
            </button>
        </form>
    </div>
</template>

<style scoped>
.share-form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.share-form {
    min-width: 600px;
    max-height: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    overflow: auto;
}

.share-form label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

.share-form input,
.share-form select {
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.share-form button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.share-form button:hover {
    background-color: #0056b3;
}
</style>
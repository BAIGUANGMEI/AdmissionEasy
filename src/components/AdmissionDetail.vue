<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { AdmissionDetailData } from "../types/admissionTypes";
import { AdmissionStatus, TargetDegree } from "../types/admissionTypes";

const props = defineProps<{ id: number }>();
const emit = defineEmits<{
  (e: "close"): void;
}>();

const admission = ref<AdmissionDetailData | null>(null);

const timelineOpen = ref(true);


const fetchAdmissionDetail = (id: number) => {
  // 模拟获取数据（替换为真实 API 调用）
  const data: AdmissionDetailData = {
    id,
    name: "求个Offer",
    major: "Computer Science",
    school: "Harvard University",
    targetSchool: "Stanford University",
    targetProgramme: "Computer Science",
    targetDegree: TargetDegree.Masters,
    applyYear: "2023",
    season: "Fall",
    intern: ["Intern at XYZ Corp", "Research Intern at ABC Inc"],
    project: ["AI Research Project", "Web Development Project"],
    publication: ["Paper on AI Ethics", "Web Development Best Practices"],
    timeLine: new Map([
      ["2023-01-01", "Application Submitted"],
      ["2023-02-01", "Interview Scheduled"],
      ["2023-03-15", "Interview Completed"],
      ["2023-04-01", "Final Decision Pending"],
    ]),
    GPA: "3.8",
    Language: "IELTS:7.5",
    GRE: "320",
    status: AdmissionStatus.Pending,
  };
  admission.value = data;
};

// 计算时间线数组和摘要信息
const timelineArray = computed(() => (admission.value?.timeLine ? Array.from(admission.value.timeLine) : []));

// 切换时间线展开/折叠
function toggleTimeline() {
  timelineOpen.value = !timelineOpen.value;
}

watch(
  () => props.id,
  (newId) => {
    if (typeof newId === "number") fetchAdmissionDetail(newId);
  },
  { immediate: true }
);
</script>

<template>
  <div
    v-if="admission"
    class="admission-detail-overlay"
    @click.self="emit('close')"
  >
    <div class="admission-detail" role="dialog" aria-modal="true">
      <button class="close-button" @click="emit('close')" aria-label="close">
        ×
      </button>

      <header class="detail-header">
        <div class="title">
          <h2>{{ admission.name }}</h2>
          <div class="meta">
            <span class="chip">{{ admission.major }}</span>
            <span class="chip"
              >{{ admission.applyYear }} • {{ admission.season }}</span
            >
            <span
              :class="[
                'status-badge',
                'status-' + admission.status.toLowerCase(),
              ]"
              >{{ admission.status }}</span
            >
          </div>
        </div>
      </header>

      <section class="detail-grid">
        <div class="left">
          <p><strong>学校:</strong> {{ admission.school }}</p>
          <p><strong>申请学校:</strong> {{ admission.targetSchool }}</p>
          <p><strong>申请专业:</strong> {{ admission.targetProgramme }}</p>
          <p><strong>申请学位:</strong> {{ admission.targetDegree }}</p>
          <p><strong>GPA:</strong> {{ admission.GPA }}</p>
          <p><strong>语言成绩:</strong> {{ admission.Language }}</p>
          <p v-if="admission.GRE"><strong>GRE:</strong> {{ admission.GRE }}</p>
          <p v-if="admission.GMAT"><strong>GMAT:</strong> {{ admission.GMAT }}</p>
          <div v-if="admission.intern?.length">
            <p class="sub-title">实习经历</p>
            <ul>
              <li v-for="(it, i) in admission.intern" :key="i">{{ it }}</li>
            </ul>
          </div>

          <div v-if="admission.project?.length">
            <p class="sub-title">项目经历</p>
            <ul>
              <li v-for="(p, i) in admission.project" :key="i">{{ p }}</li>
            </ul>
          </div>

          <div v-if="admission.publication?.length">
            <p class="sub-title">发表</p>
            <ul>
              <li v-for="(pub, i) in admission.publication" :key="i">
                {{ pub }}
              </li>
            </ul>
          </div>
        </div>

        <aside class="right">
          <div class="timeline-header">
            <h3 class="timeline-title">申请时间线</h3>
            <div class="timeline-controls">
              <button class="toggle-btn" @click="toggleTimeline" :aria-expanded="timelineOpen">
                {{ timelineOpen ? '收起' : '展开' }}
              </button>
            </div>
          </div>

          <div :class="['timeline-content', { open: timelineOpen }]">
            <ul class="timeline">
              <li v-for="([date, event], idx) in timelineArray" :key="idx">
                <time>{{ date }}</time>
                <div class="event">{{ event }}</div>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  </div>
</template>

<style scoped>
.admission-detail-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  padding: 16px;
}

.admission-detail {
  width: 900px;
  max-height: 800px;
  background: #fff;
  border-radius: 10px;
  padding: 20px 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.close-button {
  position: absolute;
  right: 12px;
  top: 12px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  line-height: 1;
}

.detail-header h2 {
  margin: 0 0 6px 0;
  font-size: 1.4rem;
}

.meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.chip {
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.85rem;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
}

.status-pending {
  color: #b06b00;
  background: #fff3cd;
}
.status-approved {
  color: #1b6b2b;
  background: #e6f5ea;
}
.status-rejected {
  color: #7a1b1b;
  background: #fdecea;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 450px;
  gap: 10px;
  margin-top: 16px;
}


.sub-title {
  margin: 8px 0 4px;
  font-weight: 600;
}

.left p,
.left ul {
  margin: 6px 0;
  color: #333;
  font-size: 0.95rem;
}

.left ul {
  padding-left: 10px;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.timeline-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.timeline-title {
  min-width: 100px;
  font-size: 1.2rem;
  font-weight: 600;
}

.toggle-btn {
  width: 60px;
  background: #eef2ff;
  border: 1px solid #d6dbff;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.timeline-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.28s ease;
}

.timeline-content.open {
  max-height: 600px; 
}

.timeline {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
}

.timeline li {
  padding: 8px 0;
  border-left: 2px solid #eee;
  margin-left: 8px;
  position: relative;
}

.timeline li + li {
  margin-top: 8px;
}

.timeline time {
  display: block;
  font-size: 0.85rem;
  color: #666;
}

.timeline .event {
  margin-top: 4px;
  font-size: 0.95rem;
}

@media (max-width: 760px) {
  .admission-detail {
    width: 100%;
    padding: 18px;
    max-height: 600px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .right {
    order: 2;
  }

  .left {
    order: 1;
  }
}
</style>

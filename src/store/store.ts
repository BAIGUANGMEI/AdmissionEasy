import { defineStore } from 'pinia'

import type { AdmissionDetailData } from '../types/admissionTypes';

export const useAdmissionListStore = defineStore('admissionList', {
  state: () => ({
    admissionList: [] as AdmissionDetailData[],
  }),
  getters:{

  },
  actions:{

  }
})
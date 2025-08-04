export enum AdmissionStatus {
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected",
}

export enum TargetDegree {
    Masters = "Masters",
    Mphil = "MPhil",
    PhD = "PhD",
}

export interface AdmissionData {
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

export interface AdmissionDetailData {
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
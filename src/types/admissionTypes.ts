export enum AdmissionStatus {
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected",
}

export enum TargetDegree {
    Masters = "Masters",
    MPhil = "MPhil",
    PhD = "PhD",
}

export interface AdmissionData {
    id: string;
    name: string;
    major: string;
    school?: string;
    targetSchool: string;
    targetProgramme: string;
    targetDegree: TargetDegree;
    applyYear: string;
    season: string;
    status: AdmissionStatus;
}

export interface AdmissionDetailData extends AdmissionData {
    intern?: Array<string>;
    project?: Array<string>;
    publication?: Array<string>;
    timeLine?: Map<string, string>;
    GPA?: string;
    Language?: string;
    GRE?: string;
    GMAT?: string;
}
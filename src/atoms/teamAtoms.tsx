import { atom } from 'jotai';

export interface TeamReq {
    employeeNumber: string;
    resourceName: string;
    mission: string;
    project: string;
    l3Activity: string;
    location: string;
    pu: string;
    allocation: string;
    contractType: string;
    infosysRole: string;
    empBandCode: string;
    empType: string;
    projectCode: string;
    masterProjectCode: string;
    missionPMName: string;
    billableType: string;
    billabilityRemarks: string;
    primarySkill: string;
    secondarySkill: string;
    ntid: string;
    gpid: string;
    bpEmailId: string;
    empDU: string;
    empSubUnit: string;
    empUnit: string;
    empCompany: string;
    stpSEZ: string;
    baseCity: string;
    baseLocation: string;
    projectDMMailID: string;
    projectType: string;
    projectName: string;
    projectFromDate: string;
    projectToDate: string;
    serviceCode: string;
    projectBU: string;
    projectPU: string;
    projectSubUnit: string;
    projectUnit: string;
    projectCompany: string;
    allocFromDate: string;
    allocToDate: string;
    percent: string;
    onsiteOffshore: string;
    allocatedCountry: string;
    allocatedCity: string;
    reportingTo: string;
    isResourceLocatedAtBP: string;
    bpOfficeLocation: string;
}

// Atom for storing team data
export const teamDataAtom = atom<TeamReq[]>([]);
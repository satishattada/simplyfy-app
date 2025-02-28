import { atom } from 'jotai';

export interface ContractReq {
   month: { [s: string]: unknown; } | ArrayLike<unknown>;
   id: number;
   bpSubPortfolio: string;
   contractName: string;
   contractType: string;
   discountPercentage: number;
   teamType: string;
   PORevision: string;
   contractProgram: string;
   contractCSG: string;
   revenueType: string;
   contractFGID: number;
   contractStartDate: number;
   contractCurrency: string;
   referencePO: number;
   POAmountOMS: string;
   POAmountFG: string;
   POAmountAriba: string;
   masterProjectCode: string;
   masterProjectCodePM: string;
   masterPU: string;
   LOENumber: number;
   linkedDPSNumber: number;
   infosysContractType: string;
   totalSoWWorkers: number;
   milestoneAmount: any;
   
}
// Atom for storing team data
export const contractDataAtom = atom<ContractReq[]>([]);
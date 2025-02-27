interface contractReq {
  id: number;
  bpSubPortfolio: string;
  contractName: string;
  contractType: string;
  discountPercentage: number;
  teamType: string;
  ReferencePO: number;
  PORevision: string;
  Year: number;
  subPortfolio: string;
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
}

const contractData = [
  {
    id: 1,
    bpSubPortfolio: "Pulse (CandP1 (Pulse)",
    contractName: "BP",
    contractType: "Milestone",
    discountPercentage: "10",
    teamType: "DevOps",
    contractCurrency: "USD",
    contractFGID: "12345",
    ReferencePO: "",
    PORevision: "Original",
    subPortfolio: "M&C (CandP2 (B2C))",
    contractProgram: "Consumer",
    contractCSG: "",
    revenueType: "Capex",
    contractStartDate: "2024-01-01",
    contractEndDate: "2026-12-31",
    referencePO: "",
    POAmountOMS: "",
    POAmountFG: "",
    POAmountAriba: "",
    masterProjectCode: "",
    masterProjectCodePM: "",
    masterPU: 324,
    LOENumber: 34324,
    linkedDPSNumber: 5435,
    infosysContractType: "FP",
    totalSoWWorkers: 4,
  },
  {
    id: 2,
    bpSubPortfolio: "Pulse (CandP1 (Pulse)",
    contractName: "BP",
    contractType: "Milestone",
    discountPercentage: "10",
    teamType: "DEV",
    contractCurrency: "GBP",
    contractFGID: "12345",
    ReferencePO: "",
    PORevision: "Original",
    subPortfolio: "M&C (CandP2 (B2C))",
    contractProgram: "Consumer",
    contractCSG: "",
    revenueType: "Capex",
    contractStartDate: "2024-01-01",
    contractEndDate: "2026-12-31",
    referencePO: "",
    POAmountOMS: "",
    POAmountFG: "",
    POAmountAriba: "",
    masterProjectCode: "",
    masterProjectCodePM: "",
    masterPU: 324,
    LOENumber: 34324,
    linkedDPSNumber: 5435,
    infosysContractType: "FP",
    totalSoWWorkers: 4,
  },
];

const getContractsData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(contractData);
    }, 100);
  });
};

export default {
  getContractsData,
};

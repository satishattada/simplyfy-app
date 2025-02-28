
interface contractReq {
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
  milestoneAmount: any
}

const contractData = [
  {
    id: 1,
    bpSubPortfolio: "Pulse (CandP1 (Pulse))",
    contractName: "BP",
    contractType: "Milestone",
    discountPercentage: "10",
    teamType: "DevOps",
    contractCurrency: "USD",
    contractFGID: "12345",
    PORevision: "Original",
    contractProgram: "Consumer",
    contractCSG: "test",
    revenueType: "Capex",
    contractStartDate: "2024-01-01",
    contractEndDate: "2026-12-31",
    referencePO: "test",
    POAmountOMS: "test",
    POAmountFG: "test",
    POAmountAriba: "test",
    masterProjectCode: "test",
    masterProjectCodePM: "test",
    masterPU: 324,
    LOENumber: 34324,
    linkedDPSNumber: 5435,
    infosysContractType: "FP",
    totalSoWWorkers: 4,
    milestoneAmount: [
      {
        year: 2024,
        month: {
          jan: "10",
          feb: "20",
          mar: "30",
          apr: "40",
          may: "50",
          jun: "",
          jul: "",
          aug: "",
          sep: "",
          oct: "",
          nov: "",
          dec: "",
        },
      },
      {
        year: 2025,
        month: {
          jan: "10",
          feb: "20",
          mar: "30",
          apr: "40",
          may: "50",
          jun: "",
          jul: "",
          aug: "",
          sep: "",
          oct: "",
          nov: "",
          dec: "",
        },
      },
    ],
  },
  {
    id: 2,
    bpSubPortfolio: "Aviation",
    contractName: "BP",
    contractType: "FullTeam",
    discountPercentage: "10",
    teamType: "Dev",
    contractCurrency: "GBP",
    contractFGID: "15545",
    PORevision: "Rev1",
    contractProgram: "Consumer",
    contractCSG: "test",
    revenueType: "Revex",
    contractStartDate: "2024-01-01",
    contractEndDate: "2026-12-31",
    referencePO: "test",
    POAmountOMS: "test",
    POAmountFG: "test",
    POAmountAriba: "test",
    masterProjectCode: "test",
    masterProjectCodePM: "test",
    masterPU: 324,
    LOENumber: 34324,
    linkedDPSNumber: 5435,
    infosysContractType: "FP",
    totalSoWWorkers: 4,
    milestoneAmount: [
      {
        year: 2024,
        month: {
          jan: "10",
          feb: "20",
          mar: "30",
          apr: "40",
          may: "50",
          jun: "",
          jul: "",
          aug: "",
          sep: "",
          oct: "",
          nov: "",
          dec: "",
        },
      },
      {
        year: 2025,
        month: {
          jan: "10",
          feb: "20",
          mar: "30",
          apr: "40",
          may: "50",
          jun: "",
          jul: "",
          aug: "",
          sep: "",
          oct: "",
          nov: "",
          dec: "",
        },
      },
    ],
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

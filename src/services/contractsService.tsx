
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
        revision: 0,
        year: 2024,
        months: {
            jan: 10,
            feb: 20,
            mar: 30,
            apr: 40,
            may: 50
        }
    },
    {
        revision: 1,
        year: 2024,
        months: {
            jan: 15,
            feb: 25,
            mar: 35,
            apr: 45,
            may: 55
        }
    },
    {
      revision: 2,
      year: 2024,
      months: {
          jan: 15,
          feb: 25,
          mar: 35,
          apr: 45,
          may: 55
      }
  },
    {
      revision: 0,
      year: 2025,
      months: {
          jan: 15,
          feb: 25,
          mar: 35,
          apr: 45,
          may: 55,
          jun: 10,
      }
  }
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
        revision: 0,
        year: 2024,
        months: {
            jan: 10,
            feb: 20,
            mar: 30,
            apr: 40,
            may: 50
        }
    },
    {
        revision: 1,
        year: 2024,
        months: {
            jan: 15,
            feb: 25,
            mar: 35,
            apr: 45,
            may: 55
        }
    },
    {
      revision: 1,
      year: 2025,
      months: {
          jan: 15,
          feb: 25,
          mar: 35,
          apr: 45,
          may: 55,
          Jun: 10,
      }
  }
    ],
  },
];
const apiURL = 'https://operations-backend-production-5877.up.railway.app/contract';
const getContractsData = async() => {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.contractData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
};
const updateEditedContract = async (contract: contractReq) => {
  try {
    const response = await fetch(`${apiURL}/${contract.contractFGID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contract),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error updating contract:', error);
    throw error;
  }
}
const addContract = async (contract: contractReq) => {
  console.log("inside contract.........",apiURL);
  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contract),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error adding contract:', error);
    throw error;
  }
}
export default {
  getContractsData,
  updateEditedContract,
  addContract,
};

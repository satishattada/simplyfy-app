
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
const apiURL = 'http://localhost:3000/contract';
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

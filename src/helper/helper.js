function transformContractData(inputData) {
    const groupedData = {};
  
    inputData.forEach(item => {
      const contractFGID = item.contractFGID;
  
      if (!groupedData[contractFGID]) {
        groupedData[contractFGID] = {
          bpSubPortfolio: String(item.bpSubPortfolio),
          contractName: String(item.contractName),
          contractType: String(item.contractType),
          discountPercentage: String(item.discountPercentage),
          teamType: String(item.teamType),
          contractCurrency: String(item.contractCurrency),
          contractFGID: String(item.contractFGID),
          referencePO: String(item.referencePO),
          contractProgram: String(item.contractProgram),
          contractCSG: String(item.contractCSG),
          revenueType: String(item.revenueType),
          contractStartDate: String(item.contractStartDate),
          contractEndDate: String(item.contractEndDate),
          POAmountOMS: String(item.POAmountOMS),
          POAmountFG: String(item.POAmountFG),
          POAmountAriba: String(item.POAmountAriba),
          masterProjectCode: String(item.masterProjectCode),
          masterProjectCodePM: String(item.masterProjectCodePM),
          masterPU: String(item.masterPU),
          LOENumber: String(item.LOENumber),
          linkedDPSNumber: String(item.linkedDPSNumber),
          infosysContractType: String(item.infosysContractType),
          totalSoWWorkers: String(item.totalSoWWorkers),
          milestoneAmount: []
        };
      }
  
      const revision = item.PORevision.toLowerCase().includes("original") ? 0 : parseInt(item.PORevision.replace(/\D/g, ""), 10) || 0;
  
      const milestoneEntry = {
        revision: revision,
        year: parseInt(item.year, 10),
        month: {
          jan: String(item.jan || ""),
          feb: String(item.feb || ""),
          mar: String(item.mar || ""),
          apr: String(item.apr || ""),
          may: String(item.may || ""),
          jun: String(item.jun || ""),
          jul: String(item.jul || ""),
          aug: String(item.aug || ""),
          sep: String(item.sep || ""),
          oct: String(item.oct || ""),
          nov: String(item.nov || ""),
          dec: String(item.dec || "")
        }
      };
  
      groupedData[contractFGID].milestoneAmount.push(milestoneEntry);
    });
  
    return { contracts: Object.values(groupedData) };
  }
  
  export default transformContractData;
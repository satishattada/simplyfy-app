interface teamReq {
  infyId: string;
  infyEmail: string;
  location: string;
  skills: string;
  PU: string;
  startDate: string;
  endDate: string;
  bpSponsorEmail: string;
  mission: string;
  productName: string;
  workType: string;
  workScope: string;
  allocation: string;
  contractType: string;
  rate: string;
  backupResource: string;
}

const teamData = [
  {
    employeeNumber: "123456",
    resourceName: "Test User 1",
    mission: " Test Mission",
    project: "Product Test",
    l3Activity: "Activity Test",
    location: "India",
    pu: "PU A",
    allocation: "80%",
    contractType: "Permanent",
    infosysRole: "Developer",
    empBandCode: "B1",
    empType: "Full-time",
    projectCode: "P123",
    masterProjectCode: "MP123",
    missionPMName: "Jane Smith",
    billableType: "Billable",
    billabilityRemarks: "N/A",
    primarySkill: "Java",
    secondarySkill: "React",
    ntid: "NT123",
    gpid: "GP123",
    bpEmailId: "john.doe@bp.com",
    empDU: "DU A",
    empSubUnit: "Sub Unit A",
    empUnit: "Unit A",
    empCompany: "Company A",
    stpSEZ: "STP",
    baseCity: "New York",
    baseLocation: "Office A",
    projectDMMailID: "dm@project.com",
    projectType: "Development",
    projectName: "Project A",
    projectFromDate: "2023-01-01",
    projectToDate: "2023-12-31",
    serviceCode: "S123",
    projectBU: "BU A",
    projectPU: "PU A",
    projectSubUnit: "Sub Unit A",
    projectUnit: "Unit A",
    projectCompany: "Company A",
    allocFromDate: "2023-01-01",
    allocToDate: "2023-12-31",
    percent: "80%",
    onsiteOffshore: "Onsite",
    allocatedCountry: "USA",
    allocatedCity: "New York",
    reportingTo: "Test User",
    isResourceLocatedAtBP: "Yes",
    bpOfficeLocation: "Office A",
  }
,
  {
    employeeNumber: "654321",
    resourceName: "Test User 2",
    mission: "Test Mission 2",
    project: "Product Test 2",
    l3Activity: "Activity Test 2",
    location: "USA",
    pu: "PU B",
    allocation: "100%",
    contractType: "Contract",
    infosysRole: "Tester",
    empBandCode: "B2",
    empType: "Part-time",
    projectCode: "P456",
    masterProjectCode: "MP456",
    missionPMName: "John Doe",
    billableType: "Non-Billable",
    billabilityRemarks: "N/A",
    primarySkill: "Python",
    secondarySkill: "Django",
    ntid: "NT456",
    gpid: "GP456",
    bpEmailId: "jane.doe@bp.com",
    empDU: "DU B",
    empSubUnit: "Sub Unit B",
    empUnit: "Unit B",
    empCompany: "Company B",
    stpSEZ: "SEZ",
    baseCity: "San Francisco",
    baseLocation: "Office B",
    projectDMMailID: "dm2@project.com",
    projectType: "Testing",
    projectName: "Project B",
    projectFromDate: "2023-02-01",
    projectToDate: "2023-11-30",
    serviceCode: "S456",
    projectBU: "BU B",
    projectPU: "PU B",
    projectSubUnit: "Sub Unit B",
    projectUnit: "Unit B",
    projectCompany: "Company B",
    allocFromDate: "2023-02-01",
    allocToDate: "2023-11-30",
    percent: "100%",
    onsiteOffshore: "Offshore",
    allocatedCountry: "India",
    allocatedCity: "Bangalore",
    reportingTo: "Test User 1",
    isResourceLocatedAtBP: "No",
    bpOfficeLocation: "Office B",
  }
];

const getTeamData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(teamData);
    }, 100);
  });
};

export default {
  getTeamData,
};

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
    productName:string,
    workType:string,
    workScope:string,
    allocation:string,
    contractType:string,
    rate:string,
    backupResource:string,
  }

const teamData: teamReq[] = [
    {
        infyId: "764576",
        infyEmail: "pallavi.bhadange@infosys.com",
        location: "Pune",
        skills: "React,Node,Angular",
        PU: "BP",
        startDate: "2025-01-23",
        endDate: "2025-01-30",
        bpSponsorEmail: "pallavi.bhadange@bp.com",
        mission: "Consumer",
        productName: "Project Management Tool",
        workType: "OPEX",
        workScope: "OpsDev",
        allocation: "80%",
        contractType: "Permanent",
        rate: "50 USD/hour",
        backupResource: "John Doe"
    },
    {
        infyId: "23453",
        infyEmail: "adhavan.s_g@infosys.com",
        location: "Baglore",
        skills: "React,Node,Python",
        PU: "BP",
        startDate: "13-Jan-2024",
        endDate: "22-Sept-2025",
        bpSponsorEmail: "adhavan.s_g@bp.com",
        mission: "Consumer",
        productName: "Project Management Tool",
        workType: "OPEX",
        workScope: "OpsDev",
        allocation: "80%",
        contractType: "Permanent",
        rate: "50 USD/hour",
        backupResource: "John Doe"
    },
    {
        infyId: "762345",
        infyEmail: "satish.attada@infosys.com",
        location: "London",
        skills: "React,Node,AWS",
        PU: "BP",
        startDate: "24-Aug-2023",
        endDate: "14-Dec-2025",
        bpSponsorEmail: "satish.attada@bp.com",
        mission: "Consumer",
        productName: "Project Management Tool",
        workType: "OPEX",
        workScope: "OpsDev",
        allocation: "80%",
        contractType: "Permanent",
        rate: "50 USD/hour",
        backupResource: "John Doe"
    },
    {
        infyId: "764976",
        infyEmail: "pallavi.bhadange@infosys.com",
        location: "Pune",
        skills: "React,Node,Angular",
        PU: "BP",
        startDate: "22-Dec-2023",
        endDate: "14-Aug-2022",
        bpSponsorEmail: "pallavi.bhadange@bp.com",
        mission: "Consumer",
        productName: "Project Management Tool",
        workType: "OPEX",
        workScope: "OpsDev",
        allocation: "80%",
        contractType: "Permanent",
        rate: "50 USD/hour",
        backupResource: "John Doe"
      },
      {
          infyId: "23543",
          infyEmail: "adhavan.s_g@infosys.com",
          location: "Bangalore",
          skills: "React,Node,Python",
          PU: "BP",
          startDate: "13-Jan-2024",
          endDate: "22-Sept-2025",
          bpSponsorEmail: "adhavan.s_g@bp.com",
          mission: "Consumer",
          productName: "Project Management Tool",
          workType: "OPEX",
          workScope: "OpsDev",
          allocation: "80%",
          contractType: "Permanent",
          rate: "50 USD/hour",
          backupResource: "John Doe"
      },
      {
          infyId: "722345",
          infyEmail: "satish.attada@infosys.com",
          location: "London",
          skills: "React,Node,AWS",
          PU: "BP",
          startDate: "24-Aug-2023",
          endDate: "14-Dec-2025",
          bpSponsorEmail: "satish.attada@bp.com",
          mission: "Consumer",
          productName: "Project Management Tool",
          workType: "OPEX",
          workScope: "OpsDev",
          allocation: "80%",
          contractType: "Permanent",
          rate: "50 USD/hour",
          backupResource: "John Doe"
      },
  ];
  const getTeamData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(teamData);
      }, 100);
    });
  };
  

  export default {
    getTeamData
  }
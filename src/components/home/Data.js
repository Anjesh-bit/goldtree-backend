const dummyDataFeatured = [
  {
    position: "Senior level Developer",
    company: "Google",
    location: "USA",
    type: "Full Time",
    salary: "Negotiable",
  },
  {
    position: "Data Analysts",
    company: "Google",
    location: "USA",
    type: "Full Time",
    salary: "Negotiable",
  },
  {
    position: "React Engineer",
    company: "Google",
    location: "USA",
    type: "Full Time",
    salary: "Negotiable",
  },
  {
    position: "Senior level Developer",
    company: "Google",
    location: "USA",
    type: "Full Time",
    salary: "Negotiable",
  },
  {
    position: "NodeJs Developer",
    company: "Google",
    location: "USA",
    type: "Full Time",
    salary: "Negotiable",
  },
  {
    position: "Senior level Developer",
    company: "Google",
    location: "USA",
    type: "Full Time",
    salary: "Negotiable",
  },
];

const dummyDataCompanyList = [
  {
    company: "Google",
    description: "Search and find your dream job is easier than before",
  },
  {
    company: "Apple",
    description: "Search and find your dream job is easier than before",
  },
  {
    company: "Meta",
    description: "Search and find your dream job is easier than before",
  },
  {
    company: "Amazon",
    description: "Search and find your dream job is easier than before",
  },
  {
    company: "Google",
    description: "Search and find your dream job is easier than before",
  },
  {
    company: "GoldTree",
    description: "Search and find your dream job is easier than before",
  },
];

const dashBoardData = [
  {
    key: "employee",
    data: [
      { header: "Posted Jobs", subHeader: "Job Posted", key: "postedJobs" },
      { header: "Live Jobs", subHeader: "Live Jobs", key: "liveJobs" },
      {
        header: "Admin Approved",
        subHeader: "Approved Posts",
        key: "adminApproved",
      },
      {
        header: "CVs Reviewed",
        subHeader: [
          {
            cvsList: "CVs Reviewed",
            key: "cvsR",
          },
          {
            cvsList: "CVs Not Reviewed",
            key: "cvsN",
          },
        ],
        key: "cvs",
      },
      {
        header: "Total Applications",
        subHeader: "Total Application",
        key: "totalApplication",
      },
      {
        header: "Job Status",
        subHeader: [
          {
            status: "Live",
            key: "live",
          },
          {
            status: "Closed",
            key: "closed",
          },
          {
            status: "Status",
            key: "status",
          },
        ],
        key: "jobStatus",
      },
      {
        header: "ShortListed",
        subHeader: "Short Listed Interview",
        key: "shortListed",
      },
      {
        header: "Pending Count",
        subHeader: "Pending Jobs",
        key: "pendingCount",
      },
      {
        header: "Rejected Count",
        subHeader: "Rejected Applications",
        key: "rejectedCount",
      },
    ],
  },
  {
    key: "jobSeeker",
    data: [
      {
        header: "Application Statistics",
        subHeader: "Applied for jobs",
        key: "appStats",
      },
      {
        header: "Resume Circulation Statistics",
        subHeader: "0 Views by different companies",
        key: "resCircu",
      },
      ,
      { header: "My Resume", subHeader: "View My Resume", key: "liveJobs" },
      {
        header: "Appropriate For Me",
        subHeader: "0 Hot Jobs",
        key: "liveJobs",
      },
      {
        header: "Waiting Count",
        subHeader: "Waiting For Interview",
        key: "liveJobs",
      },
      {
        header: "My Profile",
        subHeader: "My Profile",
        key: "liveJobs",
      },
      {
        header: "Short listed",
        subHeader: "Short listed for Interviews",
        key: "liveJobs",
      },
      {
        header: "Pending Count",
        subHeader: "Applications pending for companies",
        key: "liveJobs",
      },
      {
        header: "Rejected Count",
        subHeader: "Applications rejected by companies",
        key: "liveJobs",
      },
      { header: "Live Jobs", subHeader: "Live Jobs", key: "liveJobs" },
    ],
  },
];

export { dummyDataFeatured, dummyDataCompanyList, dashBoardData };

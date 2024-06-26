import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const getItem = (label, key, icon, path) => {
  return {
    key,
    icon,
    label,
    path,
  };
};

export const employeeSiderRoutes = [
  getItem("Dashboard", "dashboard", <PieChartOutlined />, ""),
  getItem(
    "My Profile",
    "profile",
    <DesktopOutlined />,
    "/employee/dashboard/profile"
  ),
  getItem(
    "Post A New Job",
    "newJob",
    <FileOutlined />,
    "/employee/dashboard/new-job"
  ),
  getItem(
    "Manage Jobs",
    "manageJobs",
    <FileOutlined />,
    "/employee/dashboard/manage-jobs"
  ),
  getItem(
    "Jobs Applied Candidate",
    "jobsApplied",
    <FileOutlined />,
    "/employee/dashboard/jobs-applied"
  ),
  getItem(
    "Upload A Photo",
    "uploadPhoto",
    <FileOutlined />,
    "/employee/dashboard/upload-photo"
  ),
  getItem(
    "Short Listed Candidates",
    "shortList",
    <FileOutlined />,
    "/employee/dashboard/short-list-candidates"
  ),
  getItem(
    "Changed Password",
    "changePass",
    <FileOutlined />,
    "/employee/dashboard/change-password"
  ),
  getItem(
    "Deactivate Account",
    "deactivateAcc",
    <FileOutlined />,
    "/employee/dashboard/deactivate-account"
  ),
];

export const JobSeekeerSiderRoutes = [
  getItem("Dashboard", "dashboard", <PieChartOutlined />, ""),
  getItem(
    "My Profile",
    "profile",
    <DesktopOutlined />,
    "/jobseeker/dashboard/profile"
  ),
  getItem(
    "Upload Photo",
    "photo",
    <FileOutlined />,
    "/jobseeker/dashboard/upload-photo"
  ),
  getItem(
    "My Resume",
    "resume",
    <FileOutlined />,
    "/jobseeker/dashboard/resume"
  ),
  getItem(
    "Applied Jobs",
    "jobsApplied",
    <FileOutlined />,
    "/jobseeker/dashboard/jobs-applied"
  ),
  getItem(
    "Short Listed Jobs",
    "shortList",
    <FileOutlined />,
    "/jobseeker/dashboard/short-listed-jobs"
  ),
  getItem(
    "Job Alerts",
    "jobAlerts",
    <FileOutlined />,
    "/jobseeker/dashboard/job-alerts"
  ),
  getItem(
    "Saved Jobs",
    "savedJobs",
    <FileOutlined />,
    "/jobseeker/dashboard/saved-jobs"
  ),
  getItem(
    "CVs and Cover Letter",
    "coverCv",
    <FileOutlined />,
    "/jobseeker/dashboard/cvs-cover-letter"
  ),
  getItem(
    "Changed Password",
    "changePass",
    <FileOutlined />,
    "/jobseeker/dashboard/change-password"
  ),
  getItem(
    "Deactivate Account",
    "deactivateAcc",
    <FileOutlined />,
    "/jobseeker/dashboard/deactivate-account"
  ),
];

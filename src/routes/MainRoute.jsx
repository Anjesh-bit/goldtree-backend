import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import EmployeeDashboardLayout from "../layouts/EmployeeDashboardLayout";
import JobPortalHome from "../components/home";
import DashBoard from "../components/dashboard/DashBoard";
import JobSeekerRegistration from "../components/auth/register/jobSeeker";
import EmployeeRegistration from "../components/auth/register/employers";
import MyProfile from "../components/dashboard/jobseeker/myProfile";
import JobApplied from "../components/dashboard/employee/jobsApplied";
import ManageJobs from "../components/dashboard/employee/manageJobs";
import PostJobs from "../components/dashboard/employee/posts";
import Profile from "../components/dashboard/employee/profile";
import ShorlistCandidate from "../components/dashboard/employee/shortListCandidates";

import ChangePassword from "../components/dashboard/ChangePassword";
import DeactivateAccount from "../components/dashboard/DeactivateAccount";
import JobSeekerDashboardLayout from "../layouts/JobSeekerDashboardLayout";
import DetailJobView from "../components/detailsJob";
import ProtectedRoute from "./ProtectedRoutes";
import AppliedJobs from "../components/dashboard/jobseeker/appliedJobs";
import UploadPhotoJobSeeker from "../components/dashboard/jobseeker/uploadPhoto";
import UploadPhotoEmployee from "../components/dashboard/employee/uploadphoto";
import MyResume from "../components/dashboard/jobseeker/myResume";
import ShortListedJobs from "../components/dashboard/jobseeker/shortListed";
import SavedJobs from "../components/dashboard/jobseeker/savedJobs";
import Search from "../components/search";

const EmployeeDashboardLayouts = ProtectedRoute(
  EmployeeDashboardLayout,
  "employee"
);
const JobSeekerDashboardLayouts = ProtectedRoute(
  JobSeekerDashboardLayout,
  "jobSeeker"
);

const homeRoutes = {
  path: "/",
  element: <HomeLayout />,
  children: [
    {
      path: "",
      element: <JobPortalHome />,
    },
    {
      path: "jobs/:jobtitle/:id",
      element: <DetailJobView />,
    },
    { path: "search", element: <Search /> },
  ],
};

const authRoutes = {
  path: "auth",
  element: <AuthLayout />,
  children: [
    {
      path: "register/jobseeker",
      element: <JobSeekerRegistration />,
    },
    {
      path: "register/employee",
      element: <EmployeeRegistration />,
    },
  ],
};

const employeeRoutes = {
  path: "employee/dashboard",
  element: <EmployeeDashboardLayouts />,
  children: [
    {
      path: "",
      element: <DashBoard dataKey="employee" />,
    },
    {
      path: "jobs-applied",
      element: <JobApplied />,
    },
    {
      path: "manage-jobs",
      element: <ManageJobs />,
    },
    {
      path: "new-job",
      element: <PostJobs />,
    },
    {
      path: "edit-job/:id",
      element: <PostJobs />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "short-list-candidates",
      element: <ShorlistCandidate />,
    },
    {
      path: "upload-photo",
      element: <UploadPhotoEmployee />,
    },
    {
      path: "change-password",
      element: <ChangePassword />,
    },
    {
      path: "deactivate-account",
      element: <DeactivateAccount />,
    },
  ],
};

const jobSeekerRoutes = {
  path: "jobseeker/dashboard",
  element: <JobSeekerDashboardLayouts />,
  children: [
    {
      path: "",
      element: <DashBoard dataKey={"jobSeeker"} />,
    },
    {
      path: "jobs-applied",
      element: <AppliedJobs />,
    },
    {
      path: "manage-jobs",
      element: "",
    },
    {
      path: "new-job",
      element: "",
    },
    {
      path: "profile",
      element: <MyProfile />,
    },
    {
      path: "short-listed-jobs",
      element: <ShortListedJobs />,
    },
    {
      path: "upload-photo",
      element: <UploadPhotoJobSeeker />,
    },
    {
      path: "resume",
      element: <MyResume />,
    },
    {
      path: "saved-jobs",
      element: <SavedJobs />,
    },
    {
      path: "change-password",
      element: <ChangePassword />,
    },
    {
      path: "deactivate-account",
      element: <DeactivateAccount />,
    },
  ],
};

const router = createBrowserRouter([
  { ...homeRoutes },
  { ...authRoutes },
  { ...employeeRoutes },
  { ...jobSeekerRoutes },
]);

export default router;

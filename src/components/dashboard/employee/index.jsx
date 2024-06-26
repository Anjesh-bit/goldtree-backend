import { useLocation } from "react-router-dom";
import DashBoardSider from "..";
import { useGetPostJobs } from "../../../services/employee/setUp";
import useAuthHook from "../../../hooks/useAuthHook";

const EmployeeMainPage = () => {
  const isAuthenticated = useAuthHook(null);
  const location = useLocation();
  const matchPath =
    location.pathname === "/employee/dashboard" ||
    location.pathname === "/employee/dashboard/manage-jobs";

  const {
    data: postData,
    isLoading: postLoading,
    isError: postError,
  } = useGetPostJobs(matchPath ? isAuthenticated?.id : null);

  return (
    <div>
      <DashBoardSider
        isEmployeeDashboard
        data={{ postData, postLoading, postError }}
      />
    </div>
  );
};

export default EmployeeMainPage;

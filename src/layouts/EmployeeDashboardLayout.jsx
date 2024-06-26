import AntdFooter from "../common/AntdFooter";
import AntdHeader from "../common/AntdHeader";
import EmployeeMainPage from "../components/dashboard/employee";

const EmployeeDashboardLayout = () => {
  return (
    <div>
      <AntdHeader />
      <EmployeeMainPage />
      <AntdFooter />
    </div>
  );
};

export default EmployeeDashboardLayout;

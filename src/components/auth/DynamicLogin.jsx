import Inputs from "../../common/form/AntdInputs";
import AntdButton from "../../common/AntdButtons";
import { useNavigate } from "react-router-dom";
import Form from "antd/es/form";
import { useDispatch, useSelector } from "react-redux";
import login from "../../services/auth/login";
import { Fragment, useEffect } from "react";
import useMessage from "../../hooks/useMessage";
const { useForm } = Form;

const DynamicLogin = ({ isEmployee, modalData, setOpen }) => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contextHolder, showMessage } = useMessage();

  const data = useSelector((state) => state.auth);

  const handleOnClick = (e) => {
    e.preventDefault();
    if (isEmployee) {
      navigate("/auth/register/employee");
    } else {
      navigate("/auth/register/jobseeker");
    }
  };

  const handleOnFinish = async (values) => {
    const userType = isEmployee ? "employee" : "jobSeeker";
    dispatch(login({ ...values, type: userType })).then((actionResult) => {
      const apiMessage = actionResult?.payload?.message;
      showMessage({
        type: "error",
        content: apiMessage,
        className: "mt-[30vh] h-[40px]",
      });

      const apiError = actionResult?.payload?.feilds;
      const error = {};
      apiError?.forEach((item) => {
        const [fieldName, errorMessage] = Object.entries(item)[0];
        error[fieldName] = errorMessage;
      });

      const finalError = Object.entries(error).map(
        ([fieldName, errorMessage]) => ({
          name: fieldName,
          errors: [errorMessage],
        })
      );

      form.setFields(finalError);
    });
  };

  useEffect(() => {
    const { user, token } = data;
    if (user && token) {
      const isNotEmpty = modalData?.length > 0;
      if (isNotEmpty) {
        navigate(`/jobs/${modalData[1]}/${modalData[0]}`);
        setOpen({ open: false, data: null });
      } else {
        const dashboardRoute = isEmployee
          ? "/employee/dashboard"
          : "/jobseeker/dashboard";
        navigate(dashboardRoute);
      }
    }
  }, [navigate, data]);

  return (
    <Fragment>
      {contextHolder}
      <Form form={form} onFinish={handleOnFinish}>
        <div className="flex flex-col">
          <div className="w-full">
            <Inputs Label="Enter Email :" name="email" type="email" />
          </div>
          <div className="w-full">
            <Inputs Label="Enter Password :" name="password" />
          </div>

          <AntdButton
            loading={data?.loading}
            classNames={
              "w-full bg-[#242021] !border-none text-white px-7 h-10 mt-4"
            }
            onClick={() => form.submit()}
          >
            Login
          </AntdButton>
          <div className="font-medium text-center">Don't have an account?</div>
          <AntdButton
            classNames={
              "w-full bg-[#242021] !border-none text-white px-7 h-10 mt-4"
            }
            onClick={(e) => handleOnClick(e)}
          >
            Register
          </AntdButton>
        </div>
      </Form>
    </Fragment>
  );
};

export default DynamicLogin;

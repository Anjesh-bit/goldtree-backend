import Inputs from "../../common/form/AntdInputs";
import AntdButton from "../../common/AntdButtons";
import { useRegister } from "../../services/auth/register";
import { useNavigate } from "react-router-dom";
import Form from "antd/es/form";
import { message } from "antd";
import { Fragment, useEffect } from "react";
import useMessage from "../../hooks/useMessage";
const { useForm } = Form;

const DynamicRegistration = ({
  isEmployee,
  visibleTabs,
  isEmployeeTabItems,
}) => {
  const navigate = useNavigate();
  const { contextHolder, showMessage } = useMessage();
  const [form] = useForm();
  const {
    data: registerData,
    mutateAsync: mutateRegister,
    isPending: registerPending,
    isError,
    isSuccess,
  } = useRegister();

  const handleOnClick = (e) => {
    e.preventDefault();
    if (isEmployeeTabItems) {
      navigate("/auth/register/employee");
    } else {
      navigate("/auth/register/jobseeker");
    }
  };

  const handleOnFinish = async (value) => {
    try {
      const type = isEmployee ? "employee" : "jobSeeker";
      await mutateRegister({ ...value, type });
    } catch (e) {
      const error = {};
      const apiError = e?.response?.data?.feilds;
      apiError?.map((items) => {
        const [fieldName, errorMessage] = Object.entries(items)[0];
        error[fieldName] = errorMessage;
      });

      const finalError = Object.entries(error).map(
        ([fieldName, errorMessage]) => {
          return {
            name: fieldName,
            errors: [errorMessage],
          };
        }
      );
      form.setFields(finalError);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      showMessage({
        type: "success",
        content: "You have been successfully registred.",
        className: "mt-[30vh] h-[40px]",
      });
    }
  }, [isSuccess]);

  return (
    <Fragment>
      {contextHolder}
      <div
        className={`flex flex-col ${
          visibleTabs ? "w-[100%]" : "w-[35%]"
        }  m-auto shadow-md p-4 my-4 bg-[#F5F5F5]`}
      >
        <Form form={form} onFinish={handleOnFinish}>
          {!visibleTabs && (
            <>
              <div className="flex gap-2">
                {isEmployee ? (
                  <>
                    <div className="w-full">
                      <Inputs Label="Company Name :" name="company_name" />
                    </div>
                    <div className="w-full">
                      <Inputs Label="Enter Contact Number :" name="phone_no" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full">
                      <Inputs Label="First Name :" name="first_name" />
                    </div>
                    <div className="w-full">
                      <Inputs Label="Middle Name :" name="middle_name" />
                    </div>
                    <div className="w-full">
                      <Inputs Label="Last Name :" name="last_name" />
                    </div>
                  </>
                )}
              </div>
              <div className="w-full">
                <Inputs Label="Email :" name="email" type="email" />
              </div>
              <div>
                <Inputs Label="Mobile No :" name="mobile_no" type="pNumber" />
              </div>
              <div>
                <Inputs Label="Password" name="password" />
              </div>
              <div>
                <Inputs Label="Confirm Password" name="confirm_pass" />
              </div>
              <div>
                I have read and understood and agree to the Terms and Conditions
                governing the use of GoldTree
              </div>
              <div>
                <AntdButton
                  htmlType={"submit"}
                  loading={isError ? false : registerPending}
                  classNames={
                    "w-full bg-[#242021] !border-none text-white px-7 h-10 mt-4"
                  }
                >
                  {isEmployee
                    ? "Create Employer Account"
                    : "Create Job Sekeer Account"}
                </AntdButton>
              </div>
            </>
          )}

          {visibleTabs && (
            <div className="w-full">
              <div>Create a free account to post Vacancy</div>
              <div>
                <AntdButton
                  classNames={
                    "w-full bg-[#242021] !border-none text-white px-7 h-10 mt-4"
                  }
                  onClick={handleOnClick}
                >
                  {isEmployeeTabItems
                    ? "Create an Employee Account"
                    : "Create an Job Seeker Account"}
                </AntdButton>
              </div>
            </div>
          )}
        </Form>
      </div>
    </Fragment>
  );
};

export default DynamicRegistration;

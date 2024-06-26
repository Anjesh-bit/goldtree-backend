import { Form } from "antd";
import Inputs from "../../common/form/AntdInputs";
import { useState } from "react";
import { useUpdateProfile } from "../../services/commonService/setUp";

import AntdButton from "../../common/AntdButtons";
import useAuthHook from "../../hooks/useAuthHook";

const { useForm } = Form;

const UploadProfile = ({ type }) => {
  const [form] = useForm();
  const isAuthenticated = useAuthHook(null);
  const [files, setFiles] = useState("");
  const typeData = type === "jobSeeker" ? "jobSeeker" : "employee";
  const {
    data: updateData,
    isError: updateError,
    isPending: updatePending,
    mutateAsync: updateMutate,
  } = useUpdateProfile(typeData, isAuthenticated?.id);

  const handleOnFinish = () => {
    try {
      const formData = new FormData();
      formData.append("profile_image", files);
      updateMutate(formData);
    } catch (e) {}
  };

  const handleOnChange = (e) => {
    const { files } = e.target;
    setFiles(files[0]);
  };

  return (
    <Form form={form} onFinish={handleOnFinish}>
      <Inputs type="file" onChange={handleOnChange} />
      <AntdButton
        classNames={
          "w-full bg-[#242021] !border-none text-white px-7 h-10 mt-4 w-fit"
        }
        htmlType={"submit"}
        loading={updateError ? false : updatePending}
      >
        Save
      </AntdButton>
    </Form>
  );
};

export default UploadProfile;

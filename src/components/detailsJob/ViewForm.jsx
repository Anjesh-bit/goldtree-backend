import Form, { useForm } from "antd/es/form/Form";
import AntdButton from "../../common/AntdButtons";
import { AntModal } from "../../common/AntdModal";
import Inputs from "../../common/form/AntdInputs";
import { useUpdateEasyApply } from "../../services/jobSeeker/setUp";
import { useEffect, useState } from "react";

import DynamicLogin from "../auth/DynamicLogin";
import useAuthHook from "../../hooks/useAuthHook";
import TextAreas from "../../common/form/AntdTextArea";

const ViewForm = ({ open, setOpen }) => {
  const isAuthenticated = useAuthHook(null);
  const [form] = useForm();
  const [files, setFiles] = useState(null);
  const easyApply = useUpdateEasyApply();
  const type = isAuthenticated?.type;
  const applyNow = open?.isApplyNow;

  const handleFinish = async (value) => {
    try {
      const formData = new FormData();
      for (const key in value) {
        if (key !== "cv_upload") {
          formData.append(key, value[key]);
        }
      }
      if (files) {
        formData.append("cv_upload", files);
      }
      formData.append("type", `${!applyNow ? "easyApply" : "directApply"}`);
      formData.append("userId", isAuthenticated?.id);

      formData.append("postId", !applyNow ? open?.data : open?.data?.[0]);
      await easyApply.mutateAsync(formData);
      setFiles(null);
      form.resetFields();
    } catch (error) {
      console.error("Error occurred during easy apply:", error);
    }
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFiles(files[0]);
  };

  return (
    <AntModal open={open} setOpen={setOpen} title="Email Apply">
      <Form form={form} onFinish={handleFinish}>
        {!applyNow && (
          <>
            <div>
              <Inputs Label={"Name"} name="name" />
            </div>
            <div>
              <Inputs Label={"Email"} name="email" />
            </div>
            <div>
              <TextAreas rows="6" Label={"Cover Letter"} name="cover_letter" />
            </div>
          </>
        )}
        {(!applyNow || type === "jobSeeker") && !open?.isSaveJobs && (
          <Inputs
            Label="Upload CV"
            type="file"
            name="cv_upload"
            onChange={handleFileChange}
          />
        )}
        {applyNow && !isAuthenticated ? (
          <DynamicLogin modalData={open?.data} setOpen={setOpen} />
        ) : (
          <AntdButton
            classNames={"bg-[#242021] !border-none text-white px-7 h-10 mt-4"}
            htmlType={"submit"}
            loading={easyApply?.isError ? false : easyApply?.isPending}
          >
            Easy Apply
          </AntdButton>
        )}
      </Form>
    </AntModal>
  );
};

export default ViewForm;

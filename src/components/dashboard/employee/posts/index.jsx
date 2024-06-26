import AntdBreadCum from "../../../../common/AntdBreadCum";
import Inputs from "../../../../common/form/AntdInputs";
import TextAreas from "../../../../common/form/AntdTextArea";
import CkEditors from "../../../../common/CkEditor";
import AntdButton from "../../../../common/AntdButtons";
import { useEffect, useState } from "react";
import { Form } from "antd";
import {
  usePostJobs,
  useUpdatePostJobs,
} from "../../../../services/employee/setUp";

import { useLocation, useParams } from "react-router-dom";
import useAuthHook from "../../../../hooks/useAuthHook";
import { Selects } from "../../../../common/form/AntdSelects";
import { AntRadio } from "../../../../common/form/AntdRadioGroup";

const { useForm } = Form;

const salaryOptions = [
  {
    option: "Fixed",
    value: "fixed",
  },
  {
    option: "Negotiable",
    value: "negotiable",
  },
  {
    option: "Raneg",
    value: "range",
  },
];

const expOptions = [
  {
    option: "Fresher",
    value: "fresher",
  },
  {
    option: "No Experience",
    value: "noexp",
  },
  {
    option: "Experience",
    value: "exp",
  },
];

const licenseOptions = [
  {
    option: "Yes",
    value: "y",
  },
  {
    option: "No",
    value: "n",
  },
];

const genderOptions = [
  {
    option: "Male",
    value: "m",
  },
  {
    option: "Female",
    value: "f",
  },
  {
    option: "Other",
    value: "o",
  },
];

const applyOnlineOptions = [
  {
    option: "Yes",
    value: "y",
  },
  {
    option: "No",
    value: "n",
  },
];

const applyDirectOptions = [
  {
    option: "Yes",
    value: "y",
  },
  {
    option: "No",
    value: "n",
  },
];

const applyInstruction = [
  {
    option: "Yes",
    value: "m",
  },
  {
    option: "No",
    value: "f",
  },
];

const categoryType = [
  { id: 1, name: "IT & Engineering" },
  { id: 2, name: "Others" },
];

const jobCatagory = [
  { id: 1, name: "Product Manager" },
  { id: 2, name: "Accounting" },
  { id: 3, name: "Android" },
  { id: 4, name: "Angular JS" },
  { id: 5, name: "React Developer" },
  { id: 6, name: "Full Stack Engineer" },
  { id: 7, name: "Flutter Developer" },
];

const industryType = [{ id: 1, name: "IT & Engineering" }];

const jobIndustry = [
  { id: 1, name: "Software Industry" },
  { id: 2, name: "Accounting/Finance" },
  { id: 3, name: "Engineering Farm" },
];

const serviceType = [
  { id: 1, name: "Top Jobs" },
  { id: 2, name: "Hot Jobs" },
  { id: 3, name: "Featured Jobs" },
  { id: 4, name: "General Jobs" },
  { id: 5, name: "Freelancing Jobs" },
  { id: 6, name: "Intern" },
];

const degreeName = [
  { id: 1, name: "BBA" },
  { id: 2, name: "BBS" },
  { id: 3, name: "BSc in Computer Science" },
  { id: 4, name: "B.E in Compiter Engineering" },
  { id: 5, name: "Bachelor in Education" },
];

const jobLevel = [
  { id: 1, name: "Intern Level" },
  { id: 2, name: "Entry Level" },
  { id: 3, name: "Mid Level" },
  { id: 4, name: "Senior Level" },
  { id: 5, name: "Top Level" },
];

const eduPreferences = [
  { id: 1, name: "Under SLC" },
  { id: 2, name: "SLC" },
  { id: 3, name: "Intermediate" },
  { id: 4, name: "Masters" },
  { id: 5, name: "Bachelors" },
  { id: 6, name: "Bachelors" },
];

const skillsArr = [
  { id: 1, name: "MERN STACK DEVELOPER" },
  { id: 2, name: "MEAN STACK DEVELOPER" },
  { id: 3, name: "FLUTTER DEVELOPER" },
  { id: 4, name: "PHP" },
  { id: 5, name: "AGILE DEVELOPMENT" },
  { id: 6, name: "GIT" },
];

const PostJobs = () => {
  const isAuthenticated = useAuthHook(null);
  const [value, setValue] = useState({ eQD: "", jD: "", jS: "", jB: "" });
  const location = useLocation();
  const params = useParams();

  const [form] = useForm();
  const {
    data: postJobData,
    isPending: postJobPending,
    isSuccess: postJobSuccess,
    isError: postJobError,
    mutateAsync: postJobMutate,
  } = usePostJobs(isAuthenticated?.id);
  const {
    data: postUpdateData,
    isPending: postUpdatePending,
    isSuccess: postUpdateSuccess,
    isError: postUpdateError,
    mutateAsync: postUpdateMutate,
  } = useUpdatePostJobs(params?.id);

  const postEditItems = location?.state?.data || null;
  const isMatchLocation = location.pathname === "/employee/dashboard/new-job";

  const handleFinish = async (values) => {
    try {
      values.education_qual_desc = value.eQD;
      values.job_desc = value.jD;
      values.job_spec = value.jS;
      values.job_benifits = value.jB;
      values.userId = isAuthenticated?.id;
      !isMatchLocation
        ? await postUpdateMutate({ ...values })
        : await postJobMutate({ ...values });
    } catch (e) {}
  };

  const handleCkEditor = (event, editor, filter) => {
    switch (filter) {
      case "key0":
        setValue({ ...value, eQD: editor.getData() });
        break;
      case "key1":
        setValue({ ...value, jD: editor.getData() });
        break;
      case "key2":
        setValue({ ...value, jS: editor.getData() });
        break;
      default:
        setValue({ ...value, jB: editor.getData() });
    }
  };

  useEffect(() => {
    if (postEditItems) {
      for (const postKeys in postEditItems) {
        form.setFieldsValue({ [postKeys]: postEditItems[postKeys] });
      }
    }
    if (isMatchLocation) {
      form.resetFields();
    }
  }, [postEditItems]);

  return (
    <Form onFinish={handleFinish} form={form}>
      <AntdBreadCum array={["Employee", "Post Jobs"]} />
      <div className="grid grid-cols-12 gap-2">
        <div className="lg:col-span-4">
          <Selects
            className="w-full"
            Label="Catagory Type"
            name="catagory_type"
            description="name"
            value="name"
            array={categoryType}
          />
        </div>
        <div className="lg:col-span-4">
          <Selects
            className="w-full"
            Label="Job Catagory"
            value="name"
            description="name"
            name="job_catagory"
            array={jobCatagory}
          />
        </div>
        <div className="lg:col-span-4">
          <Selects
            className="w-full"
            Label="Industry Type"
            name="industry_type"
            description="name"
            value="name"
            array={industryType}
          />
        </div>
        <div className="lg:col-span-4">
          <Selects
            className="w-full"
            Label="Job Industry"
            name="job_industry"
            description="name"
            value="name"
            array={jobIndustry}
          />
        </div>

        <div className="lg:col-span-4">
          <Inputs
            className="w-full"
            Label="Apply Before(in days)"
            name="apply_before"
          />
        </div>
        <div className="lg:col-span-4">
          <Inputs className="w-full" Label="Job Title" name="job_title" />
        </div>
        <div className="lg:col-span-4">
          <Inputs
            className="w-full"
            Label="No.of Vacancy"
            name="no_of_vacancy"
          />
        </div>

        <div className="lg:col-span-4" Label="Service Type">
          <Selects
            className="w-full"
            Label="Job Type"
            name="job_type"
            description="name"
            value="name"
            array={serviceType}
          />
        </div>
        <div className="lg:col-span-4" Label="Service Type">
          <Selects
            className="w-full"
            Label="Job Level"
            name="job_level"
            description="name"
            value="name"
            array={jobLevel}
          />
        </div>
        <div className="lg:col-span-4">
          <Inputs className="w-full" Label="Job Location" name="job_location" />
        </div>
        <div className="lg:col-span-4">
          <Selects
            className="w-full"
            Label="Skills"
            name="skills"
            value="name"
            description="name"
            array={skillsArr}
            mode="multiple"
          />
        </div>
        <div className="lg:col-span-12">
          <TextAreas rows="6" Label={"Job Purpose"} name="job_purpose" />
        </div>
        <div className="lg:col-span-12">
          <AntRadio options={salaryOptions} Label="Salary" name="salary" />
        </div>
        <div className="lg:col-span-12">
          <AntRadio
            options={expOptions}
            Label="Experience Required"
            name="exp_required"
          />
        </div>
        <div className="lg:col-span-12">
          <AntRadio
            options={licenseOptions}
            Label="Driving License"
            name="is_driving_license"
          />
        </div>
        <div className="lg:col-span-4">
          <Selects
            className="w-full"
            Label="Educational Preferences"
            name="edu_preferences"
            description="name"
            value="name"
            array={eduPreferences}
          />
        </div>
        <div className="lg:col-span-4">
          <Selects
            className="w-full"
            Label="Degree Name"
            name="degree_name"
            description="name"
            value="name"
            array={degreeName}
          />
        </div>
        <div className="lg:col-span-12">
          <AntRadio options={genderOptions} Label="Gender" name="gender" />
        </div>
        <div className="lg:col-span-12">
          <CkEditors
            Label={"Educational Qualification Description:"}
            onChange={(event, editor) => handleCkEditor(event, editor, "key0")}
            data={!isMatchLocation ? postEditItems["education_qual_desc"] : " "}
          />
        </div>

        <div className="lg:col-span-12">
          <CkEditors
            Label={"Job Description:"}
            onChange={(event, editor) => handleCkEditor(event, editor, "key1")}
            data={!isMatchLocation ? postEditItems["job_desc"] : " "}
          />
        </div>
        <div className="lg:col-span-12">
          <CkEditors
            Label={"Job Specification:"}
            onChange={(event, editor) => handleCkEditor(event, editor, "key2")}
            data={!isMatchLocation ? postEditItems["job_spec"] : " "}
          />
        </div>
        <div className="lg:col-span-12">
          <CkEditors
            Label={"Job Benefits:"}
            onChange={(event, editor) => handleCkEditor(event, editor, "key3")}
            data={!isMatchLocation ? postEditItems["job_benifits"] : " "}
          />
        </div>
        <div className="lg:col-span-6">
          <AntRadio
            options={applyOnlineOptions}
            Label="Apply Online"
            name="is_online"
          />
        </div>
        <div className="lg:col-span-6">
          <AntRadio
            options={applyDirectOptions}
            Label="Apply Direct"
            name="is_direct"
          />
        </div>
        <div className="lg:col-span-12">
          <AntRadio
            options={applyInstruction}
            Label="Apply Instruction"
            name="is_apply_instruction"
          />
        </div>

        <div className="col-span-2">
          <AntdButton
            loading={postJobError ? false : postJobPending}
            htmlType={"submit"}
            classNames={"bg-[#242021] !border-none text-white px-7 h-10 w-full"}
          >
            {!isMatchLocation ? "Update" : "Save"}
          </AntdButton>
        </div>
      </div>
    </Form>
  );
};

export default PostJobs;

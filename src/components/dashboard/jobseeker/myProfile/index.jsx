import Profile from "./profileInfo/profile";
import Experience from "./profileInfo/experience";
import TrainingCertification from "./profileInfo/trainingCertification";
import AntdButton from "../../../../common/AntdButtons";
import DynamicTitle from "../../../../common/DynamicTitle";
import { Avatar, Form } from "antd";
import Education from "./profileInfo/education";
import { useEffect, useMemo, useState } from "react";
import {
  useGetProfileInfo,
  useProfileInfo,
  useUpdateProfileInfo,
} from "../../../../services/jobSeeker/setUp";
import useMessage from "../../../../hooks/useMessage";
import dayjs from "dayjs";
import useAuthHook from "../../../../hooks/useAuthHook";

const { useForm } = Form;

const MyProfile = () => {
  const [form] = useForm();
  const isAuthenticated = useAuthHook(null);
  const [inputValue, setInputValue] = useState({
    editor: "",
    dob: dayjs(),
    from: dayjs(),
    to: dayjs(),
    passedYear: dayjs(),
    toCourse: dayjs(),
    fromCourse: dayjs(),
  });
  const { contextHolder, showMessage } = useMessage();
  const {
    mutateAsync: jobSeekerMutate,
    isPending: profilePending,
    isSuccess: profileSuccess,
  } = useProfileInfo();

  const {
    mutateAsync: jobSeekerMutateUpdate,
    isError: jobSeErrorUpdate,
    isPending: jobSeLoadingUpdate,
  } = useUpdateProfileInfo(isAuthenticated?.id);

  const { data: profileData, isError: profileErr } = useGetProfileInfo(
    isAuthenticated?.id
  );
  const isEmpty = profileData?.length > 0;

  const handleDetails = async (values) => {
    try {
      const profileFinalData = {
        userId: isAuthenticated?.id,
        profile: {
          full_name: values.full_name,
          dob: inputValue.dob,
          nationality: values.nationality,
          permanent_addr: values.permanent_addr,
          current_addr: values.current_addr,
          phone_no: values.phone_no,
          gender: values.gender,
          marital_status: values.marital_status,
        },
        experience: {
          designation: values.designation,
          from: inputValue.from,
          to: inputValue.to,
          company: values.company,
          addr: values.addr,
          job_level: values.job_level,
          mob_no: values.mob_no,
          description: inputValue.editor,
          currently_working: values.currently_working,
        },
        education: {
          level: values.level,
          degree: values.degree,
          board: values.board,
          institution: values.institution,
          specialization: values.specialization,
          current_running: values.current_running,
          gpa: values.gpa,
          passed_year: inputValue.passedYear,
        },
        trainingCert: {
          course_name: values.course_name,
          institute: values.institute,
          to_course: inputValue.toCourse,
          from_course: inputValue.fromCourse,
        },
      };
      !isEmpty
        ? await jobSeekerMutate({ ...profileFinalData })
        : await jobSeekerMutateUpdate({ ...profileFinalData });
    } catch (e) {}
  };

  useEffect(() => {
    if (profileSuccess) {
      showMessage({
        type: "success",
        content: "You profile have been succesfully saved .",
        className: "mt-[30vh] h-[40px]",
      });
    }
  }, [profileSuccess]);

  useEffect(() => {
    if (isEmpty) {
      delete profileData[0]._id;
      delete profileData[0].userId;
      Object.keys(profileData[0]).map((items) => {
        for (const pfData in profileData[0][items]) {
          form.setFieldsValue({ [pfData]: profileData[0][items][pfData] });
        }
      });
    }
  }, [profileData]);

  useMemo(() => {
    if (isEmpty) {
      const profileTemp = profileData?.[0];
      const { from, to, description } = profileTemp?.experience;
      const { passed_year } = profileTemp?.education;
      const { to_course, from_course } = profileTemp?.trainingCert;
      const { dob } = profileTemp?.profile;
      setInputValue({
        from,
        to,
        editor: description,
        passedYear: passed_year,
        toCourse: to_course,
        fromCourse: from_course,
        dob,
      });
    }
  }, [profileData]);

  return (
    <>
      {contextHolder}
      <Form form={form} onFinish={handleDetails}>
        <div>
          <div className="flex justify-between items-center">
            <DynamicTitle classNames={"text-lg font-medium mb-3"}>
              Personal Information
            </DynamicTitle>
            <Avatar src={profileData?.[0]?.profile_images} size={100} />
          </div>

          <Profile
            setInputValue={setInputValue}
            inputValue={inputValue}
            dayjs={dayjs}
          />
        </div>
        <div>
          <DynamicTitle classNames={"text-lg font-medium mb-3"}>
            Experience
          </DynamicTitle>
          <Experience
            setInputValue={setInputValue}
            inputValue={inputValue}
            dayjs={dayjs}
          />
        </div>
        <div>
          <DynamicTitle classNames={"text-lg font-medium mb-3"}>
            Education
          </DynamicTitle>
          <Education
            setInputValue={setInputValue}
            inputValue={inputValue}
            dayjs={dayjs}
          />
        </div>
        <div>
          <DynamicTitle classNames={"text-lg font-medium mb-3"}>
            Training And Certifications
          </DynamicTitle>
          <TrainingCertification
            setInputValue={setInputValue}
            inputValue={inputValue}
            dayjs={dayjs}
          />
        </div>
        <div className="mt-6">
          <AntdButton
            classNames={"bg-[#242021] !border-none text-white px-7 h-10"}
            htmlType={"submit"}
            loading={
              profileErr || jobSeErrorUpdate
                ? false
                : profilePending || jobSeLoadingUpdate
            }
          >
            Submit
          </AntdButton>
        </div>
      </Form>
    </>
  );
};

export default MyProfile;

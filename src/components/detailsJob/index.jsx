import { useParams } from "react-router-dom";
import { useGetSinglePost } from "../../services/employee/setUp";
import AntdCards from "../../common/AntdCards";
import { Tag } from "antd";
import AntdButton from "../../common/AntdButtons";
import { useEffect, useState } from "react";
import ViewForm from "./ViewForm";

import { useSavedJobs } from "../../services/jobSeeker/setUp";
import useMessage from "../../hooks/useMessage";
import useAuthHook from "../../hooks/useAuthHook";

const DetailJobView = () => {
  const isAuthenticated = useAuthHook(null);
  const [open, setOpen] = useState({ open: false });
  const [id, setId] = useState("");
  const params = useParams();

  const {
    data: singlePostData,
    isLoading: singlePostLoading,
    isError: singlePostError,
  } = useGetSinglePost(params?.id);
  const { mutateAsync, data, isPending, isError } = useSavedJobs(
    id,
    isAuthenticated?.id
  );
  const { contextHolder, showMessage } = useMessage();
  const handleClick = (_, filter, id) => {
    const isOpen = filter === "easy";
    const isSaveJobs = filter === "saveJobs";

    if (isAuthenticated && isSaveJobs) {
      setId(id);
      const savedJobs = async () => {
        try {
          await mutateAsync();
          showMessage({
            type: "success",
            content: "The job have been successfully saved.",
            className: "mt-[30vh] h-[40px]",
          });
        } catch (error) {
          const apiMessage = error?.response?.data?.messsage;
          if (apiMessage) {
            showMessage({
              type: "info",
              content: apiMessage,
              className: "mt-[30vh] h-[40px]",
            });
          }
        }
      };
      savedJobs();
    } else {
      const postData = isOpen
        ? singlePostData?._id
        : [singlePostData?._id, singlePostData?.company_name];
      setOpen({
        open: true,
        data: postData,
        isApplyNow: !isOpen,
        isSaveJobs,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="px-[50px] py-[20px]">
        <AntdCards className={"p-4 bg-[#fffffff]"}>
          <div>{singlePostData?.company_name}</div>
          <div>{singlePostData?.job_location}</div>
          <div>{singlePostData?.industry_type}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: singlePostData?.company_description,
            }}
          />
          <AntdButton
            classNames={"bg-[#242021] !border-none text-white px-7 h-10 mt-4"}
            onClick={(e) => handleClick(e, "saveJobs", singlePostData?._id)}
          >
            Save Job
          </AntdButton>
        </AntdCards>
        <AntdCards className={"p-4 bg-[#fffffff]"}>
          <div>{singlePostData?.job_title}</div>
          <div>Apply Before : {singlePostData?.apply_before} days</div>
          <div>
            Job Summary :
            <div>No. of Vacancy : {singlePostData?.no_of_vacancy}</div>
            <div>Job Type : {singlePostData?.job_type}</div>
            <div>Offered Salary : {singlePostData?.salary}</div>
            <div>
              Gender :{" "}
              {singlePostData?.gender === "m"
                ? "Male"
                : "f"
                ? "Female"
                : "Others"}
            </div>
            <div>Career Level : {singlePostData?.job_level}</div>
            <div>Experience : {singlePostData?.exp_required}</div>
            <div>
              Skills :{" "}
              {singlePostData?.skills?.map((skills) => (
                <Tag
                  color={
                    "#" +
                    Math.floor(Math.random() * 16777215)
                      .toString(16)
                      .padStart(6, "0")
                  }
                >
                  {skills}
                </Tag>
              ))}
            </div>
          </div>
        </AntdCards>
        <AntdCards className={"p-4 bg-[#fffffff]"}>
          <div>Job Description :</div>
          <div
            dangerouslySetInnerHTML={{
              __html: singlePostData?.job_desc,
            }}
          />
        </AntdCards>
        <AntdCards className={"p-4 bg-[#fffffff]"}>
          <div>Job Benifits :</div>
          <div
            dangerouslySetInnerHTML={{
              __html: singlePostData?.job_benifits,
            }}
          />
        </AntdCards>
        <AntdCards className={"p-4 bg-[#fffffff]"}>
          <div>Required Knowledge, Skills, and Abilities:</div>
          <div
            dangerouslySetInnerHTML={{
              __html: singlePostData?.job_spec,
            }}
          />
        </AntdCards>
        <AntdCards className={"p-4 bg-[#fffffff]"}>
          <div>Education + Experience : </div>
          <div
            dangerouslySetInnerHTML={{
              __html: singlePostData?.education_qual_desc,
            }}
          />
        </AntdCards>
        {singlePostData?.is_apply_instruction === "m" && (
          <AntdCards className={"p-4 bg-[#fffffff]"}>
            <p>
              Interested candidates fulfilling the mentioned criteria are
              encouraged to Apply using the Easy Apply Button below. Registered
              candidates may also apply using Apply Now Button.
            </p>
            <div className="flex gap-2">
              <AntdButton
                classNames={
                  "bg-[#242021] !border-none text-white px-7 h-10 mt-4"
                }
                onClick={(e) => handleClick(e, "easy")}
              >
                Easy Apply
              </AntdButton>
              <AntdButton
                classNames={
                  "bg-[#242021] !border-none text-white px-7 h-10 mt-4"
                }
                onClick={(e) => handleClick(e, "now")}
              >
                Apply Now
              </AntdButton>
            </div>
          </AntdCards>
        )}
        {open?.open && <ViewForm open={open} setOpen={(e) => setOpen(e)} />}
      </div>
    </>
  );
};

export default DetailJobView;

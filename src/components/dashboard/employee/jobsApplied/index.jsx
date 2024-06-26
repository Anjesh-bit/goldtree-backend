import { Fragment, useState } from "react";
import AntdCards from "../../../../common/AntdCards";
import { useGetEasyApply } from "../../../../services/jobSeeker/setUp";
import AntdButton from "../../../../common/AntdButtons";
import { useShorList } from "../../../../services/commonService/setUp";
import useMessage from "../../../../hooks/useMessage";

const JobApplied = () => {
  const { data, isLoading, isError } = useGetEasyApply();
  // const isShorList = req.query.shortList === "shortlist";
  // const userId = req.query.userId;
  // const postId = req.query.postId;
  // const type = req.query.type;7
  const [queryParams, setQueryParams] = useState({
    uploadId: "",
    type: "",
  });

  const {
    data: shorListData,
    isPending,
    isError: errorShorList,
    isSuccess,
    mutateAsync,
  } = useShorList(queryParams);
  const { contextHolder, showMessage } = useMessage();
  const handleOnClick = async (_, uploadId, type) => {
    setQueryParams({
      shortList: "shortlist",
      uploadId: uploadId,
      type,
    });

    try {
      await mutateAsync();
      showMessage({
        type: "info",
        content: "Candidates have successfully shorlisted",
        className: "mt-[30vh] h-[40px]",
      });
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      console.error(apiMessage);
      showMessage({
        type: "error",
        content: apiMessage,
        className: "mt-[30vh] h-[40px]",
      });
    }
  };

  return (
    <Fragment>
      {contextHolder}
      <div className="py-4">
        {data?.map((items) => {
          let phoneNo, name;
          const jobTitle = items?.post?.job_title;

          return (
            <div className="mb-2">
              <div>
                <span className="font-bold text-lg">JobTitle : </span>
                <span className="font-semibold">{jobTitle}</span>
              </div>
              <div className="grid grid-cols-12 w-full gap-2 ">
                <AntdCards
                  className={"col-span-12 p-4 bg-[#f5f5f5]"}
                  key={items.email}
                >
                  <div className="font-semibold">Candidates Applied : </div>
                  <div className="grid grid-cols-12 w-full gap-2">
                    {items?.candidates?.map((candidates) => {
                      const url = candidates?.upload_cv?.substring(
                        candidates?.upload_cv?.lastIndexOf("/") + 1
                      );
                      const directAppltArr = candidates?.jobSeekerProfile;
                      const hasArrayIsEmpty =
                        candidates?.hasOwnProperty("jobSeekerProfile") &&
                        directAppltArr?.length > 0;
                      if (hasArrayIsEmpty) {
                        name = directAppltArr?.[0]?.profile?.full_name;
                        phoneNo = directAppltArr?.[0]?.profile?.phone_no;
                      }

                      return (
                        <AntdCards className="col-span-4 p-4">
                          <AntdButton
                            classNames={
                              "bg-[#f5f5f5] !border-none  px-7 h-8 rounded-r-full text-[#f09b1e] font-medium"
                            }
                            onClick={(e) =>
                              handleOnClick(
                                e,
                                candidates?._id,
                                candidates?.type
                              )
                            }
                          >
                            ShortList
                          </AntdButton>
                          <div>Name : {name || candidates.name}</div>
                          <div>Cover Letter : {candidates.cover_letter}</div>
                          <div>
                            Email / Phone : {phoneNo || candidates.email}
                          </div>
                          <div>
                            Resume :{" "}
                            <a
                              href={candidates.upload_cv}
                              download={url}
                              target="_blank"
                            >
                              {url}
                            </a>
                          </div>
                        </AntdCards>
                      );
                    })}
                  </div>
                </AntdCards>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default JobApplied;

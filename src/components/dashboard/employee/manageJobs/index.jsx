import { useNavigate, useOutletContext } from "react-router-dom";
import AntdBreadCum from "../../../../common/AntdBreadCum";
import AntdCards from "../../../../common/AntdCards";

const ManageJobs = () => {
  const { postData } = useOutletContext();
  const navigate = useNavigate();
  const handleCardClick = (e, id, postItems) => {
    e.preventDefault();
    navigate(`/employee/dashboard/edit-job/${id}`, {
      state: { data: postItems },
    });
  };
  return (
    <div>
      <AntdBreadCum array={["Employee", "Manage Jobs"]} />
      <div className="grid grid-cols-12 w-full gap-2 py-4">
        {postData?.map((postItems) => (
          <AntdCards
            className="lg:col-span-4 md:col-span-12 col-span-12 p-4 bg-[#ffffff] flex flex-col items-center justify-center  min-h-60 md:hover:cursor-pointer sm:cursor-none"
            onClick={(e) => handleCardClick(e, postItems._id, postItems)}
            key={postItems._id}
          >
            <div className="text-lg font-medium">{postItems?.job_title}</div>
            <div>{postItems?.job_type}</div>
            <div>Apply Before : {postItems?.apply_before} days</div>
            <div className="col-span-6">{postItems?.job_location}</div>
          </AntdCards>
        ))}
      </div>
    </div>
  );
};

export default ManageJobs;

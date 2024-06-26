import DynamicTitle from "../../../common/DynamicTitle";
import AntdCards from "../../../common/AntdCards";
import { useGetAllPosts } from "../../../services/employee/setUp";
import { Collapse } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import { useNavigate } from "react-router-dom";

const FeaturedJobs = () => {
  const navigate = useNavigate();
  const {
    data: allPostsData,
    isLoading: allPostPending,
    isError: allPostsError,
  } = useGetAllPosts();

  const tempObj = {};
  const handleProductClick = (e, id, name) => {
    e.preventDefault();
    if (id) {
      navigate(`/jobs/${name}/${id}`);
    }
  };
  return (
    <div className="grid grid-cols-12 items-center bg-[#d5d3e4] pr-[50px] py-[20px]">
      <div className="flex flex-col gap-4 bg-[#FFFFFF] items-center lg:col-span-3 p-4">
        <DynamicTitle classNames={"font-bold text-5xl font-extrabold"}>
          Latest Featured Jobs
        </DynamicTitle>
        <div className="text-md">
          Search and found your dream job is easier then ever.Just search jobs
          and found the job you need.
        </div>
      </div>
      <div className="grid grid-cols-12 lg:col-span-9 gap-2">
        {allPostsData?.map((postsItems) => {
          const companyName = postsItems.posts[0]?.company_name || null;
          tempObj[companyName] = postsItems?.posts;

          return Object.entries(tempObj).map(([companyName, posts]) => (
            <AntdCards
              key={companyName}
              className={
                "lg:col-span-4 md:col-span-12 col-span-12 p-4 bg-[#F5F5F5]"
              }
            >
              <div className="text-center">
                <Collapse>
                  <CollapsePanel
                    header={
                      <div className="text-2xl font-medium text-[#3d2462]">
                        {companyName}
                      </div>
                    }
                  >
                    {posts.map((post) => (
                      <div key={post._id}>
                        <div
                          className="text-sm font-medium cursor-pointer"
                          onClick={(e) =>
                            handleProductClick(e, post._id, companyName)
                          }
                        >
                          {post.job_catagory}
                        </div>
                      </div>
                    ))}
                  </CollapsePanel>
                </Collapse>
              </div>
            </AntdCards>
          ));
        })}
      </div>
    </div>
  );
};

export default FeaturedJobs;

import AntdBreadCum from "../../common/AntdBreadCum";
import AntdButton from "../../common/AntdButtons";
import Inputs from "../../common/form/AntdInputs";

const ChangePassword = () => {
  return (
    <div>
      <div>
        <AntdBreadCum array={["Employee", "Change Password"]} />
      </div>
      <div className="grid grid-cols-12 gap-2 items-center">
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="Old Password" />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="New Password" />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="Confirm Password" />
        </div>
        <div className="col-span-2">
          <AntdButton
            classNames={"bg-[#242021] !border-none text-white px-7 h-10 w-full"}
          >
            Update
          </AntdButton>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

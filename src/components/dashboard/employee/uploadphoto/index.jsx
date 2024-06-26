import AntdBreadCum from "../../../../common/AntdBreadCum";
import UploadProfile from "../../UploadProfile";

const UploadPhotoEmployee = () => {
  return (
    <div>
      <AntdBreadCum array={["Employee", "Upload Picture"]} />
      <UploadProfile type="employee" />
    </div>
  );
};

export default UploadPhotoEmployee;

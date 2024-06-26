import Inputs from "../../../../common/form/AntdInputs";
import DynamicTitle from "../../../../common/DynamicTitle";

const SocialNetworks = () => {
  return (
    <div>
      <DynamicTitle classNames={"text-lg font-medium mb-3"}>
        Social Network
      </DynamicTitle>
      <div className="grid grid-cols-12 gap-2">
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs
            className="w-full"
            placeholder="Facebook Link"
            name="fb_link"
          />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs
            className="w-full"
            placeholder="Instagram Link"
            name="ig_link"
          />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs
            className="w-full"
            placeholder="Linkedin Link"
            name="linkedin_link"
          />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs
            className="w-full"
            placeholder="Twitter Link"
            name="twitter_link"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialNetworks;

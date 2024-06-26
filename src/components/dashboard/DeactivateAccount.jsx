import { Descriptions } from "antd";

import AntdButton from "../../common/AntdButtons";
import { AntRadio } from "../../common/form/AntdRadioGroup";

const applyOnlineOptions = [
  {
    option: "This is temporary. I'll be back.",
    value: "y",
  },
  {
    option: "I don't find it useful.",
    value: "n",
  },
  {
    option: "I have a privacy concern.",
    value: "n",
  },
  {
    option: "My account was hacked.",
    value: "n",
  },
  {
    option: "I got too many emails and notifications from goldTree",
    value: "n",
  },
  {
    option: "Others..",
    value: "n",
  },
];

const DeactivateAccount = () => {
  return (
    <div>
      <Descriptions
        title="Are You Sure You Want To Deactivate Your Account?"
        layout="vertical"
      >
        <Descriptions.Item span={3}>
          Deactivating your account will disable your profile and remove your
          name from most things, such as your name in the list of job alerts.
        </Descriptions.Item>
        <Descriptions.Item>Reason for leaving required</Descriptions.Item>

        <Descriptions.Item>
          <AntRadio options={applyOnlineOptions} deactivateAccount />
        </Descriptions.Item>
      </Descriptions>
      <div>
        <AntdButton
          classNames={
            "bg-[#242021] !border-none text-white px-7 h-10 w-[16.67%]"
          }
        >
          Update
        </AntdButton>
      </div>
    </div>
  );
};

export default DeactivateAccount;

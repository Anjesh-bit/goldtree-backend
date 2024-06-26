import Inputs from "../../../../../../common/form/AntdInputs";
import DatePickers from "../../../../../../common/AntdDatePickers";
import { AntRadio } from "../../../../../../common/form/AntdRadioGroup";

const marriedOptions = [
  {
    option: "Married",
    value: "fresher",
  },
  {
    option: "Unmarried",
    value: "noexp",
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

const ProfileInformation = ({ setInputValue, inputValue, dayjs }) => {
  const handleChange = (_, dateString) => {
    setInputValue((prevState) => ({ ...prevState, dob: dateString }));
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-x-2">
        <div className="lg:col-span-4">
          <Inputs className="w-full" Label="Full Name" name="full_name" />
        </div>
        <div className="lg:col-span-4">
          <DatePickers
            className="w-full"
            format="YYYY-MM-DD"
            Label="Date Of Birth"
            value={dayjs(inputValue?.dob)}
            onHandleChange={(_, dateString) => handleChange(_, dateString)}
          />
        </div>
        <div className="lg:col-span-4">
          <Inputs className="w-full" Label="Nationality" name="nationality" />
        </div>
        <div className="lg:col-span-4">
          <Inputs
            className="w-full"
            Label="Permanent Address"
            name="permanent_addr"
          />
        </div>
        <div className="lg:col-span-4">
          <Inputs
            className="w-full"
            Label="Current Address"
            name="current_addr"
          />
        </div>
        <div className="lg:col-span-4">
          <Inputs className="w-full" Label="Phone No." name="phone_no" />
        </div>

        <div className="lg:col-span-6">
          <AntRadio options={genderOptions} Label="Gender" name="gender" />
        </div>
        <div className="lg:col-span-6">
          <AntRadio
            options={marriedOptions}
            Label="Marital Status"
            name="marital_status"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;

import CkEditors from "../../../../../../common/CkEditor";
import Inputs from "../../../../../../common/form/AntdInputs";
import DatePickers from "../../../../../../common/AntdDatePickers";
import { Selects } from "../../../../../../common/form/AntdSelects";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { AntRadio } from "../../../../../../common/form/AntdRadioGroup";

dayjs.locale("en");

const currentlyWorkOpts = [
  {
    option: "Yes",
    value: "y",
  },
  {
    option: "No",
    value: "n",
  },
];

const Experience = ({ setInputValue, inputValue, dayjs }) => {
  const handleChange = (_, value, filter) => {
    setInputValue((prevState) => ({
      ...prevState,
      [filter]: filter === "editor" ? value.getData() : value,
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-x-2">
        <div className="lg:col-span-4">
          <Inputs className="w-full" Label="Designation" name="designation" />
        </div>
        <div className="lg:col-span-4">
          <DatePickers
            className="w-full"
            Label="From"
            format="YYYY-MM-DD"
            name="from"
            value={dayjs(inputValue?.from)}
            onHandleChange={(_, dateString) =>
              handleChange(_, dateString, "from")
            }
          />
        </div>
        <div className="lg:col-span-4">
          <DatePickers
            className="w-full"
            Label="To"
            name="to"
            format="YYYY-MM-DD"
            value={dayjs(inputValue?.to)}
            onHandleChange={(_, dateString) =>
              handleChange(_, dateString, "to")
            }
          />
        </div>
        <div className="lg:col-span-4">
          <Inputs className="w-full" Label="Company" name="company" />
        </div>
        <div className="lg:col-span-4">
          <Inputs className="w-full" Label="Address" name="addr" />
        </div>
        <div className="lg:col-span-4" name="job_level">
          <Selects Label="Job Level" />
        </div>
        <div className="lg:col-span-4">
          <Inputs className="w-full" Label="Phone No." name="mob_no" />
        </div>

        <div className="lg:col-span-12">
          <CkEditors
            Label="Descriptions"
            name="description"
            data={inputValue?.editor}
            onChange={(event, editor) => handleChange(event, editor, "editor")}
          />
        </div>
        <div className="lg:col-span-12">
          <AntRadio
            options={currentlyWorkOpts}
            Label="Currently Working"
            name="currently_working"
          />
        </div>
      </div>
    </div>
  );
};

export default Experience;

import AntdButton from "../../../../../../common/AntdButtons";
import { Selects } from "../../../../../../common/form/AntdSelects";
import Inputs from "../../../../../../common/form/AntdInputs";
import DatePickers from "../../../../../../common/AntdDatePickers";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { AntRadio } from "../../../../../../common/form/AntdRadioGroup";

dayjs.locale("en");

const runningOpts = [
  {
    option: "",
    value: "y",
  },
];

const Education = ({ setInputValue, inputValue, dayjs }) => {
  const handleChange = (_, dateString) => {
    setInputValue((prevState) => ({ ...prevState, passedYear: dateString }));
  };
  return (
    <div>
      <div className="grid grid-cols-12 gap-x-2 items-center">
        <div className="lg:col-span-4">
          <Selects
            className="w-full"
            Label="Education Level"
            name="level"
            value="name"
            description="name"
            array={[
              { id: 1, name: "High School Diploma" },
              { id: 2, name: "Associate's Degree" },
              { id: 3, name: "Bachelor's Degree" },
              { id: 4, name: "Master's Degree" },
              { id: 5, name: "Doctorate Degree" },
            ]}
          />
        </div>

        <div className="lg:col-span-4">
          <Selects
            className="w-full"
            Label="Degree Name"
            name="degree"
            description="name"
            value="name"
            array={[
              { id: 1, name: "Accounting" },
              { id: 2, name: "Business Administration" },
              { id: 3, name: "Computer Science" },
              { id: 4, name: "Education" },
              { id: 5, name: "Engineering" },
              { id: 6, name: "Finance" },
              { id: 7, name: "Graphic Design" },
              { id: 8, name: "Healthcare Administration" },
              { id: 9, name: "Information Technology" },
              { id: 10, name: "Marketing" },
              { id: 11, name: "Nursing" },
              { id: 12, name: "Psychology" },
            ]}
          />
        </div>
        <div className="lg:col-span-4">
          <Inputs className="w-full" Label="Education Board" name="board" />
        </div>

        <div className="lg:col-span-4">
          <Inputs className="w-full" Label="Institution" name="institution" />
        </div>
        <div className="lg:col-span-4">
          <Inputs
            className="w-full"
            Label="Specialization"
            name="specialization"
          />
        </div>
        <div className="lg:col-span-4">
          <AntRadio
            options={runningOpts}
            Label="Currently Running"
            name="current_running"
          />
        </div>
        <div className="lg:col-span-4">
          <Inputs className="w-full" Label="Percentage/Gpa" name="gpa" />
        </div>
        <div className="lg:col-span-4">
          <DatePickers
            Label="Passed Year"
            name="passed_year"
            format="YYYY-MM-DD"
            value={dayjs(inputValue?.passedYear)}
            // value={dayjs(data?.passed_year)}
            // defaultDate={dayjs(data?.passed_year)}
            onHandleChange={(_, dateString) => handleChange(_, dateString)}
          />
        </div>
      </div>
    </div>
  );
};

export default Education;

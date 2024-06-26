import Inputs from "../../../../../../common/form/AntdInputs";
import DatePickers from "../../../../../../common/AntdDatePickers";

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

const TrainingCertification = ({ setInputValue, inputValue, dayjs }) => {
  const handleChange = (_, value, filter) => {
    setInputValue((prevState) => ({
      ...prevState,
      [filter === "to" ? "toCourse" : "fromCourse"]: value,
    }));
  };
  return (
    <div>
      <div className="grid grid-cols-12 gap-x-2">
        <div className="lg:col-span-4">
          <Inputs className="w-full" Label="Course Name" name="course_name" />
        </div>

        <div className="lg:col-span-4">
          <Inputs className="w-full" Label="Institute" name="institute" />
        </div>
        <div className="lg:col-span-4">
          <DatePickers
            className="w-full"
            format="YYYY-MM-DD"
            Label="From"
            onHandleChange={(_, dateString) =>
              handleChange(_, dateString, "from")
            }
            value={dayjs(inputValue?.fromCourse)}
          />
        </div>
        <div className="lg:col-span-4">
          <DatePickers
            className="w-full"
            format="YYYY-MM-DD"
            Label="To"
            onHandleChange={(_, dateString) =>
              handleChange(_, dateString, "to")
            }
            value={dayjs(inputValue?.toCourse)}
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingCertification;

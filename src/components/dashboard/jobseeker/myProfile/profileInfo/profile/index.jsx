import ProfileInformation from "./ProfileInformation";

const Profile = ({ setInputValue, inputValue, dayjs }) => {
  return (
    <div>
      <ProfileInformation
        setInputValue={setInputValue}
        inputValue={inputValue}
        dayjs={dayjs}
      />
    </div>
  );
};

export default Profile;

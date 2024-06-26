import { Form } from "antd";
import AntdBreadCum from "../../../../common/AntdBreadCum";
import AntdButton from "../../../../common/AntdButtons";
import PrimaryContactInfo from "./PrimaryContactInfo";
import ProfileInfo from "./ProfileInfo";
import SocialNetworks from "./SocialNetwork";

import {
  useGetProfileInfo,
  useProfileInfo,
  useUpdateProfile,
} from "../../../../services/employee/setUp";

import { useEffect, useState } from "react";
import useAuthHook from "../../../../hooks/useAuthHook";

const { useForm } = Form;

const Profile = () => {
  const [form] = useForm();
  const isAuthenticated = useAuthHook(null);
  const [ckValue, setCKValue] = useState("");
  const {
    isError: empError,
    isPending: empLoading,
    mutateAsync: empMutate,
  } = useProfileInfo();

  const {
    mutateAsync: empMutateUpdate,
    isError: empErrorUpdate,
    isPending: empLoadingUpdate,
  } = useUpdateProfile(isAuthenticated?.id);

  const { data: profileData, isError: profileErr } = useGetProfileInfo(
    isAuthenticated?.id
  );
  const isEmpty = profileData?.length > 0;
  const ckData = profileData?.[0]?.personalInfo?.description;
  useEffect(() => {
    if (isEmpty) {
      delete profileData[0]._id;
      delete profileData[0].userId;
      Object.keys(profileData[0]).map((items) => {
        for (const pfData in profileData[0][items]) {
          form.setFieldsValue({ [pfData]: profileData[0][items][pfData] });
        }
      });
    }
  }, [profileData]);

  const hanldeOnFinish = async (values) => {
    try {
      const profileData = {
        userId: isAuthenticated?.id,
        personalInfo: {
          company_name: values.company_name,
          alt_company_name: values.alt_company_name,
          company_type: values.company_type,
          business_type: values.business_type,
          company_size: values.company_size,
          location: values.location,
          description: ckValue,
          head_person_name: values.head_person_name,
          head_person_pos: values.head_person_name,
        },
        socialLink: {
          fb_link: values.fb_link,
          ig_link: values.ig_link,
          linkedin_link: values.linkedin_link,
          twitter_link: values.twitter_link,
        },
        primaryContact: {
          full_name: values.full_name,
          address_1: values.address_1,
          address_2: values.address_2,
          phone: values.phone,
          alt_phone: values.alt_phone,
          fax: values.fax,
          po_box: values.po_box,
          email: values.email,
          sec_email: values.sec_email,
          website: values.website,
        },
      };

      !isEmpty
        ? empMutate({ ...profileData })
        : empMutateUpdate({ ...profileData });
    } catch (e) {}
  };
  return (
    <Form onFinish={hanldeOnFinish} form={form}>
      <div>
        <AntdBreadCum array={["Employee", "Profile"]} />
      </div>
      <div>
        <PrimaryContactInfo setCKValue={setCKValue} data={ckData} />
      </div>
      <div>
        <SocialNetworks />
      </div>
      <div>
        <ProfileInfo />
      </div>
      <div className="w-[16.67%]">
        <AntdButton
          loading={
            empError || empErrorUpdate ? false : empLoadingUpdate || empLoading
          }
          htmlType="submit"
          classNames={"bg-[#242021] !border-none text-white px-7 h-10 w-full"}
        >
          {!isEmpty ? "Save" : "Update"}
        </AntdButton>
      </div>
    </Form>
  );
};

export default Profile;

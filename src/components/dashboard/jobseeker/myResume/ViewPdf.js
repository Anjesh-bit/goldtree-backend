import { Fragment } from "react";
import { useGetProfileInfo } from "../../../../services/jobSeeker/setUp";
import useAuthHook from "../../../../hooks/useAuthHook";

const ViewPdf = () => {
  const isAuthenticated = useAuthHook(null);

  const { data: profileData, isError: profileErr } = useGetProfileInfo(
    isAuthenticated?.id
  );

  if (!profileData) return null;
  const patient = profileData[0];

  return (
    <div>
      <Fragment>
        {patient && (
          <div className="grid grid-cols-12 gap-4 pt-2">
            {patient.profile && (
              <>
                <div className="col-span-6 p-2 flex flex-col gap-1">
                  <img
                    src={patient.profile_images}
                    size={100}
                    className="h-[60px] w-[60px] object-cover mt-4"
                  />
                  <div className="font-medium text-[1rem]">
                    {patient.experience.designation}
                  </div>
                  <div>{patient.profile.nationality}</div>
                  <div>{patient.profile.permanent_addr}</div>
                  <div>
                    <i>{patient.profile.phone_no}</i>
                  </div>
                </div>
                <div className="col-span-6 p-2">
                  <div className="text-[2.5rem] font-bold">
                    {patient.profile.full_name}
                  </div>
                  <div className="rounded-xl p-2">
                    <div className="text-[1.3rem] font-medium">Profile</div>
                    <div>
                      Meet [Your Name], the epitome of versatility and wit. With
                      a penchant for creativity and a knack for problem-solving,
                      [he/she] navigates through life's challenges with grace
                      and charm. Armed with a curious mind and a contagious
                      enthusiasm, [he/she] effortlessly leaves an indelible mark
                      wherever [he/she] goes.
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: patient.profile.description,
                      }}
                    ></div>
                  </div>
                </div>
              </>
            )}
            {patient.experience && (
              <div className="col-span-6 h-fit p-2 flex flex-col gap-2">
                <div className="text-[2.5rem] font-bold">Experience</div>
                <div className="flex flex-col gap-1">
                  <div className="font-medium text-[1.3rem]">
                    {patient.experience.designation}
                  </div>
                  <div>
                    <i>{`${patient.experience.from} - ${patient.experience.to}`}</i>
                  </div>

                  <div>{patient.experience.company}</div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: patient.experience.description,
                    }}
                  ></div>
                </div>
              </div>
            )}
            {patient.education && (
              <div className="col-span-6 h-fit p-2 flex flex-col gap-2">
                <div className="text-[2.5rem] font-bold">Education</div>
                <div className="font-medium text-[1.3rem]">
                  {patient.education.degree}
                </div>
                <div>
                  <i>{patient.education.passed_year}</i>
                </div>
                <div>{patient.education.level}</div>
              </div>
            )}
          </div>
        )}
      </Fragment>
    </div>
  );
};

export default ViewPdf;

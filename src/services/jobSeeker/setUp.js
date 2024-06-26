import { useMutation, useQuery } from "@tanstack/react-query";
import { putUploader, uploader } from "../../axios/uploader";
import { useState } from "react";
import { fetcher } from "../../axios/fetcher";
import { JobSeekerQueryKeys } from "../../queryKeys/keys";

export const useProfileInfo = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await uploader("jobseeker-profile-info", payload);
        return data;
      } finally {
        setLocalLoading(false);
      }
    },
    onSuccess: (res) => {},
  });
  return {
    mutateAsync: query.mutateAsync,
    isPending: localLoading,
    isError: query.isError,
    error: query.error,
    data: query.data,
    isSuccess: query.isSuccess,
  };
};

export const useUpdateEasyApply = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await uploader(`upload?name=${"cv_upload"}`, payload);
        return data;
      } finally {
        setLocalLoading(false);
      }
    },
    onSuccess: (res) => {},
  });
  return {
    mutateAsync: query.mutateAsync,
    isPending: localLoading,
    isError: query.isError,
    error: query.error,
    data: query.data,
    isSuccess: query.isSuccess,
  };
};

export const useGetEasyApply = () => {
  return useQuery({
    queryFn: () => fetcher("upload"),
    queryKey: [JobSeekerQueryKeys.setUp.getAllApplied],
  });
};

export const useUpdateProfileInfo = (id) => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await putUploader(`jobseeker-profile-info/${id}`, payload);
        return data;
      } finally {
        setLocalLoading(false);
      }
    },
    onSuccess: (res) => {},
  });
  return {
    mutateAsync: query.mutateAsync,
    isPending: localLoading,
    isError: query.isError,
    error: query.error,
    data: query.data,
    isSuccess: query.isSuccess,
  };
};

export const useGetProfileInfo = (id) => {
  return useQuery({
    queryFn: () => fetcher(`jobseeker-profile-info/${id}`),
    queryKey: [JobSeekerQueryKeys.setUp.getProfileInfoJobSeeker, id],
  });
};

export const useGetJobsApplied = (id, isShorList, isSavedJobs) => {
  return useQuery({
    queryFn: () => fetcher(`jobSeeker-applied-jobs?userId=${id}`),
    queryKey: [JobSeekerQueryKeys.setUp.jobSeekerAppliedJobs, id],
    enabled: !!(id && !isShorList && !isSavedJobs),
  });
};

export const useGetShortListed = (userId, type, isShorList) => {
  return useQuery({
    queryFn: () => fetcher(`shortlist?userId=${userId}&type=${type}`),
    queryKey: [
      JobSeekerQueryKeys.setUp.jobSeekerGetShortListed,
      userId,
      type,
      isShorList,
    ],
    enabled: !!(userId && type && isShorList),
  });
};

export const useSavedJobs = (id, userId) => {
  const [localLoading, setLocalLoading] = useState(false);

  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await putUploader(
          `save-jobs?id=${id}&jobSeekUserId=${userId}`,
          payload
        );
        return data;
      } finally {
        setLocalLoading(false);
      }
    },
    onSuccess: (res) => {},
  });
  return {
    mutateAsync: query.mutateAsync,
    isPending: localLoading,
    isError: query.isError,
    error: query.error,
    data: query.data,
    isSuccess: query.isSuccess,
  };
};

export const useGetSavedJobs = (jobSeekUserId, isSavedJobs) => {
  return useQuery({
    queryFn: () => fetcher(`save-jobs/${jobSeekUserId}`),
    queryKey: [
      JobSeekerQueryKeys.setUp.jobSeekerGetShortListed,
      jobSeekUserId,
      isSavedJobs,
    ],
    enabled: !!(jobSeekUserId && isSavedJobs),
  });
};

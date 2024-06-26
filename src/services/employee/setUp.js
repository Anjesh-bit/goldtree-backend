import { useMutation, useQuery } from "@tanstack/react-query";
import { putUploader, uploader } from "../../axios/uploader";
import { useState } from "react";
import { fetcher } from "../../axios/fetcher";
import { EmployeeQueryKeys } from "../../queryKeys/keys";

export const useProfileInfo = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await uploader("emp-profile-info", payload);
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

export const usePostJobs = (id) => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await uploader(`emp-post-job-info/?id=${id}`, payload);
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

export const useGetPostJobs = (id) => {
  return useQuery({
    queryKey: [EmployeeQueryKeys.setUp.getPostsByUserId, id],
    queryFn: () => fetcher(`emp-posts-by-id/${id}`),
    enabled: !!id,
  });
};

export const useGetProfileInfo = (id) => {
  return useQuery({
    queryKey: [EmployeeQueryKeys.setUp.getProfileInfo, id],
    queryFn: () => fetcher(`emp-profile-info/${id}`),
    enabled: !!id,
  });
};

export const useUpdateProfile = (id) => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await putUploader(`emp-profile-info/${id}`, payload);
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

export const useUpdatePostJobs = (id) => {
  const [localLoading, setLocalLoading] = useState(false);
  const query = useMutation({
    mutationFn: async (payload) => {
      setLocalLoading(true);
      try {
        const data = await putUploader(`emp-posts-by-id/${id}`, payload);
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

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: [EmployeeQueryKeys.setUp.getAllPosts],
    queryFn: () => fetcher("emp-post-job-info"),
  });
};

export const useGetSinglePost = (id) => {
  return useQuery({
    queryKey: [EmployeeQueryKeys.setUp.getSinglePost, id],
    queryFn: () => fetcher(`get-emp-post-single/${id}`),
    enabled: !!id,
  });
};

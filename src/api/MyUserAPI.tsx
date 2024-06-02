import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    // console.log("___accesstoken :", accessToken);
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log("___API response :", response);

    if (!response.ok) {
      throw new Error("Failed to create user....");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const UpdateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user....");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation(UpdateMyUserRequest);

  if (isSuccess) {
    toast.success("User profile updated.");
  }
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateUser,
    isLoading,
  };
};

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  /* when setting getMyUser, (as best practice & not for confusions) we can define what is the type that returned from the API request.
    SO, define a type (src->types.ts->User) that contain all fields types like string, int, boolean.... 
    add here ======>>>>>>>
    ------ Promise<User> ------
    
  */
  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    // console.log("___token :", accessToken);

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create user....");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    currentUser,
    isLoading,
  };
};

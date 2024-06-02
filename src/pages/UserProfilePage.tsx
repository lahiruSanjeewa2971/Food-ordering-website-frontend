import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserAPI";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { isLoading: isUpdateLoading, updateUser } = useUpdateMyUser();
  const { isLoading: isGetLoading, currentUser } = useGetMyUser();

  //
  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile.</span>;
  }

  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isUpdateLoading}
      currentUser={currentUser}
    />
  );
};

export default UserProfilePage;

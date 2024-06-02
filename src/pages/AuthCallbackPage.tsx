import { useCreateMyUser } from "@/api/MyUserAPI";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const componentMounted = useRef(false);
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  useEffect(() => {
    if (user?.sub && user?.email && !componentMounted.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      componentMounted.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);

  return <>Loading....</>;
};

export default AuthCallbackPage;

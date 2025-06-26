"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
// import { jwtDecode } from "jwt-decode";
// import useToastify from "@/hooks/useToastify";
// import { Spinner } from "@/assets/icons/Icons";
// import { useAuth } from "@/hooks/api/useAuth";
// { redirect, closeModal, authType = "signin" }
function GoogleAuth({ authType = "signin" }) {
  // const { login: handleLogin } = useAuth();
  // const { showToast } = useToastify();
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSuccess = async (response) => {
    console.log({ response })
    setLoading(true);
    try {
      // const decodedUser = jwtDecode(response.credential);
      // const userData = {
      //   email: decodedUser.email,
      //   login: decodedUser.email,
      //   first_name: decodedUser.given_name,
      //   last_name: decodedUser.family_name,
      //   provider: "google",
      //   provider_id: decodedUser.sub,
      //   profile_picture: decodedUser.picture,
      //   password: decodedUser.sub,
      //   password_confirmation: decodedUser.sub,
      //   type: "social",
      // };
      // await handleLogin.mutateAsync(userData);
      // if (closeModal) closeModal();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const onFailure = (res) => {
    showToast(`Google sign-in failed. Try again! ${res}`, "error");
  };

  const getButtonText = () => {
    switch (authType) {
      case "signup":
        return "signup_with";
      case "continue":
        return "continue_with";
      default:
        return "signin_with";
    }
  };

  return (
    <>
      <div className="my-1">
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
          useOneTap
          type="standard"
          size="large"
          text={getButtonText()}
          logo_alignment="center"
          shape="pill"
          scope="email profile"
          theme="outline"
        // render={(renderProps) => (
        //   <button
        //     onClick={renderProps.onClick}
        //     disabled={renderProps.disabled}
        //     // className="w-full p-4 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out border-2"
        //   >
        //     Sign in with Google
        //   </button>
        // )}
        />
        {loading && (
          <div className="flex justify-center items-center my-2">
            <span className="animate-spin">
              {/* <Spinner height={24} fill="black" /> */}
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default GoogleAuth;

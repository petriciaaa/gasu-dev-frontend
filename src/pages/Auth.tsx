import React from "react";
import LoginForm from "src/components/auth/RegistrationForm";
import SignInForm from "src/components/auth/SignInForm";
import { ReactComponent as Rect1 } from "src/assets/icons/rect1.svg";
import { ReactComponent as Rect2 } from "src/assets/icons/rect2.svg";
import "src/components/auth/auth.scss";
import { useLocation } from "react-router";

const SignIn = () => {
  const location = useLocation();

  return (
    <>
      <div className="w-full h-auto flex items-center justify-center p-3 ">
        {location.pathname.toLowerCase() === "/login" ? (
          <LoginForm
            feedbackOk={"Отлично!"}
            feedbackErr={"Заполните это поле"}
          />
        ) : (
          <SignInForm
            feedbackOk={"Отлично!"}
            feedbackErr={"Заполните это поле"}
          />
        )}
      </div>
    </>
  );
};
export default SignIn;

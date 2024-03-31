import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileInfo from "./../components/profile/ProfileInfo";
import { IRootReducer } from "./../types/reducers";
import { IUser } from "./../types/user";

import "src/components/profile/profileInfo.scss";

const Profile = () => {
  return (
    <>
      <section className="w-full h-auto flex flex-col  items-center justify-center p-3">
        {/* flex flex-col justify-center items-center  */}
        <div className="profile w-3/5 h-48  rounded-2xl p-3">
          <span className="uppercase profile__logo">мой профиль</span>
          <ProfileInfo />
        </div>
      </section>
    </>
  );
};
export default Profile;

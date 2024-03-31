import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import { useSelector } from "react-redux";
import { teamReducer } from "./../../store/reducers/teamReducers";
import userImage1 from "src/assets/svg/human1.svg";
import userImage2 from "src/assets/svg/human2.svg";
import userImage3 from "src/assets/svg/human3.svg";
import userImage4 from "src/assets/svg/human4.svg";

import SimlpeLoader from "../loaders/SimpleLoader";

import "./team.scss";

const TeamList = () => {
  const teamInfo = useSelector<any, any>((state) => state.teamReducer);

  const totalMembers = teamInfo.totalMembers;
  const teamMembersInfo = teamInfo.membersInfo;

  const [members, setMembers] = useState({ data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://gasudev.ru/api/team")
      .then((resp) => resp.json())
      .then((data) => {
        setLoading(false);
        setMembers(data);
      });
  }, []);

  const membersCards = members.data.reverse().map((element, index) => {
    return (
      <MemberCard
        fullName={element.fullname}
        photo={element.image}
        post={element.post}
        description={element.description}
      />
    );
  });
  if (loading) {
    return (
      <section className="w-full h-auto flex items-end justify-center mt-64">
        <SimlpeLoader />
      </section>
    );
  }
  return (
    <>
      <section className="list w-full h-auto  flex flex-col items-center justify-center">
        <h1 className="list__title">Состав студенческого совета.</h1>
        <div className="list-wrapper">{membersCards}</div>
      </section>
    </>
  );
};
export default TeamList;

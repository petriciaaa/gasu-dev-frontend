import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//Do not forget to use useEffect hook!
const TeamEditForm: React.FC = () => {
  const teamInfo = useSelector<any, any>((state) => state.teamReducer);
  const dispatch = useDispatch();

  const [newMemberName, setNewMember] = useState("");
  const [newMemberSurname, setNewMemberSurname] = useState("");
  const [newMemberPost, setNewMemberPost] = useState("");
  const [newMemberDescription, setNewMemberDescription] = useState("");

  const [deleteMemberName, setDeleteMemberName] = useState("");
  const deleteMemberNameRef = useRef(null);
  const [deleteMemberSurname, setDeleteMemberSurname] = useState("");
  const deleteMemberSurnameRef = useRef(null);

  const newMemberNameRef = useRef(null);
  const newMemberSurnameRef = useRef(null);
  const newMemberPostRef = useRef(null);
  const newMemberDescriptionRef = useRef(null);
  const newMemberImageRef = useRef(null);
  const deleteNameRef = useRef(null);
  const deleteSurNameRef = useRef(null);

  const handleAdd = async () => {
    if (
      newMemberNameRef.current &&
      newMemberSurnameRef.current &&
      newMemberPostRef.current &&
      newMemberImageRef.current
    ) {
      const newTeamMember = {
        fullName:
          String(newMemberNameRef.current.value) +
          " " +
          String(newMemberSurnameRef.current.value),
        post: newMemberPostRef.current.value,
        description: newMemberDescriptionRef.current.value
          ? newMemberDescriptionRef.current.value
          : " ",
      };

      var file = newMemberImageRef.current.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async function () {
        const resp = await fetch("https://gasudev.ru/api/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullname: newTeamMember.fullName,
            post: newTeamMember.post,
            description: newTeamMember.description
              ? newTeamMember.description
              : " ",
            image: reader.result,
            // image: "faKE",
          }),
        }).then((resp) => resp.json());
      };

      const action = { type: "ADD-TEAM-MEMBER", payload: newTeamMember };
      dispatch(action);
    } else {
      alert("Select all fields");
    }
  };
  //endPoint teams

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const deleteCrew = async (event) => {
    const fullname = `${deleteMemberNameRef.current.value} ${deleteMemberSurnameRef.current.value} `;

    const jsonData = JSON.stringify({ fullname });

    try {
      const response = await fetch("https://gasudev.ru/api/team/0", {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
          fullname: `${deleteMemberNameRef.current.value} ${deleteMemberSurnameRef.current.value}`,
        }),
      });

      if (response.status == 200) {
        const data = await response.json();
        alert("Успешно удалено");
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      alert("There was a problem with the fetch operation:" + error);
    }
  };

  return (
    <>
      <div className="team__edit w-full h-auto flex flex-col items-start">
        {/* <h2 className="dashboard__team__title">
          Всего участников: {teamInfo.totalMembers}
        </h2> */}
        <div className="current_team flex items-start justify-center w-full ">
          <div className="current_team__add h-full  flex flex-col items-start justify-start  py-6 ">
            <p className="add__block__title">Добавьте нового участника</p>
            {/*  */}
            <div className="add__block-wrapper flex flex-col items-start mt-4 p-1 ">
              <span>Имя</span>
              <input
                ref={newMemberNameRef}
                type="text"
                onChange={(event) => handleChange(event, setNewMember)}
                value={newMemberName}
                className=""
              />
            </div>
            {/*  */}

            <div className="add__block-wrapper flex flex-col items-start mt-4 p-1 ">
              <span>Фамилия</span>
              <input
                ref={newMemberSurnameRef}
                type="text"
                onChange={(event) => handleChange(event, setNewMemberSurname)}
                value={newMemberSurname}
                className=""
              />
            </div>
            {/*  */}
            <div className="add__block-wrapper flex flex-col items-start mt-4 p-1 ">
              <span>Должность</span>
              <input
                ref={newMemberPostRef}
                type="text"
                onChange={(event) => handleChange(event, setNewMemberPost)}
                value={newMemberPost}
                className=""
              />
            </div>
            <div className="add__block-wrapper flex flex-col items-start mt-4 p-1 ">
              <span>Фото</span>
              <input ref={newMemberImageRef} type="file" />
            </div>
            {/*  */}
            {/*  */}
            <div className="add__block-wrapper flex flex-col items-start mt-4 p-1">
              <span>Дополнительная инфромация</span>
              <textarea
                ref={newMemberDescriptionRef}
                onChange={(event) =>
                  handleChange(event, setNewMemberDescription)
                }
                value={newMemberDescription}
                className=""
              />
            </div>
            <button className="add__subimt" onClick={handleAdd}>
              Добавить
            </button>
          </div>
          {/* Delete */}
          <div className="current_team__delete h-full py-6">
            <p className="add__block__title">Удалить участника</p>
            {/*  */}
            <div className="add__block-wrapper flex flex-col items-start mt-4 p-1 ">
              <span>Имя</span>
              <input
                ref={deleteMemberNameRef}
                type="text"
                onChange={(event) => handleChange(event, setDeleteMemberName)}
                value={deleteMemberName}
                className=""
              />
            </div>
            <div className="add__block-wrapper flex flex-col items-start mt-4 p-1 ">
              <span> Фамилия</span>
              <input
                ref={deleteMemberSurnameRef}
                type="text"
                onChange={(event) =>
                  handleChange(event, setDeleteMemberSurname)
                }
                value={deleteMemberSurname}
                className=""
              />
            </div>
            {/*  */}

            <button
              className="add__subimt add__submit-delete"
              onClick={deleteCrew}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default TeamEditForm;

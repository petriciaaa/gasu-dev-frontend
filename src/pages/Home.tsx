import React from "react";
import Card from "src/components/home/card/Card";
import Description from "src/components/home/description/Description";
import Projects from "./../components/home/projects/Projects";

import { ReactComponent as HouseImg } from "src/assets/icons/card_house1.svg";
import gasu from "src/assets/images/gasu.jpg";
import leader from "src/assets/images/leader.png";

const Home = () => {
  return (
    <>
      <Card
        title={"Присоединяйся к нам!  "}
        description={
          "Студенческий совет – орган студенческого самоуправления. Уже много лет студенческий совет СПбГАСУ работает и осуществляет свою миссию: создаёт возможности, развивает среду и объединяет людей! "
        }
        // image={<HouseImg />}
        image={gasu}
        inputPlaceHolder={"example@mail.ru"}
      />
      <Description />
      <Projects />
      <Card
        title={"Леонид Николаев"}
        description={
          "Именно здесь ты можешь найти круг единомышленников, реализовать свою инициативу и создать возможности для других. Попробуй себя в разных сферах студенческой жизни вместе со студенческим советом СПбГАСУ! "
        }
        image={leader}
        inputPlaceHolder={"Напишите нам!"}
        btnText={"Отправить"}
      />
    </>
  );
};
export default Home;

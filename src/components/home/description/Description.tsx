import "./description.scss";

import { ReactComponent as Inbox } from "src/assets/icons/description_inbox.svg";
import { ReactComponent as Chat } from "src/assets/icons/description_chat.svg";
import { ReactComponent as Write } from "src/assets/icons/description_write.svg";

const Description = () => {
  return (
    <section className="descriton mt-24 w-full h-auto flex items-center justify-center  ">
      <div className=" description-wrapper  flex flex-col items-center justify-between p-3   ">
        <span className="description__title">Три шага. Три минуты.</span>
        <h3 className="description__specification">Все должно быть просто.</h3>
        <div className="description__cards">
          <div className="description__card flex flex-col items-start justify-start  ">
            <Chat />
            <span className="description__card__title mt-6">Напиши нам</span>
            <p className="mt-6 description__card__info">
              И мы свяжемся с тобой, рассмотрим предложение и подскажем
              дальнейшие векторы развития.
            </p>
          </div>
          <div className="description__card flex flex-col items-start justify-start ">
            <Inbox />
            <span className="description__card__title mt-6">
              Подожди немного
            </span>
            <p className="mt-6 description__card__info">
              Всё-таки мы не роботы и нам тоже надо отдыхать. Но уверяю тебя,
              друг мой, это не займет много времени.
            </p>
          </div>
          <div className="description__card flex flex-col items-start justify-start ">
            <Write />
            <span className="description__card__title mt-6">
              И получи результат
            </span>
            <p className="mt-6 description__card__info">
              {" "}
              Ура! Твоя идея уже среди стенок нашего университета.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;

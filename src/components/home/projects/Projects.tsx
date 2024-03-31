import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./projects.scss";
import ProjectItem from "./ProjectItem";

import { useScreenWidth } from "./../../../hooks/screen";
import { useEffect, useState } from "react";
import adapters from "src/assets/images/adapters.png";
import quiz from "src/assets/images/quiz.png";
import career from "src/assets/images/career.png";
import ecoParty from "src/assets/images/ecoParty.png";
import filmClub from "src/assets/images/filmClub.jpg";
import kvartirnik from "src/assets/images/kvartirnik.jpg";
import languageClub from "src/assets/images/languageClub.png";

const Projects = () => {
  const screenWidth = useScreenWidth();
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    if (screenWidth <= 1650) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(3);
    }
    if (screenWidth <= 1100) {
      setSlidesPerView(1);
    }
  }, [screenWidth]);

  return (
    <section className="projects mt-24 w-full h-auto flex items-center justify-center  ">
      <div className="projects-wrapper  flex flex-col items-start justify-between p-3 ">
        <div className="projects__nav ">
          <h2 className="projects__nav__title mb-8">Наши проекты</h2>
        </div>
        <span className="projects__name mb-8">
          Лучшие проекты за последнее время
        </span>

        <div className="swiper-wrapper w-full h-auto flex items-center justify-center">
          <div className="swiper  ">
            <Swiper
              // install Swiper modules
              modules={[Navigation, Scrollbar, A11y, Autoplay]}
              spaceBetween={20}
              slidesPerView={slidesPerView}
              // navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              autoplay={{
                delay: 2000,

                disableOnInteraction: false,
              }}
            >
              <SwiperSlide>
                {" "}
                <ProjectItem
                  title="Адаптеры"
                  description=" Проект «Адаптеры» является проектом студенческого совета и направлен на адаптацию первокурсников в стенах университета.
                  Участники проекта – студенты, которые сами когда-то были на первом курсе и в дальнейшем решили, что хотят помочь новым поколениям. 
                  "
                  image={adapters}
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <ProjectItem
                  title="Easy Quizzee"
                  description=" Что же такое «Easy Quizzee»?
                  Во-первых, это интеллектуальная игра, где участники могут проверить свои знания, а во-вторых, место, где можно узнать что-то новое и познакомиться. Сама игра состоит из шести раундов. Мы экспериментируем и всегда придумываем что-то новое, конечно, прислушиваясь к ребятам, которые высказывают свою критику и пожелания.  
                  "
                  image={quiz}
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <ProjectItem
                  title="Career Club"
                  description=" Проект «GASU Career Club» направлен на формирование представления о рынке труда у студентов, а также освещение траектории профессионального становления после окончания вуза.
                  Основными направлениями нашего развития являются конференции, интервью, подкасты, карьерный форум.  
                  "
                  image={career}
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <ProjectItem
                  title="Эко Туса"
                  description=" «Эко Туса» – проект об экологии, строительстве и архитектуре на стыке с экологией.
                  Наша цель – сделать экологию доступной и показать, как экология влияет на различные сферы деятельности в нашей жизни. 
                  "
                  image={ecoParty}
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <ProjectItem
                  title="Киноклуб"
                  description=" Основная задача данного проекта – коллективный просмотр и обсуждение кинофильмов, изучение киноискусства. Ежемесячно руководитель выбирает тематику месяца, в рамках которой и проходят показы. Перед началом просмотра зрителям рассказывают о режиссёре и произведении. 
                  "
                  image={filmClub}
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <ProjectItem
                  title="Квартирник"
                  description=" Проект организует концерты студентов СПбГАСУ, увлечённых музыкой. На его мероприятиях музыканты могут лучше узнать свою аудиторию, проверить материал, перебороть боязнь сцены. 
                  "
                  image={kvartirnik}
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <ProjectItem
                  title="Language Club"
                  description=" GASU Language Club – языковой клуб в СПбГАСУ, где можно совместить приятное с полезным – пообщаться на английском, французском и немецком языках во внеучебное время в тёплой обстановке. 
                  "
                  image={languageClub}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

import React from "react";

interface IPropsProjectItem {
  image: any;
  title: string;
  description: string;
  payload?: any;
}

const ProjectItem = (props: IPropsProjectItem) => {
  const { image, title, description, payload } = props;
  return (
    <>
      <section className="project__item flex flex-col items-start justify-between mb-10 ">
        <div className="project__item__img rounded-2xl">
          {/* {image} MUST be an src element, not an svg Componet or smth else */}
          <img src={image} className="rounded-2xl" />
        </div>

        <h4 className="project__item__title">{title}</h4>

        <p className="project__item__description xs:flex xs:items-start xs:justify-center  ">
          {description}
        </p>
      </section>
    </>
  );
};

export default ProjectItem;

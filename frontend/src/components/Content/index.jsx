import Laptop from "../../assets/laptop.png";
import Phone from "../../assets/phone.png";
import { AiOutlineShareAlt } from "react-icons/ai";
import { FiCopy, FiDownload } from "react-icons/fi";
import Card from "./Card";
import TitleAnimation from "./TitleAnimation";
import "./Content.css";

import { useNavigate } from "react-router-dom";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Content = () => {
  const navigate = useNavigate();

  const goApp = () => {
    navigate("/");
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <main className="main">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            collisions: {
              enable: true,
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 0.4,
            },
            number: {
              density: {
                enable: true,
                area: 1750,
              },
              value: 100,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 2, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <section className="intro">
        <article className="intro-text">
          <h1 className="intro-text__title">Learn from the best solutions</h1>
          <p className="intro-text__p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            laboriosam nulla molestias soluta amet ab natus aut corrupti odit
            quas doloribus dignissimos dicta similique consequuntur neque
            molestiae, totam cum nobis. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Voluptate maxime obcaecati iusto quae debitis
            suscipit at deleniti architecto labore dicta fugiat, atque aliquam
            id illum. Praesentium reprehenderit dolores asperiores officiis.
          </p>
          <button
            className="intro-text__button btn btn-animation"
            onClick={goApp}
          >
            Go to app
          </button>
        </article>
        <article className="intro-images">
          <img className="intro-images__phone" src={Phone} alt="Phone" />
          <img className="intro-images__laptop" src={Laptop} alt="Laptop" />
        </article>
      </section>
      <section className="features">
        <TitleAnimation title="Awesome features!" width={17} />
        <div className="row">
          <Card
            label="Share your code!"
            text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae omnis ipsa."
          >
            <AiOutlineShareAlt className="feature-icon" />
          </Card>
          <Card
            label="Copy"
            text="dolore fuga enim sed explicabo iusto nostrum cumque temporibus itaque nesciunt."
          >
            <FiCopy className="feature-icon" />
          </Card>
          <Card
            label="Download the code!"
            text="voluptate dolores ea atque ex. Ab, aut labore?."
          >
            <FiDownload className="feature-icon" />
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Content;

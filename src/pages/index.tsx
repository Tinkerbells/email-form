import { type NextPage } from "next";
import Title from "@/assets/images/title.png";
import TitleMobile from "@/assets/images/title-mobile.png";
import Form from "@/components/Form";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [src, setSrc] = useState("");
  useEffect(() => {
    if (window) {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setSrc(TitleMobile.src);
        } else {
          setSrc(Title.src);
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <main>
      <div className="flex flex-col items-center px-5 pt-8 font-wremena text-xl lowercase text-[#898988] sm:px-32 lg:text-3xl">
        <div>
          <span className="absolute left-0 ml-8">1</span>
          {src ? (
            <Image
              className="max-w-[300px] lg:max-w-[700px]"
              src={src}
              width={1000}
              height={100}
              alt="социальное исследование
в рамках выставки три миллиарда ватт"
            />
          ) : null}
        </div>
        <div className="mt-6 flex max-w-[940px] flex-col gap-8 px-5 text-center">
          <p>
            <span className="absolute left-0 ml-8">2</span>
            это исследование для выставки «Три миллиарда ватт». спасибо, что
            участвуете и делитесь своими ощущениями. 
          </p>
          <p>
            при ответах на вопросы просим вас трактовать понятие «любовь»
            широко: это не обязательно должна быть романтическая история.
          </p>
        </div>
        <div className="mt-16 flex flex-col items-center gap-7">
          <Form />
          <p className="text-center">
            <span className="absolute left-0 ml-8">4</span>
            благодарим за участие! <br />
            ищите свой ответ в онлайн-исследовании
          </p>
          <a
            className="group mb-20 flex h-14 w-96 items-center justify-center rounded-[37px] bg-[#BBBBBB]"
            href="https://instagram.com/tri_milliarda_vatt?igshid=YmMyMTA2M2Y="
          >
            <span className="delay-250 absolute transition ease-in group-hover:text-white">
              instagram
            </span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Home;

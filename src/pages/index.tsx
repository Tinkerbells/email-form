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
              src={src}
              width={1900}
              height={100}
              alt="социальное исследование
в рамках выставки три миллиарда ватт"
            />
          ) : null}
        </div>
        <div className="mt-4 flex max-w-[940px] flex-col gap-8 px-5 text-center">
          <p>
            <span className="absolute left-0 ml-8">2</span>
            Любовь — это энергия, которая проходит сквозь нашу жизнь, делая
            любые места, вещи, слова и события особенными.{" "}
          </p>
          <p>
            Попкультура предлагает много символов любви, но мы уверены, что
            реальная жизнь предлагает гораздо больше. Мы хотим вместе с вами
            изучить настоящие артефакты любви.
          </p>
          <p>
            При ответах на вопросы просим вас трактовать понятие «любовь»
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
            className="group mb-20 flex h-14 w-96 items-center justify-center rounded-[37px] "
            href="https://instagram.com/tri_milliarda_vatt?igshid=YmMyMTA2M2Y="
          >
            <div className="delay-250 z-[-1] h-full w-full rounded-[37px] border-2 shadow-[0_4px_4px_4px_rgba(0,0,0,0.83)] blur-[6px] transition ease-in group-hover:bg-[#BBBBBB]"></div>
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

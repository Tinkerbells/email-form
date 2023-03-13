import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ExampleImages from "./ExampleImages";
import Input from "./Input";
import { LinkIcon } from "./LinkIcon";
const Form = () => {
  const { register, handleSubmit } = useForm();
  const [buttonText, setButtonText] = useState<string>("отправить");
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const length = files?.length || 0;
    if (length < 5)
      if (e.target) {
        const { files } = e.target;
        if (files) {
          if (files.length > 5) {
            alert("Маск кол-во файлов 5.");
            e.preventDefault();
            return;
          }
          const limit = 5 - length;
          for (let i = 0; i < limit; i++) {
            const file = files[i];
            if (file) {
              setFiles((prev) => [...prev, file]);
              setImages((prev) => [...prev, URL.createObjectURL(file)]);
            }
          }
        }
      }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("gender", data.gender);
    formData.append("age", data.age);
    formData.append("loveWord", data.loveWord);
    formData.append("geoLink", data.geoLink);
    formData.append("geoDesc", data.geoDesc);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append(files[i]?.name!, files[i]!);
      }
      console.log(formData, files);
      try {
        const response = await axios.post("/api/send", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setButtonText("ответ записан!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (files) {
      console.log(files);
    }
  }, [files]);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <form
      className="mt-6 flex w-full flex-col items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="absolute left-0 ml-8">3</span>
      <Input name="gender" label="ваш пол" register={register} />
      <Input name="age" label="ваш возраст" type="number" register={register} />
      <Input
        name="loveWord"
        label="Напишите одно слово-ассоциацию со словом «любовь»"
        register={register}
      />
      <Input
        name="geoLink"
        label="Пришлите геолокацию места, которое связано для вас с чувством любви. Для этого в любых картах нужно найти это место и нажать «поделиться»"
        register={register}
      />
      <Input
        name="geoDesc"
        label="расскажите, что связано с этим местом"
        register={register}
      />
      <button
        className="flex w-full flex-col items-center gap-2 border-b-2 border-[#B4B4B4]"
        type="button"
        onClick={handleUploadClick}
      >
        <p className="max-w-[850px] text-center lowercase">
          Пришлите фотографию/и вашего проводника любви: предмета, с которым у
          вас связаны важные ассоциации <br />
          (не более 5)
        </p>
        <div className="m-3 place-self-end">
          <LinkIcon />
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
        {images ? (
          <div className="mb-2">
            <div className="grid max-w-[700px] grid-cols-5 items-center gap-2 object-contain">
              {images.map((image) => (
                <div key={image} className="h-full">
                  <Image
                    src={image}
                    alt="Ваша картинка"
                    className="h-auto max-w-full"
                    width={200}
                    height={200}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </button>
      <ExampleImages />
      <button
        className="group mb-20 flex h-14 w-96 items-center justify-center rounded-[37px] "
        type="submit"
      >
        <div className="delay-250 z-[-1] h-full w-full rounded-[37px] border-2 shadow-[0_4px_4px_4px_rgba(0,0,0,0.83)] blur-[6px] transition ease-in group-hover:bg-[#BBBBBB]"></div>
        <span className="delay-250 absolute transition ease-in group-hover:text-white">
          {buttonText}
        </span>
      </button>
    </form>
  );
};

export default Form;

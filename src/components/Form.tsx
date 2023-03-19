import { env } from "@/env.mjs";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CloseIcon } from "./CloseIcon";
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
    e.preventDefault();
    const length = files?.length || 0;
    if (length < 5)
      if (e.target) {
        const { files } = e.target;
        if (files) {
          if (files.length > 5) {
            alert("Маск кол-во файлов 5.");
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
  const handleDeleteImage = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const newFiles = files.filter((_, i) => i != index);
    const newImages = images.filter((_, i) => i != index);
    setFiles(newFiles);
    setImages(newImages);
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
      try {
        setButtonText("отправка...");
        const response = await axios.post(
          "https://email-form-back.vercel.app/v1/send-form",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setButtonText("ответ записан!");
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <form
      className="mt-6 flex w-full flex-col items-center gap-24"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="absolute left-0 ml-2 lg:ml-8">3</span>
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
      <div className="flex w-full flex-col items-center gap-2 border-b-2 border-[#B4B4B4]">
        <button type="button" onClick={handleUploadClick} className="flex">
          <p className="max-w-[850px] text-center lowercase">
            Пришлите фотографию/и вашего проводника любви: предмета, с которым у
            вас связаны важные ассоциации <br />
            (объем всех не болле 5мб)
          </p>
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </button>
        <div className="flex w-full items-center justify-between">
          {images ? (
            <div className="mb-2">
              <div className="flex max-w-[900px] items-center gap-2 object-contain">
                {images.map((image, index) => (
                  <div key={image} className="relative m-2 mt-8 h-full">
                    <button
                      type="button"
                      className="group absolute -right-5 -top-5 h-8 w-8 rounded-full bg-[#BBBBBB] p-2"
                      onClick={(e) => handleDeleteImage(index, e)}
                    >
                      <CloseIcon className="delay-250 h-full w-full fill-black transition ease-in group-hover:fill-white" />
                    </button>
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
          <button
            className="my-4 mr-2 place-self-end"
            type="button"
            onClick={handleUploadClick}
          >
            <LinkIcon />
          </button>
        </div>
      </div>
      <ExampleImages />
      <button
        className="group mb-20 flex h-14 w-96 items-center justify-center rounded-[37px] bg-[#BBBBBB]"
        type="submit"
      >
        <span className="delay-250 absolute transition ease-in group-hover:text-white">
          {buttonText}
        </span>
      </button>
    </form>
  );
};

export default Form;

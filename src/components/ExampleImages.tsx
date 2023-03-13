import Image from "next/image";
import Example from "../assets/images/example.png";
import Example2 from "../assets/images/example2.png";
import Example3 from "../assets/images/example3.png";
import Example4 from "../assets/images/example4.png";
const ExampleImages = () => {
  return (
    <div className="flex flex-col items-center">
      <p>пример съёмки:</p>
      <div className="grid max-w-[700px] grid-cols-4 items-center object-contain">
        <div>
          <Image
            src={Example.src}
            alt="Пример 1"
            className="h-auto max-w-full"
            width={200}
            height={200}
          />
        </div>
        <div>
          <Image
            src={Example2.src}
            alt="Пример 2"
            className="h-auto max-w-full"
            width={200}
            height={200}
          />
        </div>
        <div>
          <Image
            src={Example3.src}
            alt="Пример 3"
            className="h-auto max-w-full"
            width={200}
            height={200}
          />
        </div>
        <div>
          <Image
            src={Example4.src}
            alt="Пример 4"
            className="h-auto max-w-full"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default ExampleImages;

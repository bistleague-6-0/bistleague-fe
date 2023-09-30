import Register from "./components/Register";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <>
      {/* <div className="h-screen aspect-[498/540] w-1/2 hidden xl:block fixed">
        <Image
          src="/images/register/register-web.svg"
          fill={true}
          alt="BIST League 6.0"
          className="object-cover w-[80%] h-full"
        />
      </div> */}

      {/* <div className="bg-[#F3EEE7] lg:bg-white h-screen px-9 py-12 lg:flex lg:flex-col lg:items-center lg:justify-center xl:items-end">
        <Register />
      </div> */}

      <div className=" flex gap-14 lg:h-screen">
        <Image
          src="/images/register/register-web.svg"
          width={200}
          height={540}
          alt="BIST League 6.0"
          className="object-cover w-[50%] h-screen hidden lg:block"
        />
        <Register />
      </div>
    </>
  );
}

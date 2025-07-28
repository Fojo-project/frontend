import Image from "next/image";
import {DownloadIcon,ShareIcon} from "../../../assets/icons"



interface CertificateProps {
  name: string;
  text: string;
  presidentName: string;
  generalName: string;
}

const Certificate = ({ name, text, presidentName, generalName }: CertificateProps) => {
  return (
    <div className="mt-20">
      <div className="relative w-full h-[650px] mx-auto font-open-sans bg-white overflow-hidden rounded-xl shadow">
        <Image
          src="/images/course/certificate.png"
          alt="Certificate Frame"
          layout="fill"
          objectFit="cover"
          priority
        />

       <div className="absolute inset-0 lg:px-30 pt-20 pb-20 text-center flex flex-col items-center justify-between">

          <div>
            <p className="uppercase text-xs  tracking-wider mb-12 mt-30 text-gray-700">
              This Certificate is Proudly Presented To
            </p>
            <div className="relative">
              <h1 className="text-5xl font-[500]  font-parisienne leading-none">
                {name}
              </h1>
              <div className="h-[1px] w-[80%] mb-7 bg-black mx-auto mt-2" />
            </div>
            <p className="text-xs max-w-[90%] mx-auto mb-10 leading-relaxed text-gray-600">
              {text}
            </p>
          </div>

          <div className="w-full flex mb-10 md:gap-22 items-end px-10">
            <div className="text-xs space-y-1 text-center">
              <Image
                src="/images/course/president_Signature.png"
                alt="President Signature"
                width={120}
                height={40}
                className="mx-auto mb-8"
              />
              <div className="border-t-2 border-black w-35 md:w-40 mx-auto">
                <p className="font-semibold text-[14px] -mt-5 font-open-sans tracking-widest">{presidentName}</p>
              </div>
              <p className="tracking-widest">President Director</p>
            </div>

            <div className="flex flex-col items-center text-xs space-y-1">
              <div className="text-xs space-y-1 text-center">
            <Image
              src="/images/home/FojoLogo.png"
              alt="FOJO Logo"
              width={120}
              height={60}
            />
              </div>
            </div>

            <div className="text-xs space-y-1 text-center">
              <Image
                  src="/images/course/general_signature.png"
                alt="General Manager Signature"
                width={100}
                height={40}
                className="mx-auto mb-6"
              />
              <div className="border-t-2 border-black mb-1 w-30 md:w-40 mx-auto">
                <p className="font-semibold pb-2 text-[14px]  font-[16px] -mt-5 tracking-widest">{generalName}</p>
              </div>
              <p className="tracking-widest">General Manager</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
       <button className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 transition flex items-center gap-2">
    Download Certificate
    <DownloadIcon  width={20} height={20} />
  </button>
        <button className="bg-black text-white px-3 py-2 rounded-md text-sm hover:bg-gray-800 transition flex items-center gap-2">
          Share
          <ShareIcon  width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default Certificate;

"use client";

import Image from "next/image";
import { DownloadIcon, ShareIcon,WhatsappIcon } from "../../../assets/icons";
import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";

interface CertificateProps {
  name: string;
  text: string;
  presidentName: string;
  generalName: string;
}

const Certificate = ({
  name,
  text,
  presidentName,
  generalName,
}: CertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  const handleDownloadCertificate = async () => {
    if (certificateRef.current) {
      const dataUrl = await htmlToImage.toPng(certificateRef.current);
      const link = document.createElement("a");
      link.download = `${name}_certificate.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const handleShareClick = () => {
    setShowWhatsapp((prev) => !prev);
  };

  const handleWhatsappShare = () => {
    const shareText = `I just earned a certificate! 🏆\n\nCertificate: ${name}`;
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="mt-20">
      {/* Certificate Frame */}
      <div
        ref={certificateRef}
        className="relative h-[650px] mx-auto font-open-sans bg-white overflow-hidden rounded-xl shadow"
      >
        <Image
          src="/images/course/certificate.png"
          alt="Certificate Frame"
          layout="fill"
          priority
        />
        <div className="absolute inset-0 lg:px-20 pt-20 pb-20 text-center flex flex-col items-center justify-between">
          <div>
            <p className="uppercase text-xs tracking-wider mb-12 mt-30 text-gray-700">
              This Certificate is Proudly Presented To
            </p>
            <div className="relative">
              <h1 className="text-5xl font-[500] font-parisienne leading-none">
                {name}
              </h1>
              <div className="h-[1px] w-[80%] bg-black mx-auto mt-2" />
            </div>
            <p className="text-xs max-w-[90%] mt-8 mx-auto mb-10 leading-relaxed text-gray-600">
              {text}
            </p>
          </div>

          <div className="w-full flex mb-10 gap-24 items-end px-10">
            {/* President */}
            <div className="text-xs space-y-1 text-center">
              <Image
                src="/images/course/president-signature.svg"
                alt="President Signature"
                width={120}
                height={40}
                className="mx-auto mb-8"
              />
              <div className="border-t-2 border-black w-35 md:w-40 mx-auto">
                <p className="font-semibold text-[14px] -mt-5 font-open-sans tracking-widest">
                  {presidentName}
                </p>
              </div>
              <p className="tracking-widest">President Director</p>
            </div>

            {/* Logo */}
            <div className="flex flex-col items-center text-xs space-y-1">
              <div className="text-xs space-y-1 text-center">
                <Image
                  src="/images/course/church-logo.svg"
                  alt="FOJO Logo"
                  width={90}
                  height={60}
                />
              </div>
            </div>

            {/* General Manager */}
            <div className="text-xs space-y-1 text-center">
              <Image
                src="/images/course/general-signature.svg"
                alt="General Manager Signature"
                width={100}
                height={40}
                className="mx-auto mb-6"
              />
              <div className="border-t-2 border-black mb-1 w-30 md:w-40 mx-auto">
                <p className="font-semibold pb-2 text-[14px] -mt-5 tracking-widest">
                  {generalName}
                </p>
              </div>
              <p className="tracking-widest">General Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6 items-center">
        <button
          onClick={handleDownloadCertificate}
          className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 transition flex items-center gap-2"
        >
          Download Certificate
          <DownloadIcon width={20} height={20} />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareClick}
            className="bg-black text-white px-3 py-2 rounded-md text-sm hover:bg-gray-800 transition flex items-center gap-2"
          >
            Share
            <ShareIcon width={20} height={20} />
          </button>

         {showWhatsapp && (
  <button
    onClick={handleWhatsappShare}
    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
  >
        <WhatsappIcon width={20} height={20} />
  </button>
)}

        </div>
      </div>
    </div>
  );
};

export default Certificate;

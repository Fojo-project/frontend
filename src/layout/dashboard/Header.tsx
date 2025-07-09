import React from 'react';

interface HeaderProps {
  Heading: string;
}
export default function Header({ Heading }: HeaderProps) {
  return (
    <div className="font-lora text-[28px] font-semibold dark:text-white text-gray-800">
      <h3>{Heading}</h3>
    </div>
  );
}

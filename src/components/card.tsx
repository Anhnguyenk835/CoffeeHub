import React from "react"

interface CardProps {
    header: string;
    text: string;
    icon: React.ReactNode;
}


const Card: React.FC<CardProps> = ({ header, text, icon }) => {
  return (
    <div className='bg-white shadow-sm p-6 rounded-lg h-full'>
        <div className='flex'>
            {icon}
            <h2 className='text-xl font-bold ml-2'>{header}</h2>
        </div>
        <p className='text-[#4B5563] text-sm'>{text}</p>
      
    </div>
  );
};

export default Card;
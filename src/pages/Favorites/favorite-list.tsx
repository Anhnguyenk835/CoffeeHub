import React from 'react';
import Sidebar from '../../components/sidebar';
import { Link } from 'react-router-dom';

import { ExternalLink, MapPin, Phone, Clock, Star } from "lucide-react"

const FavoriteList: React.FC = () => {
    return (
        <div className='flex min-h-screen bg-[#F9FAFB]'>
            <Sidebar />

            <main className='flex-1 p-6 overflow-auto'>
                <div className='flex justify-end w-full'>
                    <button className='bg-[#ADC178] rounded-full text-white font-medium py-3 px-6 active:scale-[.98] hover:scale-[1.01] shadow-md'>Back</button>
                </div>

                <div className='mx-auto mt-6'>
                    <h1 className="text-3xl font-extrabold text-center my-2">Chạy deadline</h1>
                    <p className='text-center text-[#4B5563] mb-6'>Type in your description</p>
                    
                    <div className='grid grid-cols-3 gap-6 mt-10'>
                        <ListItemCard 
                            name='Trung Nguyen Coffee'
                            location='67 Hai Ba Trung'
                            contact='0123456789'
                            openingHours='6AM - 10PM'
                            tags={['Specialty Coffee', 'Workspace']}
                            rating={5}
                            hasImage={true}
                            image='/images/trung-nguyen.png'
                        />
                        
                    </div>  
                </div>
            </main>
        </div>
    )
}

export default FavoriteList;


interface ListItemProps {
    name: string;
    location: string;
    contact: string;
    openingHours: string;
    tags: string[];
    rating: number;
    hasImage: boolean;
    image: string;
}

const ListItemCard: React.FC<ListItemProps> = ({ name, location, contact, openingHours, tags, rating, hasImage, image }) => {
  return (
    <Link to='/favorite-list' className='bg-white shadow-sm rounded-3xl h-full border border-[#d9d9d9] overflow-hidden'>
        {hasImage ? (
            <div className="h-48 relative">
                <img src={image} alt={name} className="w-full h-full object-cover" />
                <div className='absolute top-3 right-3 bg-white font-semibold text-sm rounded-full py-1 px-3 shadow-md'>
                    <div className='flex space-x-1'>
                        <div>
                            {<Star size={16} />}
                        </div>
                        
                        <div>
                            {rating}
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        ) : (
            <div className="h-48 bg-[#d9d9d9]/30 flex items-center justify-center relative">
                <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImNoZWNrZXJib2FyZCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj48cGF0aCBmaWxsPSIjZjBmMGYwIiBkPSJNMCAwaDEwdjEwSDB6TTEwIDEwaDEwdjEwSDEweiIvPjxwYXRoIGZpbGw9IiNlNmU2ZTYiIGQ9Ik0xMCAwaDEwdjEwSDEwek0wIDEwaDEwdjEwSDB6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NoZWNrZXJib2FyZCkiLz48L3N2Zz4=')]">
                </div>
            </div>
        )}

        <div className='p-4'>
            <h2 className='text-lg font-bold mb-3'>{name}</h2>
            
            <div className='flex items-center space-x-2 text-[#4B5563] text-sm mb-1'> 
                <MapPin size={16} />
                <p>{location}</p>
            </div>

            <div className='flex items-center space-x-2 text-[#4B5563] text-sm mb-1'> 
                <Phone size={16} />
                <p>{contact}</p>
            </div>

            <div className='flex items-center space-x-2 text-[#4B5563] text-sm mb-1'> 
                <Clock size={16} />
                <p>{openingHours}</p>
            </div>

            <div>
                {tags.map((tag, index) => (
                    <span key={index} className='text-[#6C584C] bg-[#ADC178] bg-opacity-15 text-xs px-2 py-1 mr-2 rounded-full'>
                        {tag}
                    </span>
                ))}
            </div>

            <Link to='' className='flex bg-[#ADC178] rounded-lg p-2 mt-4 justify-center'>
                <ExternalLink size='16' />
                View Details
            </Link>

        </div>
                
    </Link>
  );
};
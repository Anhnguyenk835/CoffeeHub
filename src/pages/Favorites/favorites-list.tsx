import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { getPlaces, CoffeeShop } from '../../lib/api'

import { ExternalLink, MapPin, Phone, Clock, Star } from "lucide-react"

const FavoritesList: React.FC = () => {
    const [description, setDescription] = useState('Type in your description');
    const [isEditing, setIsEditing] = useState(false);

    const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
        
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    }
    
    const handleBlur = () => {
        setIsEditing(false);
    }

    const navigate = useNavigate();

    const handleViewDetails = (id: string) => {
        navigate(`/detail/${id}`);
    }

    const handleBack = () => {
        navigate('../favorites')
    }

    useEffect(() => {
        const fetchCoffeeShops = async () => {
            try {
                const data = await getPlaces();
                setCoffeeShops(data);
            } catch (err) {
                setError('Eror fetching coffee shops data');
                console.error(err);
            } finally {
                setLoading(false);
            }
            
        };

        fetchCoffeeShops();
    }, []);

    const handleCafeClick = (id: string) => {
        navigate(`/detail/${id}`);
    };

    return (
        <div className='flex min-h-screen bg-[#F9FAFB]'>
            <Sidebar />

            <main className='flex-1 p-6 overflow-auto'>
                <div className='flex justify-end w-full'>
                    <button 
                    onClick={handleBack}
                    className='bg-[#ADC178] rounded-full text-white font-medium py-3 px-6 active:scale-[.98] hover:scale-[1.01] shadow-md'>Back</button>
                </div>

                <div className='mx-auto mt-6'>
                    <h1 className="text-3xl font-extrabold text-center my-2">Chạy deadline</h1>

                    {isEditing ? (
                        <input
                            className='text-center mx-auto w-full outline-none p-2 rounded-lg bg-transparent'
                            type='text'
                            value={description}
                            onChange={handleDescriptionChange}
                            onBlur={handleBlur}
                            autoFocus
                        />
                    ) : (
                        <p 
                        onClick={handleToggleEdit} 
                        style={{ cursor:'pointer', color:'grey'}}
                        className='text-center text-[#4B5563] mb-6'>
                            {description}
                        </p>
                    )}
                    
                    <div className='grid grid-cols-3 gap-6 mt-10'>
                        {coffeeShops.map((shop) => (
                            <ListItemCard 
                                id={shop.place_id}
                                name={shop.place_name}
                                address={shop.place_address}
                                hasImage={Boolean(shop.thumbnail)}
                                image={shop.thumbnail}
                                contact={shop.phone}
                                // openingHours={shop.hours}
                                tags={shop.type}
                                rating={shop.rating}
                                handleViewDetails={() => handleViewDetails(shop.place_id)}
                            />
                        ))}

                        
                        
                    </div>  
                </div>
            </main>
        </div>
    )
}

export default FavoritesList;

interface ListItemProps {
    id: string;
    name: string;
    address: string;
    contact?: string;
    openingHours?: string;
    tags?: string[];
    rating?: number;
    hasImage: boolean;
    image?: string;
    type?: string[];
    handleViewDetails: (id: string) => void;
}

const ListItemCard: React.FC<ListItemProps> = ({ id, name, address, contact, openingHours, tags, rating, hasImage, image, handleViewDetails }) => {
    return (
    <Link to='/favorites/list' className='flex flex-col justify-between bg-white shadow-sm rounded-3xl h-full border border-[#d9d9d9] overflow-hidden'>
        <div> 
            {hasImage ? (
                <div className="h-48 relative">
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                    <div className='absolute top-3 right-3 bg-white font-semibold text-sm rounded-full py-1 px-3 shadow-md'>
                        <div className='flex space-x-1 items-center'>
                            <div>
                                <Star className='w-4 h-4 text-yellow-400 fill-current' />
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
                
                {   
                    address &&
                    <div className='flex items-start space-x-2 text-[#4B5563] text-sm mb-1'> 
                        <div className='bg-pink'>
                            <MapPin size={16} />
                        </div>
                        
                        <p>{address}</p>
                    </div>
                }   

                {   
                    contact && 
                    <div className='flex items-center space-x-2 text-[#4B5563] text-sm mb-1'> 
                        <div className='bg-pink'>
                            <Phone size={16} />
                        </div>

                        <p>{contact}</p>
                    </div>
                }
                

                {   
                    openingHours && 
                    <div className='flex items-center space-x-2 text-[#4B5563] text-sm mb-2'> 
                        <div className='bg-pink'>
                            <Clock size={16} />
                        </div>

                        <p>{openingHours}</p>
                    </div>  
                }

                <div className='flex flex-wrap gap-2 mt-4'>
                    {tags && tags.map((tag, index) => (
                        <span key={index} className='text-[#6C584C] bg-[#ADC178] bg-opacity-15 text-xs px-2 py-1  rounded-full'>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        <div className='mx-4 mb-4 mt-1'>
            <button 
                onClick={() => handleViewDetails(id)}
                className='flex bg-[#ADC178] rounded-lg p-2 justify-center items-center w-full gap-2 hover:bg-[#adc178]/90'>
                <ExternalLink size='16' />
                View Details
            </button>
        </div>
        

            {/* <Link to='' className='flex bg-[#ADC178] rounded-lg p-2 mt-4 justify-center'>
                <ExternalLink size='16' />
                View Details
            </Link> */}

        
                
    </Link>
  );
};
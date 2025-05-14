import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import { Link, useNavigate } from 'react-router-dom';

import { List, ChevronRight, Coffee } from "lucide-react"

const Favorites: React.FC = () => {
    

    return (
        <div className='flex min-h-screen bg-[#F9FAFB]'>
            <Sidebar />

            <main className='flex-1 p-6 overflow-auto'>
                <CreateListButton />

                <div className='mx-auto mt-6'>
                    <h1 className="text-3xl font-extrabold text-center my-2">Your Favorite Coffee Spots</h1>
                    <p className='text-center text-[#4B5563] mb-6'>Discover and manage your collections of beloved cafes</p>
                    
                    <div className='grid grid-cols-3 gap-6 mt-10'>
                        <ListCard 
                            name='Chạy deadline'
                            nShops={5}
                            hasThumbnail={true}
                            thumbnail='/images/the-coffee-house.png'

                        />

                        <ListCard 
                            name='Chạy deadline'
                            nShops={6}
                            hasThumbnail={true}
                            thumbnail='/images/trung-nguyen.png'

                        />

                        <ListCard 
                            name='Chạy deadline'
                            nShops={5}
                            hasThumbnail={true}
                            thumbnail='/images/trung-nguyen.png'

                        />

                        <ListCard 
                            name='Chạy deadline'
                            nShops={5}
                            hasThumbnail={true}
                            thumbnail='/images/trung-nguyen.png'

                        />

                        
                    </div>  
                </div>
            </main>
        </div>
    )
}

export default Favorites;


interface ListProps {
    name: string;
        nShops: number;
        hasThumbnail: boolean;
        thumbnail: string;
}


const ListCard: React.FC<ListProps> = ({ name, nShops, hasThumbnail, thumbnail }) => {
  return (
    <Link to='/favorites/list' className='bg-white shadow-sm rounded-3xl h-full border border-[#d9d9d9] overflow-hidden'>
        {hasThumbnail ? (
            <div className="h-48 relative">
                <img src={thumbnail} alt={name} className="w-full h-full object-cover" />
                <div className='absolute top-3 right-3 bg-white font-semibold text-sm rounded-full py-1 px-3 shadow-md'>
                    <div className='flex space-x-1'>
                        <div>
                            {<Coffee size={16} />}
                        </div>
                        
                        <div>
                            {nShops}
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
            <div className='flex items-center'>
                <div className='flex items-center'>
                    {<List size={18} />}
                    <h2 className='font-bold ml-2'>{name}</h2>
                </div>
                <div className='flex flex-1 items-center justify-end text-[#ADC178]'>
                    {<ChevronRight size={18} strokeWidth={2.5}/>}
                </div>
                
            </div>    
        </div>
                
    </Link>
  );
};

const CreateListButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listName, setListName] = useState('');

    const handleConfirm = () => {
        console.log('New List:', listName);
        // send list name back to db
        setIsModalOpen(false);
        setListName('');
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setListName('');
    }

    return (
        <div className='flex justify-end w-full'>
            <button 
                onClick={() => setIsModalOpen(true)}
                className='bg-[#ADC178] rounded-full text-white font-medium py-3 px-6 active:scale-[.98] hover:scale-[1.01] shadow-md'
            >

                Create new list
            </button>

            {isModalOpen && (
                <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
                    <div className='bg-white rounded-2xl shadow-lg p-6 w-80 space-y-4'>
                        <h2 className='text-center text-lg font-bold'>Enter list name</h2>
                        <input 
                            type='text'
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            className='w-full border rounded-md px-3 py-2'
                            placeholder='e.g. Cafe Q5'
                        />

                        <div className='flex justify-center space-x-4'>
                            <button
                                onClick={handleConfirm}
                                className='px-4 py-2 bg-[#ADC178] text-white rounded-md hover:bg-[#99ab6a] text-sm'
                            >
                                Confirm
                            </button>

                            <button
                                onClick={handleCancel}
                                className='px-4 py-2 bg-[#6C584C]/60 text-white rounded-md hover:bg-[#52433a]/60 text-sm'
                            >
                                Cancel
                            </button>

                        </div>



                    </div>

                </div>

            )}
        </div>
    );
}
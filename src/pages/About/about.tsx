import React from 'react';
import Sidebar from '../../components/sidebar';
import { Coffee, MessageCircle, Heart, UsersRound } from "lucide-react"

const About: React.FC = () => {
    return (
        <div className='flex min-h-screen bg-[#F9FAFB]'>
            <Sidebar />

            <main className='flex-1 p-6 overflow-auto'>
                <div className='w-[640px] mx-auto'>
                    <h1 className="text-3xl font-extrabold text-center my-2">About CoffeeChat</h1>
                    <p className='text-center text-[#4B5563] mb-6'>A cozy place for coffee lovers to connect and share</p>

                    <div className='bg-white shadow-sm p-6 rounded-lg'>
                        <div className='flex'>
                            <Coffee size={20} />
                            <h2 className='text-xl font-bold ml-2'>Our Mission</h2>
                        </div>
                        
                        <p className='text-[#4B5563] text-sm'> CoffeeChat was created with a simple yet powerful vision: to bring coffee enthusiasts together in a space where they can share their passion, discover new coffee experiences, and build meaningful connections over their favorite brew.</p>
                    </div>

                    <div className="flex my-4">
                        <div className="flex-1 bg-white rounded-lg shadow-sm p-6 ">
                            <div className='flex'>
                                <MessageCircle size={20} />
                                <h2 className='text-xl font-bold ml-2'>Connect</h2>
                            </div>  
                            
                            <p className='text-[#4B5563] text-sm'> Join discussions about coffee brewing methods, beans, and cafe recommendations.</p>
                        </div>
                        <div className="flex-1 bg-white rounded-lg shadow-sm p-6 mx-4">
                            <div className='flex'>
                                <Heart size={20} />
                                <h2 className='text-xl font-bold ml-2'>Share</h2>
                            </div>  

                            <p className='text-[#4B5563] text-sm'> Share your favorite coffee spots and experiences with fellow enthusiasts. </p>
                        </div>
                        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
                            <div className='flex'>
                                    <Coffee size={20} />
                                    <h2 className='text-xl font-bold ml-2'>Discover</h2>
                            </div>  
                            
                            <p className='text-[#4B5563] text-sm'> Explore new coffee varieties and brewing techniques from around the world. </p>
                        </div>
                    </div>

                    <div className='bg-white shadow-sm p-6 rounded-lg'>
                        <div className='flex'>
                            <UsersRound size={20} />
                            <h2 className='text-xl font-bold ml-2'>Our Team</h2>
                        </div>  
                        
                        <p className='text-[#4B5563] text-sm'> We're a passionate team of coffee lovers and developers working together to create the best possible platform for coffee enthusiasts. Our diverse backgrounds and shared love for coffee drive us to continuously improve and expand CoffeeChat.</p>
                    </div>

                    <p className='text-[#6B7280] text-sm text-center mt-8'>© 2025 CoffeeChat. All rights reserved.</p>

                </div>
                
            </main>
            
        </div>
    )
}

export default About;

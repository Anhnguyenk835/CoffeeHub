import React from 'react';
import Sidebar from '../../components/sidebar';
import Card from '../../components/card';

import { Coffee, MessageCircle, Heart, UsersRound } from "lucide-react"

const About: React.FC = () => {
    return (
        <div className='flex min-h-screen bg-[#F9FAFB]'>
            <Sidebar />

            <main className='flex-1 p-6 overflow-auto'>
                <div className='w-[70%] mx-auto'>
                    <h1 className="text-3xl font-extrabold text-center my-2">About CoffeeChat</h1>
                    <p className='text-center text-[#4B5563] mb-6'>A cozy place for coffee lovers to connect and share</p>
                    
                    <div className='flex flex-col space-y-2'>
                        <Card 
                            header="Our Mission" 
                            text="CoffeeChat was created with a simple yet powerful vision: to bring coffee enthusiasts together in a space where they can share their passion, discover new coffee experiences, and build meaningful connections over their favorite brew." 
                            icon={<Coffee size={20} />} 
                        />
                        
                        <div className="flex space-x-4 overflow-auto py-2">
                            <div className="flex-1">
                                <Card 
                                    header="Connect" 
                                    text="Join discussions about coffee brewing methods, beans, and cafe recommendations." 
                                    icon={<MessageCircle size={20} />} 
                                />
                            </div>

                            <div className="flex-1">
                                <Card 
                                    header="Share" 
                                    text="Share your favorite coffee spots and experiences with fellow enthusiasts." 
                                    icon={<Heart size={20} />} 
                                />
                            </div>

                            <div className="flex-1">
                                <Card 
                                    header="Discover" 
                                    text="Explore new coffee varieties and brewing techniques from around the world." 
                                    icon={<Coffee size={20} />} 
                                />
                            </div>
                        </div>

                        <Card 
                            header="Our Team" 
                            text="We're a passionate team of coffee lovers and developers working together to create the best possible platform for coffee enthusiasts. Our diverse backgrounds and shared love for coffee drive us to continuously improve and expand CoffeeChat." 
                            icon={<UsersRound size={20} />} 
                        />
                    </div>  
    
                    <p className='text-[#6B7280] text-sm text-center mt-8'>© 2025 CoffeeChat. All rights reserved.</p>

                </div>
            </main>
        </div>
    )
}

export default About;

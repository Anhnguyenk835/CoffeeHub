import React from 'react';
import Sidebar from "../../components/sidebar"
import { Link } from 'react-router-dom';

const ResetPassword: React.FC = () => {
    return (
        <div className='flex min-h-screen'> 
            <Sidebar />
            <main className='flex-1 p-6 overflow-auto mt-[110px]'>
                <div className='w-[400px] mx-auto'>
                    <h1 className='text-center font-extrabold text-3xl text-[#6C584C]'>Reset Your Password</h1>
                    <p className='text-center text-sm text-[#6C584C] mt-3'>Enter the email associated with your account and we'll send you password instructions.</p>
                    <div className='mt-6 mx-auto'>
                        <div>
                            <label className='font-medium text-[#6C584C]'>Email</label>
                            <input
                                className='w-full pl-6 py-3 rounded-full shadow-sm border-[1px] border-[#D9D9D9] bg-transparent mt-2'
                                placeholder='abc123@gmail.com'
                            />
                        </div>
                        
                        <div className='flex mt-7'>
                            <button className='bg-[#ADC178] rounded-full text-white text-center font-medium p-2 w-[100px] active:scale-[.98] mx-auto'>Continue</button>
                        </div>

                        <div className='text-center mt-8'>
                            <Link
                                to="/login"
                                className="flex-1 font-medium text-[#6C584C] text-right text-sm"
                                >
                                Return to Log In
                            </Link>
                        </div>
                    </div>
                </div>
                

                



            </main>
        </div>
    )
}

export default ResetPassword;
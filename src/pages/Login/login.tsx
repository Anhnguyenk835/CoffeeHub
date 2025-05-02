import React from 'react';
import Sidebar from "../../components/sidebar"
import { Link } from 'react-router-dom';
import '../../index.css'

const Login: React.FC = () => {
    return (
        <div className='flex min-h-screen bg-[#F9FAFB]'>
            <Sidebar />
            <main className='flex-1 p-6 overflow-auto mt-[110px]'>
                <h1 className='text-center font-extrabold text-3xl text-[#6C584C]'>Welcome!</h1>
                <div className='mt-6 w-[400px] mx-auto'>
                    <div>
                        <label className='font-medium text-[#6C584C]'>Email</label>
                        <input
                            className='w-full pl-6 py-3 rounded-full shadow-sm border-[1px] border-[#D9D9D9] bg-transparent mt-2'
                            placeholder='abc123@gmail.com'
                        />
                    </div>

                    <div className='mt-4'>
                        <div className='flex'>
                            <label className='flex-1 font-medium text-[#6C584C]'>Password</label>
                            <Link
                                to="/reset-password"
                                className="flex-1 font-medium text-[#6C584C] text-right text-sm"
                                >
                                Reset password
                            </Link>
                        </div>
                        
                        <input
                            className='w-full pl-6 py-3 rounded-full shadow-sm border-[1px] border-[#D9D9D9] bg-transparent mt-2'
                            placeholder='*********'
                            type='password'
                        />
                    </div>
                    
                    <div className='flex mt-7'>
                        <button className='bg-[#ADC178] rounded-full text-white text-center font-medium p-2 w-[100px] active:scale-[.98] hover:scale-[1.01] mx-auto'>Log in</button>
                    </div>

                    <div className='text-center mt-10'>
                        <label className='mr-1 text-[#6C584C]'>Don't have an account?</label>
                        <Link
                            to="/register"
                            className="text-[#ADC178]"
                            >
                            Register
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Login;

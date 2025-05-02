import React, { useState } from 'react';
import Sidebar from "../../components/sidebar"
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <main className='flex-1 p-6 overflow-auto mt-[70px]'>
                <div className='w-[400px] mx-auto'>
                    <h1 className='text-center font-extrabold text-3xl text-[#6C584C]'>Sign Up</h1>
                    <p className='text-center text-sm text-[#6C584C] mt-3'>Sign up to continue.</p>
                    <div className='mt-6 mx-auto'>
                        <SignupForm />
                        

                        <div className='text-center mt-8'>
                            <label className='mr-1 text-[#6C584C]'>Already have an account?</label>
                            <Link
                                to="/login"
                                className="flex-1 text-[#ADC178] text-right"
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

export default Register;

const SignupForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here you would typically send the form data to your server
        console.log('Form submitted:', formData);
        alert('Signup successful!');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='name' className='font-medium text-[#6C584C]'>Name</label>
                <input
                    id='name'
                    name='name'
                    type='text'
                    
                    className='w-full pl-6 py-3 rounded-full shadow-sm border-[1px] border-[#D9D9D9] bg-transparent mt-2'
                    placeholder='Nguyen Van An'

                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='mb-3'>
                <label htmlFor='email' className='font-medium text-[#6C584C]'>Email</label>
                <input
                    id='email'
                    type='email'
                    name='email'

                    className='w-full pl-6 py-3 rounded-full shadow-sm border-[1px] border-[#D9D9D9] bg-transparent mt-2'
                    placeholder='abc123@gmail.com'

                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='mb-3'>
                <label htmlFor='password' className='flex-1 font-medium text-[#6C584C]'>Password</label>
                
                <input
                    id='password'
                    type='password'
                    name='password'
                    className='w-full pl-6 py-3 rounded-full shadow-sm border-[1px] border-[#D9D9D9] bg-transparent mt-2'
                    placeholder='*********'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            
            <div className='flex mt-7'>
                <button type='submit' className='bg-[#ADC178] rounded-full text-white text-center font-medium p-2 w-[100px] active:scale-[.98] mx-auto'>Continue</button>
            </div>

        </form>
    )
}
import React, { useState } from 'react';
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
                    
                    <LoginForm />

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

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token) // Store JWT
            // Redirect or update UI
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
            <div>
                <label htmlFor='loginEmail' className='font-medium text-[#6C584C]'>Email</label>
                <input
                    id='login-email'
                    type='email'
                    name='login-email'

                    className='w-full pl-6 py-3 rounded-full shadow-sm border-[1px] border-[#D9D9D9] bg-transparent mt-2'
                    placeholder='abc123@gmail.com'

                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
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
                    id='login-password'
                    type='password'
                    name='login-password'

                    className='w-full pl-6 py-3 rounded-full shadow-sm border-[1px] border-[#D9D9D9] bg-transparent mt-2'
                    placeholder='*********'
                    
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className='flex mt-7'>
                <button type='submit' className='bg-[#ADC178] rounded-full text-white text-center font-medium p-2 w-[100px] active:scale-[.98] hover:scale-[1.01] mx-auto'>Log in</button>
            </div>
        </form>
    );
};
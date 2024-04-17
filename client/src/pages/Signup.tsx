import { BottomWarning } from '../components/BottomWarning';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Inputs{
    email: string,
    name: string,
    password: string
}

interface VerificationResponse {
    data: {
        [key: string]: any; // Index signature for unknown properties
        token: string;
    };
}

export default function Signup() {
    const { register, handleSubmit, formState:{ errors } } = useForm<Inputs>()
    const [ error, setError ] = useState<boolean>(false)
    const navigate = useNavigate()
        
    //Check if the local storage already has a authToken or in layman terms if the user didn't log out or is still signed in
    useEffect(() => {
        try{
            const authToken = localStorage.getItem('token')?.split(' ')[1]
            if(authToken) navigate("/dashboard")
        }
        catch (e){
            //Do Nothing
        }
    }, [])


    //This send the post request to the backend for verification

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try{
            const response:VerificationResponse = await axios.post("http://localhost:3000/signup", data)
            localStorage.setItem('token', "Bearer "+response.data.token)
            navigate("/dashboard")
        }
        catch (e) {
            setError(true)
            setTimeout(() => setError(false), 3000)
        }
        
    }

    return (
        <div className='bg-[#181824] h-screen flex justify-center items-center'>
            {error? <div className='absolute top-0 left-0 right-0 bottom-0 bg-black rounded-lg size-fit opacity-100 transition-opacity-20 duration-300'><h2 className='text-white text-sm font-bold p-3 transition-opacity duration-1000'>Email is already associated with an user</h2></div>: <div></div>}
            <div className='bg-[#25273c] flex flex-col rounded-lg'>
            <h2 className='text-white text-2xl px-8 text-center py-3 font-sans font-bold mt-4'>Sign Up</h2>
                <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder='email' className='text-white bg-gray-900 mx-10 mt-6 rounded-md p-2' {...register("email", {required: true })} />
                    {errors.email && <span className='mx-10 text-red-500 text-xs'>This field is required</span>}
                    <input placeholder='name' className='text-white bg-gray-900 mx-10 mt-3 rounded-md p-2' {...register("name", {required: true })} />
                    <input placeholder='password' type='password' className='text-white bg-gray-900 mx-10 mt-3 rounded-md p-2' {...register("password", {required: true, minLength: 8, maxLength: 20})} />
                    {errors.password && <span className='mx-10 text-red-500 text-xs'>This field is required</span>}
                    <input className=' bg-gray-400 mx-10 mt-10 mb-9 rounded-md p-2 hover:text-white hover:bg-gray-500 transition-colors duration-300 hover:cursor-pointer' type="submit" />
                </form>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/"} />
            </div>
        </div>
    )
}
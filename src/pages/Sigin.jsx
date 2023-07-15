import React, {useState} from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/Auth'

const Sigin = () => {

    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const {signInUser} = useAuth()


    const handleLogin = async (e) => {
        e.preventDefault()
        try{
            const user = await signInUser(email, password)
            if(user){
                MySwal.fire({
                    title: 'Success!',
                    text: 'Login Success',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/table')
            } 
        } catch(err){
            MySwal.fire({
                title: 'Error!',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    return (
        <>
            <div>

                <main className="mt-0 transition-all duration-200 ease-in-out">
                    <section className="min-h-screen">
                        <div className="bg-top relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-cover min-h-50-screen rounded-xl bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg')]">
                            <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-zinc-800 to-zinc-700 opacity-60" />
                            <div className="container z-10">
                                <div className="flex flex-wrap justify-center -mx-3">
                                    <div className="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
                                        <h1 className="mt-12 mb-2 text-white">Welcome!</h1>
                                        <p className="text-white">Untuk Masuk Ke Halaman Admin Wajib Login Dulu!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container px-4">
                            <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
                                <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                                    <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
                                        <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                                            <h5 className='font-semibold text-2xl'>Sign-In</h5>
                                        </div>

                                        <div className="flex-auto p-6">
                                            <form role="form text-left" onSubmit={handleLogin}>
                                                <div className="mb-4">
                                                    <input type="email" value={email} className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" placeholder="Email" aria-label="Email" aria-describedby="email-addon" onChange={(e) => setEmail(e.target.value)}/>
                                                </div>
                                                <div className="mb-4">
                                                    <input type="password" value={password} className="placeholder:text-gray-500 text-sm focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" placeholder="Password" aria-label="Password" aria-describedby="password-addon" onChange={(e) => setPassword(e.target.value)}/>
                                                </div>
                                                <div className="min-h-6 pl-7 mb-0.5 block">
                                                <input defaultChecked id="checked-checkbox" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label className="mb-2 ml-1 font-normal cursor-pointer text-sm text-slate-700"> I agree the <a  className="font-bold text-slate-700">Terms and Conditions</a> </label>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="inline-block w-full px-5 py-2.5 mt-6 mb-2 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:-translate-y-px hover:shadow-xs leading-normal text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-zinc-800 to-zinc-700 hover:border-slate-700 hover:bg-slate-700 hover:text-white">Sign up</button>
                                                </div>
                                                {/* <p className="mt-4 mb-0 leading-normal text-sm">Already have an account? <a href="../pages/sign-in.html" className="font-bold text-slate-700">Sign in</a></p> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>



            </div>

        </>
    )
}

export default Sigin
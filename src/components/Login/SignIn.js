<<<<<<< HEAD
import React from "react";
import '../css/RegisterForm1.css';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import firebaseConfig from '../config';
import { useHistory } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';
import { FcGoogle } from "react-icons/fc";

const SignIn = ({}) => {
    var count = 4;
    const auth = getAuth(firebaseConfig);
    const history = useHistory();

    async function ErrorMessage(){
        var element = document.getElementById("error");
        element.style.display = "block";
        document.getElementById("errorSpan").innerHTML = "Your email/password is incorrect. You can try "+count+" more times";
        count--;
        if(count < 0){
            history.push("/");
        }
        var email = document.getElementById("email");
        var password = document.getElementById("password");
        email.style.backgroundColor = "#FBEBEB";
        email.style.outline = "2px solid red";
        password.style.backgroundColor = "#FBEBEB";
        password.style.outline = "2px solid red";
    }
    
    const handleSubmit = async () => {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const valid_email=/^[^@]+@\w+(.\w+)+\w$/;
        const valid_password = /^(?=.*[0-9]{2,})(?=.*[A-Z])(?=.*[a-z]{2,})[a-zA-Z0-9!@#$%^&*]{6,12}$/;
        
        if(email ==="" || password ==="") {
            toast.warn("Must enter Email and Password.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            ErrorMessage();
        }
        else if(valid_email.test(email)!=true) {
            toast.warn("Invalid Email format.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            ErrorMessage();
        }
        else if(valid_password.test(password)!=true) {
            toast.warn("Password must contain at least 2 alphabet, 2 number and have lenght between 6-12.", { // รหัสผ่านต้องเป็นภาษาอังกฤษและมี 6-12 ตัว มีอักษร 2 ตัวขึ้นไป ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว และมีตัวเลขอย่างน้อย 2 ตัว
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            ErrorMessage();
        }
        else{   
            // sign in
            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                history.push("/shop");
            }).catch((error) => {
                toast.warn("Wrong Email or Password.", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
=======
import React from 'react';
import '../css/RegisterForm1.css';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import firebaseConfig from '../config';

const SignIn = () => {
    let count = 4;
    const auth = getAuth(firebaseConfig);
    const history = useHistory();

    function get_cookie(name){
        return document.cookie.split(';').some(cookie => {
            return cookie.trim().startsWith(name+'=');
        });
    }

    async function ErrorMessage(){
            var element = document.getElementById("error");
            element.classList.remove('hidden');

            setTimeout(() => {
                element.classList.add('active');
            },50)

            document.querySelector('#errorSpan .count').innerHTML = ' '+count+' ';
            count--;
            if(count == 0){
                const date = new Date();
                date.setTime(date.getTime() + 600000);
                let expires = "expires="+date.toUTCString()+';';
                if(!get_cookie('error')){
                    document.cookie = 'error=true;' + expires
                }
                history.push("/");
            }
            var email = document.querySelector(".login-email");
            var password = document.querySelector(".login-password");

            email.classList.add('Error');
            password.classList.add('Error');
    }
    
    const handleSubmit = async () => {
        let editMessageError = document.querySelector('#errorSpan');
        if(!get_cookie('error')){
            if(!editMessageError.children[2].classList.contains('hidden')) {
                editMessageError.children[2].classList.add('hidden');
                editMessageError.children[1].classList.remove('hidden');
            }
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;

            // sign in
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    history.push("/shop");
                }).catch((error) => {
                    ErrorMessage();
                });

        }else{            
            var element = document.getElementById("error");
            if(element.classList.contains('hidden')){
                element.classList.remove('hidden');
                setTimeout(() => {
                    element.classList.add('active');
                },50)
            }
            editMessageError.children[1].classList.add('hidden');
            editMessageError.children[2].classList.remove('hidden');
            count = 4
        }
    }

    const handleGoogleSignIn = async (e) =>{
        e.preventDefault();

        try{
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            history.push("/personalinfo");
        }catch(error){
            console.log(error);
>>>>>>> 882f42d (Update CSS and HTML)
        }
    }

    return (
        <div className="container">
<<<<<<< HEAD
            <div className="navBar"></div>
            <div className="container-con">
                <div className="col-lg-5">
                    <div className="head">
                            <p>Welcome to Zz-Commerce</p>
                    </div>
                    <div className="form-group">
=======
            <div className="section">
                <div className="section-flex">
                    <div className="head">
                            <p>Welcome to Zz-Commerce</p>
                    </div>
                    <div className="form-group" onClick={handleGoogleSignIn}>
>>>>>>> 882f42d (Update CSS and HTML)
                            <a href="" className="btn-signUp">
                                <div className="icon-img">
                                    <FcGoogle/>
                                </div>
                                <span>Sign In with Google</span>
                            </a>
                    </div>
                    <div className="alternative">
                        <div className="line"></div>
                        <span>Or</span>
                        <div className="line"></div>
                    </div>
<<<<<<< HEAD
                    <div className='error' id="error">
                        <span id="errorSpan"></span>
                    </div>
                    <div className="input Email form">
                        <div className="tool">Enter your Email</div>
                        <input type="email" name="email" placeholder="Email" id="email" required/>
                    </div>
                    <div className="input Pass form">
                        <div className="tool">Must be 6-20 character, at least 2 a-z, 1 A-Z, 2 0-9 and can contain !@#$%^&*</div>
                        <input type="password" name="password" placeholder="Password" id="password" required/>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="form-check">
                            <input className="check" type="checkbox"/>
                            <label className="normalText" >
                                Remember me
                            </label>
                        </div>
                     <a href="/sendemail" className="forgotText">Forgot password?</a>
                    </div>
                        
                    <button className="submit" onClick={handleSubmit}>
                        <span>Sign-in</span>
                    </button>
                    <ToastContainer/>
                    <div className='register'>
                        <a className="normalText">Not registered yet? </a>
                        <a href='/' className="createAccount">Create an Account</a>
                    </div>
=======
                    <div className='error hidden' id="error">
                        <div id="errorSpan">
                            <div className="icon"></div>
                            <span>Your email or password is incorrect. You can try<span className='count'></span>more times</span>
                            <span className="error-access-limit pl-3 text-[16px] hidden">There have been too many login failures in a short time period. Please wait and try again in a few hours.</span>
                        </div>
                    </div>
                    <div className="input Email form">
                        <input type="email" className='login-email' name="email" placeholder="Email" id="email" required/>
                    </div>
                    <div className="input Pass form mb-0">
                        <input type="password" name="password" className='login-password' placeholder="Password" id="password" required/>
                    </div>

                    <div className="flex items-center justify-between my-4">
                        <label className='flex items-center cursor-pointer'>
                            <input className="check hidden peer" type="checkbox"/>
                            <span className="checkmark w-5 h-5 border-[2.5px] border-primary-green rounded-[4.5px] peer-checked:bg-[length:70%]"></span>
                            <span className='text-base ml-2'>Remember Me</span>
                        </label>
                        <a href="/sendemail" className="text-base text-link-green no-underline hover:text-primary-green">Forgot password?</a>
                    </div>
                        
                    <button className="submit" onClick={handleSubmit}>
                        <span>Login</span>
                    </button>
                    <div className='registe text-base mt-4 font-semi'>
                        <span className="">Not registered yet? </span>
                        <a href='/signup' className="no-underline text-link-green hover:text-primary-green">Create an Account</a>
                    </div>

>>>>>>> 882f42d (Update CSS and HTML)
                </div>
            </div>
        </div>
    );
}

export default SignIn;
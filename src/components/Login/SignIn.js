import React, { useState } from 'react';
import '../css/RegisterForm1.css';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from 'firebase/auth';
import { getDatabase, ref, child, get } from 'firebase/database';
import { Link, useHistory } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import firebaseConfig from '../config';

const SignIn = () => {
  const [currentUser, setCurrentUser] = useState(null);
  let count = 4;
  const auth = getAuth(firebaseConfig);
  const dbRef = ref(getDatabase());
  const history = useHistory();

  function get_cookie(name) {
    return document.cookie.split(';').some((cookie) => {
      return cookie.trim().startsWith(name + '=');
    });
  }

  async function ErrorMessage() {
    var element = document.getElementById('error');
    element.classList.remove('hidden');

    setTimeout(() => {
      element.classList.add('active');
    }, 50);

    document.querySelector('#errorSpan .count').innerHTML = ' ' + count + ' ';
    count--;
    if (count == 0) {
      const date = new Date();
      date.setTime(date.getTime() + 600000);
      let expires = 'expires=' + date.toUTCString() + ';';
      if (!get_cookie('error')) {
        document.cookie = 'error=true;' + expires;
      }
      history.push('/');
    }
    var email = document.querySelector('.login-email');
    var password = document.querySelector('.login-password');

    email.classList.add('Error');
    password.classList.add('Error');
  }

  const handleSubmit = async () => {
    let editMessageError = document.querySelector('#errorSpan');
    if (!get_cookie('error')) {
      if (!editMessageError.children[2].classList.contains('hidden')) {
        editMessageError.children[2].classList.add('hidden');
        editMessageError.children[1].classList.remove('hidden');
      }
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;

      // sign in
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          history.push('/shop');
        })
        .catch((error) => {
          ErrorMessage();
        });
    } else {
      var element = document.getElementById('error');
      if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
        setTimeout(() => {
          element.classList.add('active');
        }, 50);
      }
      editMessageError.children[1].classList.add('hidden');
      editMessageError.children[2].classList.remove('hidden');
      count = 4;
    }
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setCurrentUser(auth.currentUser);
        get(child(dbRef, `personalInfo/${auth.currentUser.uid}`)).then(
          (data) => {
            if (data.exists()) {
              history.push('/shop');
            } else {
              history.push('/personalinfo');
            }
          }
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className='container'>
      <div className='section'>
        <div className='section-flex'>
          <div className='head'>
            <p>Welcome to Zz-Commerce</p>
          </div>
          <div className='form-group' onClick={handleGoogleSignIn}>
            <a href='' className='btn-signUp'>
              <div className='icon-img'>
                <FcGoogle />
              </div>
              <span>Sign In with Google</span>
            </a>
          </div>
          <div className='alternative'>
            <div className='line'></div>
            <span>Or</span>
            <div className='line'></div>
          </div>
          <div className='error hidden' id='error'>
            <div id='errorSpan'>
              <div className='icon'></div>
              <span>
                Your email or password is incorrect. You can try
                <span className='count'></span>more times
              </span>
              <span className='error-access-limit pl-3 text-[16px] hidden'>
                There have been too many login failures in a short time period.
                Please wait and try again in a few hours.
              </span>
            </div>
          </div>
          <div className='input Email form'>
            <input
              type='email'
              className='login-email'
              name='email'
              placeholder='Email'
              id='email'
              required
            />
          </div>
          <div className='input Pass form mb-0'>
            <input
              type='password'
              name='password'
              className='login-password'
              placeholder='Password'
              id='password'
              required
            />
          </div>

          <div className='flex items-center justify-between my-4'>
            <label className='flex items-center cursor-pointer'>
              <input className='check hidden peer' type='checkbox' />
              <span className='checkmark w-5 h-5 border-[2.5px] border-primary-green rounded-[4.5px] peer-checked:bg-[length:70%]'></span>
              <span className='text-base ml-2'>Remember Me</span>
            </label>
            <Link
              to='/sendemail'
              className='text-base text-link-green no-underline hover:text-primary-green'
            >
              Forgot password?
            </Link>
          </div>

          <button className='submit' onClick={handleSubmit}>
            <span>Login</span>
          </button>
          <div className='registe text-base mt-4 font-semi'>
            <span className=''>Not registered yet? </span>
            <Link
              to='/signup'
              className='no-underline text-link-green hover:text-primary-green'
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

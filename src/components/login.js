import React, { useState } from 'react';
import './signup.css'
import { auth } from './firebase';
import { Link,BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import SignUp from './signup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
  <Router>
    <Routes>
      <Route path='/signup' element={<SignUp/>}  />
  </Routes>
    </Router>
    const navigate = useNavigate()
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        setEmailError('');
        setPasswordError('');

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long.');
        }

        if (validateEmail(email) && password.length >= 8) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate('/home')

                // Navigate to a protected route or home page after successful login
            } catch (error) {
                console.error('Error logging in: ', error);
                setEmailError('Error logging in.');
            }
        }
    };

  return (
      <div className='signuptotal'>
        <div className='signupstyle'>
            <div className='signupheading'>Login</div>
            <form onSubmit={handleSubmit}>
                <div>
                  
                    <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder='enter your email' required />
                    {emailError && <div style={{ color: 'red', fontSize: '0.8em' }}>{emailError}</div>}
                </div>
                <div>
                    
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder='enter your password' required />
                    {passwordError && <div style={{ color: 'red', fontSize: '0.8em' }}>{passwordError}</div>}
                </div>
          <div className='signupbutton'><button type="submit">Login</button></div>
          <div style={{ color: 'white'}}>If you are a new user click here <Link to={'/signup'}>Signup</Link></div>
            </form>
      </div>
      </div>
    );
};

export default Login;

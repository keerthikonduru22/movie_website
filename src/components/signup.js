import React, { useState,useContext} from 'react';
import { auth,db } from './firebase';
import './signup.css'
import { useNavigate } from 'react-router-dom'
import MyListContext from '../components/home/contentprovider';
import { createUserWithEmailAndPassword } from 'firebase/auth';
   import { doc, setDoc } from 'firebase/firestore';
// import Subscription from './subscription';

const SignUp = () => {
    const { setuser,subscription} = useContext(MyListContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const history = useNavigate();
    //  useEffect(() => {
    //     console.log("User state updated:", username);
    // }, [username]);
    // useEffect(() => {
    //     console.log(subscription)
    // })
    // useEffect(() => {
    //     console.log(subscription)
    // })

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordPattern.test(password);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
        }

        if (validateEmail(email) && validatePassword(password) && password === confirmPassword) {
            try {
              const userCredential =  await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log("keerthi", user)
                setuser(user)
            
                await setDoc(doc(db, "customers", user.uid), {
                    email: user.email,
                   subscription: {
                        status: subscription?.statussub || "inactive" ,
                        plan: subscription?.role || "free" ,
                        startDate: new Date().toISOString(), 
                    },
                
    
                });
                
                alert('Sign up successful!');
            history('/');
                console.log("user added to firebase")
                
            } catch (error) {
                console.error('Error signing up: ', error);
                setEmailError('Error signing up.');
            }
                }
    
    };
   
    // useEffect(() => {
    //     if (username) {
    //         alert('Sign up successful!');
    //         history('/');
    //     }
    // }, [username, history]);

    return (
        <div className='signuptotal'>
        <div className='signupstyle'>
            <div className='signupheading'>Sign Up</div>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* <label htmlFor="email">Email:</label> */}
                    <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder='enter your email' required />
                    {emailError && <div style={{ color: 'red', fontSize: '0.8em' }}>{emailError}</div>}
                </div>
                <div>
                    {/* <label htmlFor="password">Password:</label> */}
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder='enter your password' required />
                    {passwordError && <div style={{ color: 'red', fontSize: '0.8em' }}>{passwordError}</div>}
                </div>
                <div>
                    {/* <label htmlFor="confirmPassword">Confirm Password:</label> */}
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder='conform password' required />
                    {confirmPasswordError && <div style={{ color: 'red', fontSize: '0.8em' }}>{confirmPasswordError}</div>}
                </div>
                    <div className='signupbutton'><button type="submit">Sign Up</button></div>
                    
            </form>
            </div>
            </div>
    );
};

export default SignUp;




// import React, { useState } from 'react';
// import { auth, db } from './firebase'; // Add Firestore database import
// import './signup.css';
// import { useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions

// const SignUp = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [confirmPasswordError, setConfirmPasswordError] = useState('');
//     const history = useNavigate();

//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };

//     const handleConfirmPasswordChange = (e) => {
//         setConfirmPassword(e.target.value);
//     };

//     const validateEmail = (email) => {
//         const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//         return emailPattern.test(email);
//     };

//     const validatePassword = (password) => {
//         const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//         return passwordPattern.test(password);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setEmailError('');
//         setPasswordError('');
//         setConfirmPasswordError('');

//         if (!validateEmail(email)) {
//             setEmailError('Please enter a valid email address.');
//         }

//         if (!validatePassword(password)) {
//             setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
//         }

//         if (password !== confirmPassword) {
//             setConfirmPasswordError('Passwords do not match.');
//         }

//         if (validateEmail(email) && validatePassword(password) && password === confirmPassword) {
//             try {
//                 const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//                 const user = userCredential.user;
//                 await addUserToFirestore(user); // Add user to Firestore
//                 alert('Sign up successful!');
//                 history('/');
//             } catch (error) {
//                 console.error('Error signing up: ', error);
//                 setEmailError('Error signing up.');
//             }
//         }
//     };

//     const addUserToFirestore = async (user) => {
//         try {
//             await setDoc(doc(db, 'customers', user.uid), {
//                 email: user.email,
//                 uid: user.uid,
//                 // Add other user details here
//             });
//             console.log('User added to Firestore');
//         } catch (error) {
//             console.error('Error adding user to Firestore:', error);
//         }
//     };

//     return (
//         <div className='signuptotal'>
//             <div className='signupstyle'>
//                 <div className='signupheading'>Sign Up</div>
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder='enter your email' required />
//                         {emailError && <div style={{ color: 'red', fontSize: '0.8em' }}>{emailError}</div>}
//                     </div>
//                     <div>
//                         <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder='enter your password' required />
//                         {passwordError && <div style={{ color: 'red', fontSize: '0.8em' }}>{passwordError}</div>}
//                     </div>
//                     <div>
//                         <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder='conform password' required />
//                         {confirmPasswordError && <div style={{ color: 'red', fontSize: '0.8em' }}>{confirmPasswordError}</div>}
//                     </div>
//                    <div className='signupbutton'><button type="submit">Sign Up</button></div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SignUp;


import React, { createContext, useState,useEffect} from 'react';
import { auth } from '../firebase'; 
// import { collection, getDocs } from 'firebase/firestore';
const MyListContext = createContext();

export const MyListProvider = ({ children }) => {
    const [mylist, setmylist] = useState(()=>{
        const savedList = localStorage.getItem('mylist');
        return savedList ? JSON.parse(savedList) : [];
    });
    const [videoKey, setVideoKey] = useState('');
    // const [type, setType] = useState('movie'); // Add state for type
    const [results, setResults] = useState([])
    const [username,setuser] = useState(null)
    const [subscription, setSubscription] = useState(null);
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setuser(user); // Set the user in context
            } else {
                setuser(null); // Clear the user in context
            }
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    // useEffect(() => {
    //     if (!username || !username.uid) return; // Check if username or uid is null

    //     const fetchSubscriptions = async () => {
    //         try {
    //             const subscriptionsRef = collection(db, "customers", username.uid, "subscriptions");
    //             const querySnapshot = await getDocs(subscriptionsRef);

    //             querySnapshot.forEach((subscription) => {
    //                 setSubscription({
    //                     role: subscription.data().role,
    //                     statussub: subscription.data().status,
    //                     current_period_end: subscription.data().current_period_end.seconds,
    //                     current_period_start: subscription.data().current_period_start.seconds,
    //                     subscriptionId: subscription.id, // Store the subscription ID for cancellation
    //                     stripeSubscriptionId: subscription.id, // Store the Stripe subscription ID
    //                 });
    //             });
    //         } catch (error) {
    //             console.error("Error fetching subscriptions:", error);
    //         }
    //     };

    //     fetchSubscriptions();
    // }, [username, setSubscription]);
//   const updateType = (newType) 
//     setType(newType);
//     };
    
    // const handlemylist = (item) => {
     
    //         setMylist((prevMylist) => [...prevMylist, item]);
        
    // };

    // const removeFromMyList = (id) => {
    //     setMylist((prevMylist) => prevMylist.filter(item => item.id !== id));
    // };

    return (
        <MyListContext.Provider value={{ mylist, setmylist,results,setResults,videoKey,setVideoKey,username,setuser,subscription,setSubscription}}>
            {children}
        </MyListContext.Provider>
    );
};
export default MyListContext

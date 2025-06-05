// import React, { useEffect, useState,useContext} from 'react';
// import { db } from './firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import './subscription.css'
// import MyListContext from '../components/home/contentprovider';
// import {loadStripe} from '@stripe/stripe-js'
// export default function Subscription() {
//     const { username} = useContext(MyListContext);
//     const [products, setProducts] = useState({});

    
//     useEffect(() => {
//         const fetchProducts = async () => {
//             const productsCollection = collection(db, "products");
//             const activeProductsQuery = query(productsCollection, where("active", "==", true));
//             const querySnapshot = await getDocs(activeProductsQuery);

//             const products = {};
//             querySnapshot.forEach(async (productDoc) => {
//                 products[productDoc.id] = productDoc.data();
//                 const pricesCollection = collection(productDoc.ref, "prices");
//                 const priceSnap = await getDocs(pricesCollection);
//                 priceSnap.docs.forEach(price => {
//                     products[productDoc.id].prices = {
//                         priceId: price.id,
//                         priceData: price.data()
//                     };
//                 });
//             });
//             setProducts(products);
//         };

//         fetchProducts();
//     }, []);

//     console.log("Products:", products);
   
    
      
//     const handleSubscribe = async (priceId) => {
//         const docRef = await db
//             .collection("customers")
//             .doc(username.uid)
//             .collection("checkout_sessions")
//             .add({
//                 price: priceId,
//                 success_url: window.location.origin,
//                 cancel_url: window.location.origin,
//         })
//         docRef.onSnapshot(async(snap) => {
//             const { error, sessionId } = snap.data();
//             if (error) {
//                 alert(`an error occured: ${error.message}`)
//             }
//             if (sessionId) {
//                 const stripe = await loadStripe("pk_test_51QzAIWEQOJ65d3Hq4NP6jMA4phOul2bKGmVErYa47LxFDBgYXQq0uMbuM7rAACxEit0qOkHrH2qILCp4CTTlKuQW00dbe3XulO")
//                 stripe.redirectToCheckout({sessionId})
//             }
//         })
//     };
//     return (
        
//                    <div className="subscription-container">
//             <h1 className="subscription-heading">Available Subscriptions</h1>
//             {Object.keys(products).map((productId) => (
//                 <div key={productId} className="product-card">
//                     <h2>{products[productId].name}</h2>
//                     <p>{products[productId].description}</p>
                    
//                              <button onClick={() => handleSubscribe(products[productId].prices.priceId)}>subscribe</button>
                        
                    
//                 </div>
//             ))}
//         </div>
//     );
// }



// import React, { useEffect, useState, useContext } from 'react';
// import { db } from './firebase'; // Ensure this path is correct
// import { collection, query, where, getDocs, addDoc, onSnapshot } from 'firebase/firestore';
// import './subscription.css';
// import MyListContext from '../components/home/contentprovider';
// import { loadStripe } from '@stripe/stripe-js';

// export default function Subscription() {
//     const { username } = useContext(MyListContext);
//     const [products, setProducts] = useState({});
//     const [subscription, setsubscription] = useState(null)
//     useEffect(() => {
//         db.collection("customers")
//             .doc(username.uid)
//             .collection("subscriptions")
//             .get()
//             .then((querySnapshot) => {
//                 querySnapshot.forEach(async (subscription) => {
//                     setsubscription({
//                         role: subscription.data().role,
//                         current_period_end: subscription.data().current_period_end.seconds,
//                         current_period_start: subscription.data().current_period_start.seconds,
//                 })
//             })
//         })
//     },[username.uid])

//     useEffect(() => {
//         const fetchProducts = async () => {
//             const productsCollection = collection(db, "products");
//             const activeProductsQuery = query(productsCollection, where("active", "==", true));
//             const querySnapshot = await getDocs(activeProductsQuery);

//             const products = {};
//             const promises = querySnapshot.docs.map(async (productDoc) => {
//                 products[productDoc.id] = productDoc.data();
//                 const pricesCollection = collection(productDoc.ref, "prices");
//                 const priceSnap = await getDocs(pricesCollection);
//                 priceSnap.docs.forEach(price => {
//                     products[productDoc.id].prices = {
//                         priceId: price.id,
//                         priceData: price.data()
//                     };
//                 });
//             });

//             await Promise.all(promises); // Wait for all nested queries to complete
//             setProducts(products);
//             console.log("Fetched Products:", products); // Debugging
//         };

//         fetchProducts();
//     }, []);

//     const handleSubscribe = async (priceId) => {
//         if (!username) {
//             alert("Please sign in to subscribe.");
//             return;
//         }

//         try {
//             // Create a reference to the checkout_sessions subcollection
//             const checkoutSessionsRef = collection(db, "customers", username.uid, "checkout_sessions");

//             // Add a new document to the subcollection
//             const docRef = await addDoc(checkoutSessionsRef, {
//                 price: priceId,
//                 success_url: window.location.origin,
//                 cancel_url: window.location.origin,
//             });

//             // Listen for changes to the document
//             const unsubscribe = onSnapshot(docRef, async (snap) => {
//                 const { error, sessionId } = snap.data();
//                 if (error) {
//                     alert(`An error occurred: ${error.message}`);
//                 }
//                 if (sessionId) {
//                     const stripe = await loadStripe("pk_test_51QzAIWEQOJ65d3Hq4NP6jMA4phOul2bKGmVErYa47LxFDBgYXQq0uMbuM7rAACxEit0qOkHrH2qILCp4CTTlKuQW00dbe3XulO");
//                     stripe.redirectToCheckout({ sessionId });
//                 }
//             });

//             // Cleanup the listener on unmount (optional)
//             return () => unsubscribe();
//         } catch (error) {
//             console.error("Error creating checkout session:", error);
//             alert("An error occurred while processing your subscription.");
//         }
//     };
//     // const iscurrentpackage = products[productId].name?.toLowerCase().includes(subscription?.role)

//     return (
//         <div className="subscription-container">
//             <h1 className="subscription-heading">Available Subscriptions</h1>
//             {Object.keys(products).map((productId) => {
//                 const isCurrentPackage = products[productId].name?.toLowerCase().includes(subscription?.role);
//                 return (
//                     <div key={productId} className="product-card">
//                         <h2>{products[productId].name}</h2>
//                         <p>{products[productId].description}</p>
                        
//                             <div className="product-price">
                    
//                                 <button onClick={() =>!isCurrentPackage && handleSubscribe(products[productId].prices.priceId)}>
//                                     {isCurrentPackage ? 'Current Package' : 'Subscribe'}
//                                 </button>
//                             </div>
                        
                    
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }


// import React, { useEffect, useState, useContext } from 'react';
// import { db } from './firebase'; // Ensure this path is correct
// import { collection, query, where, getDocs, addDoc, onSnapshot } from 'firebase/firestore';
// import './subscription.css';
// import MyListContext from '../components/home/contentprovider';
// import { loadStripe } from '@stripe/stripe-js';

// export default function Subscription() {
//     const { username } = useContext(MyListContext);
//     const [products, setProducts] = useState({});
//     const [subscription, setSubscription] = useState(null);

//     useEffect(() => {
//         if (!username || !username.uid) return; // Check if username or uid is null

//         const fetchSubscriptions = async () => {
//             try {
//                 const subscriptionsRef = collection(db, "customers", username.uid, "subscriptions");
//                 const querySnapshot = await getDocs(subscriptionsRef);

//                 querySnapshot.forEach((subscription) => {
//                     setSubscription({
//                         role: subscription.data().role,
//                         current_period_end: subscription.data().current_period_end.seconds,
//                         current_period_start: subscription.data().current_period_start.seconds,
//                         subscriptionId: subscription.id, // Store the subscription ID for cancellation
//                     });
//                 });
//             } catch (error) {
//                 console.error("Error fetching subscriptions:", error);
//             }
//         };

//         fetchSubscriptions();
//     }, [username]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const productsCollection = collection(db, "products");
//                 const activeProductsQuery = query(productsCollection, where("active", "==", true));
//                 const querySnapshot = await getDocs(activeProductsQuery);

//                 const products = {};
//                 const promises = querySnapshot.docs.map(async (productDoc) => {
//                     products[productDoc.id] = productDoc.data();
//                     const pricesCollection = collection(productDoc.ref, "prices");
//                     const priceSnap = await getDocs(pricesCollection);
//                     priceSnap.docs.forEach((price) => {
//                         products[productDoc.id].prices = {
//                             priceId: price.id,
//                             priceData: price.data(),
//                         };
//                     });
//                 });

//                 await Promise.all(promises); // Wait for all nested queries to complete
//                 setProducts(products);
//                 console.log("Fetched Products:", products); // Debugging
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const handleSubscribe = async (priceId) => {
//         if (!username || !username.uid) {
//             alert("Please sign in to subscribe.");
//             return;
//         }

//         try {
//             // Create a reference to the checkout_sessions subcollection
//             const checkoutSessionsRef = collection(db, "customers", username.uid, "checkout_sessions");

//             // Add a new document to the subcollection
//             const docRef = await addDoc(checkoutSessionsRef, {
//                 price: priceId,
//                 success_url: window.location.origin,
//                 cancel_url: window.location.origin,
//             });

//             // Listen for changes to the document
//             const unsubscribe = onSnapshot(docRef, async (snap) => {
//                 const { error, sessionId } = snap.data();
//                 if (error) {
//                     alert(`An error occurred: ${error.message}`);
//                 }
//                 if (sessionId) {
//                     const stripe = await loadStripe("pk_test_51QzAIWEQOJ65d3Hq4NP6jMA4phOul2bKGmVErYa47LxFDBgYXQq0uMbuM7rAACxEit0qOkHrH2qILCp4CTTlKuQW00dbe3XulO");
//                     stripe.redirectToCheckout({ sessionId });
//                 }
//             });

//             // Cleanup the listener on unmount (optional)
//             return () => unsubscribe();
//         } catch (error) {
//             console.error("Error creating checkout session:", error);
//             alert("An error occurred while processing your subscription.");
//         }
//     };

//     const handleCancelSubscription = async () => {
//         if (!username || !username.uid || !subscription?.subscriptionId) {
//             alert("No active subscription to cancel.");
//             return;
//         }

//         try {
//             // Call a Firebase Function or your backend to cancel the subscription
//             const response = await fetch('https://us-central1-netflix-clone-1b953.cloudfunctions.net/cancelSubscription', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     customerId: username.uid,
//                     subscriptionId: subscription.subscriptionId,
//                 }),
//             });

//             const result = await response.json();

//             if (result.success) {
//                 alert("Subscription canceled successfully.");
//                 setSubscription(null); // Reset the subscription state
//             } else {
//                 alert("Failed to cancel subscription: " + result.error);
//             }
//         } catch (error) {
//             console.error("Error canceling subscription:", error);
//             alert("An error occurred while canceling your subscription.");
//         }
//     };

//     return (
//         <div className="subscription-container">
//             <h1 className="subscription-heading">Available Subscriptions</h1>
//             {Object.keys(products).map((productId) => {
//                 const isCurrentPackage = products[productId].name?.toLowerCase().includes(subscription?.role);
//                 return (
//                     <div key={productId} className="product-card">
//                         <h2>{products[productId].name}</h2>
//                         <p>{products[productId].description}</p>
//                         <div className="product-price">
//                             <button onClick={() => !isCurrentPackage && handleSubscribe(products[productId].prices.priceId)}>
//                                 {isCurrentPackage ? 'Current Package' : 'Subscribe'}
//                             </button>
//                         </div>
//                     </div>
//                 );
//             })}
//             {subscription && (
//                 <div className="cancel-subscription">
//                     <button onClick={handleCancelSubscription}>Cancel Subscription</button>
//                 </div>
//             )}
//         </div>
//     );
// }




// import React, { useEffect, useState, useContext } from 'react';
// import { db } from './firebase';
// import { collection, query, where, getDocs, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';
// import './subscription.css';
// import MyListContext from '../components/home/contentprovider';
// import { loadStripe } from '@stripe/stripe-js';

// export default function Subscription() {
//     const { username,subscription,setSubscription } = useContext(MyListContext);
//     const [products, setProducts] = useState({});
    

//     useEffect(() => {
//         if (!username || !username.uid) return;

//         const fetchSubscriptions = async () => {
//             try {
//                 const subscriptionsRef = collection(db, "customers", username.uid, "subscriptions");
//                 const querySnapshot = await getDocs(subscriptionsRef);

//                 querySnapshot.forEach((subscription) => {
//                     setSubscription({
//                         role: subscription.data().role,
//                         current_period_end: subscription.data().current_period_end.seconds,
//                         current_period_start: subscription.data().current_period_start.seconds,
//                         subscriptionId: subscription.id,
//                         stripeSubscriptionId: subscription.data().stripeSubscriptionId,
//                     });
//                 });
//             } catch (error) {
//                 console.error("Error fetching subscriptions:", error);
//             }
//         };

//         fetchSubscriptions();
//     }, [username,setSubscription]);

//     useEffect(() => {
//         console.log(" keerthi",username)
//     })
    
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const productsCollection = collection(db, "products");
//                 const activeProductsQuery = query(productsCollection, where("active", "==", true));
//                 const querySnapshot = await getDocs(activeProductsQuery);

//                 const products = {};
//                 const promises = querySnapshot.docs.map(async (productDoc) => {
//                     products[productDoc.id] = productDoc.data();
//                     const pricesCollection = collection(productDoc.ref, "prices");
//                     const priceSnap = await getDocs(pricesCollection);
//                     priceSnap.docs.forEach((price) => {
//                         products[productDoc.id].prices = {
//                             priceId: price.id,
//                             priceData: price.data(),
//                         };
//                     });
//                 });

//                 await Promise.all(promises);
//                 setProducts(products);
//                 console.log("Fetched Products:", products);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };

//         fetchProducts();
//     }, []);


//     const handleSubscribe = async (priceId) => {
//         if (!username || !username.uid) {
//             alert("Please sign in to subscribe.");
//             return;
//         }

//         try {
            
//             const checkoutSessionsRef = collection(db, "customers", username.uid, "checkout_sessions");

            
//             const docRef = await addDoc(checkoutSessionsRef, {
//                 price: priceId,
//                 success_url: `${window.location.origin}/home`,
//                 cancel_url: window.location.origin,
//             });

            
//             const unsubscribe = onSnapshot(docRef, async (snap) => {
//                 const { error, sessionId } = snap.data();
//                 if (error) {
//                     alert(`An error occurred: ${error.message}`);
//                 }
//                 if (sessionId) {
//                     const stripe = await loadStripe("pk_test_51QzAIWEQOJ65d3Hq4NP6jMA4phOul2bKGmVErYa47LxFDBgYXQq0uMbuM7rAACxEit0qOkHrH2qILCp4CTTlKuQW00dbe3XulO");
//                     stripe.redirectToCheckout({ sessionId });
//                 }
//             });

            
//             return () => unsubscribe();
//         } catch (error) {
//             console.error("Error creating checkout session:", error);
//             alert("An error occurred while processing your subscription.");
//         }
//     };

    
//     const handleCancelSubscription = async () => {
//         if (!username || !username.uid || !subscription?.subscriptionId) {
//             alert("No active subscription to cancel.");
//             return;
//         }

//         try {
        
//             const subscriptionRef = doc(db, "customers", username.uid, "subscriptions", subscription.subscriptionId);
//             await updateDoc(subscriptionRef, {
//                 status: "canceled",
//                 canceled_at: new Date().toISOString(),
//             });

            
//             console.log("Subscription canceled successfully in Firestore.");
//             alert("Subscription canceled successfully.");

            
//             setSubscription(null);
//         } catch (error) {
//             console.error("Error canceling subscription:", error);
//             alert("An error occurred while canceling your subscription.");
//         }
//     };

//     return (
//         <div className="subscription-container">
//             <h1 className="subscription-heading">Available Subscriptions</h1>
//             {Object.keys(products).map((productId) => {
//                 const isCurrentPackage = products[productId].name?.toLowerCase().includes(subscription?.role);
//                 return (
//                     <div key={productId} className="product-card">
//                         <div className='productcard1' >
//                         <div className='productname'>{products[productId].name}</div>
//                             <div className='discription'>{products[productId].description}</div>
//                             </div>
//                         <div className="product-price">
//                             <button className={isCurrentPackage? 'currentpackage' : 'subscribe'} onClick={() => !isCurrentPackage && handleSubscribe(products[productId].prices.priceId)}>
//                                 {isCurrentPackage ? 'Current Package' : 'Subscribe'}
//                             </button>
//                         </div>
//                     </div>
//                 );
//             })}
//             {subscription && (
//                 <div className="cancel-subscription">
//                     <button onClick={handleCancelSubscription}>Cancel Subscription</button>
//                 </div>
//             )}
//         </div>
//     );
// }


// import React, { useEffect, useState, useContext } from 'react';
// import { db } from './firebase';
// import { collection, query, where, getDocs, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';
// import './subscription.css';
// import MyListContext from '../components/home/contentprovider';
// import { loadStripe } from '@stripe/stripe-js';
// import { useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { auth } from './firebase';

// export default function Subscription() {
//     const { username, subscription, setSubscription } = useContext(MyListContext);
//     const [products, setProducts] = useState({});
//     const navigate = useNavigate();

    
//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             alert('Logout successful!');
//             navigate('/');
//         } catch (error) {
//             console.error('Error logging out: ', error);
//         }
//     };
    
    
    
//     useEffect(() => {
//         if (!username || !username.uid) return;

//         const fetchSubscriptions = async () => {
//             try {
//                 const subscriptionsRef = collection(db, "customers", username.uid, "subscriptions");
//                 const querySnapshot = await getDocs(subscriptionsRef);

//                 querySnapshot.forEach((subscription) => {
//                     setSubscription({
//                         role: subscription.data().role,
//                         statussub: subscription.data().status,
//                         current_period_end: subscription.data().current_period_end.seconds,
//                         current_period_start: subscription.data().current_period_start.seconds,
//                         subscriptionId: subscription.id,
//                         stripeSubscriptionId: subscription.id,
//                     });
//                 });
//             } catch (error) {
//                 console.error("Error fetching subscriptions:", error);
//             }
//         };

//         fetchSubscriptions();
//     }, [username, setSubscription]);

//     useEffect(() => {
//         console.log("keerthi",subscription)
//     })

    
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const productsCollection = collection(db, "products");
//                 const activeProductsQuery = query(productsCollection, where("active", "==", true));
//                 const querySnapshot = await getDocs(activeProductsQuery);

//                 const products = {};
//                 const promises = querySnapshot.docs.map(async (productDoc) => {
//                     products[productDoc.id] = productDoc.data();
//                     const pricesCollection = collection(productDoc.ref, "prices");
//                     const priceSnap = await getDocs(pricesCollection);
//                     priceSnap.docs.forEach((price) => {
//                         products[productDoc.id].prices = {
//                             priceId: price.id,
//                             priceData: price.data(),
//                         };
//                     });
//                 });

//                 await Promise.all(promises);
//                 setProducts(products);
//                 console.log("Fetched Products:", products);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };

//         fetchProducts();
//     }, []);
//     console.log(products)

    
//     const handleSubscribe = async (priceId) => {
//         if (!username || !username.uid) {
//             alert("Please sign in to subscribe.");
//             return;
//         }

//         try {
//             const checkoutSessionsRef = collection(db, "customers", username.uid, "checkout_sessions");

//             const docRef = await addDoc(checkoutSessionsRef, {
//                 price: priceId,
//                 success_url: `${window.location.origin}/home`,
//                 cancel_url: window.location.origin,
//             });

//             const unsubscribe = onSnapshot(docRef, async (snap) => {
//                 const { error, sessionId } = snap.data();
//                 if (error) {
//                     alert(`An error occurred: ${error.message}`);
//                 }
//                 if (sessionId) {
//                     const stripe = await loadStripe("pk_test_51QzAIWEQOJ65d3Hq4NP6jMA4phOul2bKGmVErYa47LxFDBgYXQq0uMbuM7rAACxEit0qOkHrH2qILCp4CTTlKuQW00dbe3XulO");
//                     stripe.redirectToCheckout({ sessionId });
//                 }
//             });

//             return () => unsubscribe();
//         } catch (error) {
//             console.error("Error creating checkout session:", error);
//             alert("An error occurred while processing your subscription.");
//         }
//     };

    
//     const handleCancelSubscription = async (subscriptionId) => {
//         try {
//             console.log("Canceling subscription with ID:", subscriptionId);

//             const response = await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer sk_test_51QzAIWEQOJ65d3HqWS9h0IYc0ZT2fdyvBWs2BQaXKqyXr1l813wlPzfk9ELhBB0z6r7QYYKBsOMzxYa7hrnq789d00uw9vxHH7`, // Use your Stripe secret key
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//             });

//             if (!response.ok) {
//                 const errorResponse = await response.json();
//                 console.error("Stripe API error response:", errorResponse);

//                 if (response.status === 404) {
//                     throw new Error("Subscription not found. It may have already been canceled.");
//                 } else {
//                     throw new Error(`Stripe API error: ${response.statusText}`);
//                 }
//             }

//             const canceledSubscription = await response.json();
//             console.log("Subscription canceled:", canceledSubscription);

            
//             const subscriptionRef = doc(db, "customers", username.uid, "subscriptions", subscriptionId);
//             await updateDoc(subscriptionRef, {
//                 status: "canceled",
//                 canceled_at: new Date().toISOString(),
//                 role: "null"
//             });

            
//             setSubscription({
//                 role: null,
//                 statussub: "canceled",
//                 current_period_end: null,
//                 current_period_start: null,
//                 subscriptionId: null,
//                 stripeSubscriptionId: null,
//             });

//             alert("Subscription canceled successfully.");
            
//                 navigate('/');
            
            
             
//         } catch (error) {
//             console.error("Error canceling subscription:", error);
//             alert(error.message);
//         }
//     };
    

//     return (
//         <div className="subscription-container">
            
//             <div className='homelogoutstyle' onClick={handleLogout}><button>Logout</button></div>
//             <h1 className="subscription-heading">Available Subscriptions</h1>
//             {Object.keys(products).map((productId) => {
            
//                 const isCurrentPackage = subscription?.statussub !== "canceled" && products[productId].name?.toLowerCase().includes(subscription?.role);
//                 return (
//                     <div key={productId} className="product-card">
//                         <div className='productcard1'>
//                             <div className='productname'>{products[productId].name}</div>
//                             <div className='discription'>{products[productId].description}</div>
//                             <div className='price'>$ {products[productId].prices.priceData.unit_amount / 100 }</div>
//                         </div>
//                         <div className="product-price">
//                             <button
//                                 className={isCurrentPackage ? 'currentpackage' : 'subscribe'}
//                                 onClick={() => !isCurrentPackage && handleSubscribe(products[productId].prices.priceId)}
//                             >
//                                 {isCurrentPackage ? 'Current Package' : 'Subscribe'}
//                             </button>
//                         </div>
//                     </div>
//                 );
//             })}
            
//             {subscription && subscription.statussub !== "canceled" && (
//                 <div className="cancel-subscription">
//                     <button onClick={() => handleCancelSubscription(subscription.stripeSubscriptionId)}>
//                         Cancel Subscription
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }


import React, { useEffect, useState, useContext } from 'react';
import { db } from './firebase'; // Ensure this path is correct
import { collection, query, where, getDocs, addDoc, onSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';
import './subscription.css';
import MyListContext from '../components/home/contentprovider';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

export default function Subscription() {
    const { username, subscription, setSubscription } = useContext(MyListContext);
    const [products, setProducts] = useState({});
    const navigate = useNavigate(); // Initialize the navigate function

    // Handle logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert('Logout successful!');
            navigate('/');
        } catch (error) {
            console.error('Error logging out: ', error);
        }
    };

    // Fetch the user's active subscription
    useEffect(() => {
        if (!username || !username.uid) return; // Check if username or uid is null

        const fetchSubscriptions = async () => {
            try {
                const subscriptionsRef = collection(db, "customers", username.uid, "subscriptions");
                const querySnapshot = await getDocs(subscriptionsRef);

                querySnapshot.forEach((subscription) => {
                    setSubscription({
                        role: subscription.data().role,
                        statussub: subscription.data().status,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds,
                        subscriptionId: subscription.id, // Store the subscription ID for cancellation
                        stripeSubscriptionId: subscription.id, // Store the Stripe subscription ID
                    });
                });
            } catch (error) {
                console.error("Error fetching subscriptions:", error);
            }
        };

        fetchSubscriptions();
    }, [username, setSubscription]);

    // Fetch all active products and their prices
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, "products");
                const activeProductsQuery = query(productsCollection, where("active", "==", true));
                const querySnapshot = await getDocs(activeProductsQuery);

                const products = {};
                const promises = querySnapshot.docs.map(async (productDoc) => {
                    products[productDoc.id] = productDoc.data();
                    const pricesCollection = collection(productDoc.ref, "prices");
                    const priceSnap = await getDocs(pricesCollection);
                    priceSnap.docs.forEach((price) => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data(),
                        };
                    });
                });

                await Promise.all(promises); // Wait for all nested queries to complete
                setProducts(products);
                console.log("Fetched Products:", products); // Debugging
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Handle subscription
    const handleSubscribe = async (priceId) => {
        if (!username || !username.uid) {
            alert("Please sign in to subscribe.");
            return;
        }

        try {
            const checkoutSessionsRef = collection(db, "customers", username.uid, "checkout_sessions");

            const docRef = await addDoc(checkoutSessionsRef, {
                price: priceId,
                success_url: `${window.location.origin}/home`,
                cancel_url: window.location.origin,
            });

            const unsubscribe = onSnapshot(docRef, async (snap) => {
                const { error, sessionId } = snap.data();
                if (error) {
                    alert(`An error occurred: ${error.message}`);
                }
                if (sessionId) {
                    const stripe = await loadStripe("pk_test_51QzAIWEQOJ65d3Hq4NP6jMA4phOul2bKGmVErYa47LxFDBgYXQq0uMbuM7rAACxEit0qOkHrH2qILCp4CTTlKuQW00dbe3XulO");
                    stripe.redirectToCheckout({ sessionId });
                }
            });

            return () => unsubscribe();
        } catch (error) {
            console.error("Error creating checkout session:", error);
            alert("An error occurred while processing your subscription.");
        }
    };

    // Handle subscription cancellation
    const handleCancelSubscription = async (subscriptionId) => {
        try {
            console.log("Canceling subscription with ID:", subscriptionId); // Debugging

            const response = await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer sk_test_51QzAIWEQOJ65d3HqWS9h0IYc0ZT2fdyvBWs2BQaXKqyXr1l813wlPzfk9ELhBB0z6r7QYYKBsOMzxYa7hrnq789d00uw9vxHH7`, // Use your Stripe secret key
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (!response.ok) {
                const errorResponse = await response.json(); // Parse the error response
                console.error("Stripe API error response:", errorResponse); // Debugging

                if (response.status === 404) {
                    throw new Error("Subscription not found. It may have already been canceled.");
                } else {
                    throw new Error(`Stripe API error: ${response.statusText}`);
                }
            }

            const canceledSubscription = await response.json();
            console.log("Subscription canceled:", canceledSubscription);

            // Update Firestore to reflect the canceled status
            const subscriptionRef = doc(db, "customers", username.uid, "subscriptions", subscriptionId);
            await updateDoc(subscriptionRef, {
                status: "canceled",
                canceled_at: new Date().toISOString(),
                role: "null"
            });

            // Reset subscription state in context
            setSubscription({
                role: null,
                statussub: "canceled",
                current_period_end: null,
                current_period_start: null,
                subscriptionId: null,
                stripeSubscriptionId: null,
            });

            alert("Subscription canceled successfully.");
            navigate('/'); // Redirect to the login page
        } catch (error) {
            console.error("Error canceling subscription:", error);
            alert(error.message); // Show a user-friendly error message
        }
    };

    // Update subscription in Firestore
    const updateSubscriptionInFirestore = async (user, subscription) => {
        try {
            await setDoc(doc(db, "customers", user.uid), {
                email: user.email,
                subscription: {
                    status: subscription?.statussub || "inactive",
                    plan: subscription?.role || "free",
                    startDate: new Date().toISOString(),
                },
            }, { merge: true }); // Use merge: true to update only the subscription field
            console.log("Subscription updated in Firestore!");
        } catch (error) {
            console.error("Error updating subscription in Firestore: ", error);
        }
    };

    // Update subscription in Firestore whenever subscription changes
    useEffect(() => {
        if (username && subscription) {
            updateSubscriptionInFirestore(username, subscription);
        }
    }, [username, subscription]);

    return (
        <div className="subscription-container">
            <div className='homelogoutstyle' onClick={handleLogout}><button>Logout</button></div>
            <h1 className="subscription-heading">Available Subscriptions</h1>
            {Object.keys(products).map((productId) => {
                const isCurrentPackage = subscription?.statussub !== "canceled" && products[productId].name?.toLowerCase().includes(subscription?.role);
                return (
                    <div key={productId} className="product-card">
                        <div className='productcard1'>
                            <div className='productname'>{products[productId].name}</div>
                            <div className='discription'>{products[productId].description}</div>
                            <div className='price'>$ {products[productId].prices.priceData.unit_amount / 100}</div>
                        </div>
                        <div className="product-price">
                            <button
                                className={isCurrentPackage ? 'currentpackage' : 'subscribe'}
                                onClick={() => !isCurrentPackage && handleSubscribe(products[productId].prices.priceId)}
                            >
                                {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                            </button>
                        </div>
                    </div>
                );
            })}
            {/* Show "Cancel Subscription" button only if there is an active subscription */}
            {subscription && subscription.statussub !== "canceled" && (
                <div className="cancel-subscription">
                    <button onClick={() => handleCancelSubscription(subscription.stripeSubscriptionId)}>
                        Cancel Subscription
                    </button>
                </div>
            )}
        </div>
    );
}
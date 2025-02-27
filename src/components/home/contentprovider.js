import React, { createContext, useState} from 'react';

const MyListContext = createContext();

export const MyListProvider = ({ children }) => {
    const [mylist, setmylist] = useState(()=>{
        const savedList = localStorage.getItem('mylist');
        return savedList ? JSON.parse(savedList) : [];
    });
    const [videoKey, setVideoKey] = useState('');
    const [type, setType] = useState('movie'); // Add state for type
     const [results,setResults] = useState([])
  const updateType = (newType) => {
    setType(newType);
    };
    
    // const handlemylist = (item) => {
     
    //         setMylist((prevMylist) => [...prevMylist, item]);
        
    // };

    // const removeFromMyList = (id) => {
    //     setMylist((prevMylist) => prevMylist.filter(item => item.id !== id));
    // };

    return (
        <MyListContext.Provider value={{ mylist, setmylist,type,updateType,results,setResults,videoKey,setVideoKey}}>
            {children}
        </MyListContext.Provider>
    );
};
export default MyListContext

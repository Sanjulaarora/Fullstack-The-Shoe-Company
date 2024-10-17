import React from 'react';
import { createContext, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/productSlice';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const { data } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const[search, setSearch] = useState('');
    const[searchResult, setSearchResult] = useState([]);
    const[selectedFilter, setSelectedFilter] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    //radio filter
    const handleChange = useCallback((e) =>{
        setSelectedFilter(e.target.value);
    }, []);

    //button filter
    const handleClick = useCallback((e) =>{
        e.preventDefault();
        setSelectedFilter(e.target.value);
    }, []);

    //Search and Advanced Filters
    useEffect(()=>{
        const filteredProducts= data.filter(item => (item.title.toLowerCase().includes(search.toLowerCase()))) ;

        const filteredFilter = data.filter(item => 
        ((item.category) === selectedFilter) ||
        ((item.color) === selectedFilter) ||
        ((item.company) === selectedFilter) ||
        ((item.newPrice) === selectedFilter) ||
        ((item.title) === selectedFilter))
    
        if(search){
        setSearchResult(filteredProducts);
        } else
        if(selectedFilter){
        setSearchResult(filteredFilter);
        }else {
        setSearchResult(filteredProducts);
        }
    
    },[data, search, selectedFilter]);

    return (
        <AppContext.Provider value={{
            search, setSearch, handleClick, handleChange, searchResult, user, setUser
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;
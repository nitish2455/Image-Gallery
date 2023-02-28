import { createContext, useState, useEffect } from "react";
import Background from "./components/Background";
import Images from "./components/Images";
import SearchField from "./components/SearchField";
import useAxios from "./hooks/useAxios";




// Create Context
export const ImageContext = createContext();

function App() {
   const[theme, setTheme] = useState("dark");
  const [searchImage, setSearchImage] = useState('');
  const {response, isLoading, error, fetchData} = useAxios(`search/photos?page=1&query=cats&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
  
   useEffect(() => {
    if(theme === "dark"){
      document.documentElement.classList.add("dark");
    } else{
      document.documentElement.classList.remove("dark");
    }
      },[theme]);

      const handleThemeSwitch = () => {
        setTheme(theme === "dark"?"light" : "dark");
        console.log()
      };

  const value = {
    response,
    isLoading,
    error,
    fetchData,
    searchImage,
    setSearchImage,
    
    
  }

  

  return (
    <ImageContext.Provider value={value}>
    <div className="h-full bg-white dark:bg-black"/>
    <Background >
      <SearchField />
     <button className="bg-gray-200 text-black rounded-3xl" onClick={handleThemeSwitch}>Dark Mode</button>


    </Background>
    <Images />
     <div/>
     </ImageContext.Provider>
  );
}

export default App;

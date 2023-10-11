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
      document.documentElement.classList.add("bg-black");
    } else{
      document.documentElement.classList.remove("bg-black");
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
     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2 right" onClick={handleThemeSwitch}>Dark Mode</button>
    <h1 className="text-center mt-6 underline text-2xl text-white">Results for {searchImage || 'Cats'}</h1>

    </Background>
    <Images />
     <div/>
     </ImageContext.Provider>
  );
}

export default App;

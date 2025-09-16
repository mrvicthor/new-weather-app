// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import Header from "./components/header";
import SearchBar from "./components/searchbar";

function App() {
  return (
    <>
      <Header />
      <main className="container mx-auto">
        <h1 className="text-center text-white text-[3.25rem] font-bold font-Bricolage">
          How’s the sky looking today?
        </h1>
        <SearchBar />
        <section className="grid lg:grid-cols-3 mt-12">
          <div className="lg:col-span-2">
            <div className="bg-[url('/assets/images/bg-today-large.svg')] w-[50rem] h-[17.875rem]"></div>
          </div>
          <div className="lg:col-span-1"></div>
        </section>
      </main>
    </>
  );
}

export default App;

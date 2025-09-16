// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocationStoreProvider } from "./providers/location.store.provider";

import Home from "./Pages/home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationStoreProvider>
        <Home />
      </LocationStoreProvider>
    </QueryClientProvider>
  );
}

export default App;

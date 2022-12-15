import Auth from "./routes/Auth";
import Error from "./routes/Error";
import Home from "./routes/Home";
import { useColorMode } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    errorElement: <Error />
  },
  {
    path: "/app",
    element: <Home />
  }
]);

const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_ANON_KEY
);

export const supabaseContext = createContext(supabaseClient);

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  if (colorMode == "light") {
    toggleColorMode();
  }

  return (
    <supabaseContext.Provider value={supabaseClient}>
      <RouterProvider router={router} />
    </supabaseContext.Provider>
  )
}

export default App;

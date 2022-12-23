import Auth from "./routes/Auth";
import Error from "./routes/Error";
import Home from "./routes/Home";
import Topic from "./routes/Topic";
import { useColorMode } from "@chakra-ui/react";
import { supabaseContext, supabaseClient } from "./context/SupabaseContext";
import { userContext } from "./context/UserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    errorElement: <Error />
  },
  {
    path: "/app",
    element: <Home />,
    children: [
      {
        path: ":topicName",
        element: <Topic />,
      }
    ]
  }
]);

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  if (colorMode == "light") {
    toggleColorMode();
  }

  return (
    <supabaseContext.Provider value={supabaseClient}>
      <userContext.Provider value={{ id: "", userName: "" }}>
        <RouterProvider router={router} />
      </userContext.Provider>
    </supabaseContext.Provider>
  )
}

export default App;

import SignIn from "./pages/SignIn";
import { useColorMode } from "@chakra-ui/react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  if (colorMode == "light") {
    toggleColorMode();
  }

  return <SignIn />;
}

export default App;

import {
  Container,
  VStack,
  Center,
  Heading,
  FormControl,
  Text,
  Input,
  Button,
  Spinner
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseContext } from "../context/SupabaseContext";
import { userContext } from "../context/UserContext";

export default function Auth() {
  const supabase = useContext(supabaseContext);
  const user = useContext(userContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setUser = (id: string, userName: string) => {
    user.id = id;
    user.userName = userName;
  }

  const handleSignUp = async () => {
    setIsLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email, password
    });

    if (signUpError) {
      console.error(signUpError);
      setIsLoading(false);
      return;
    }

    const { error } = await supabase
      .from("usuario")
      .insert({ id: data.user?.id, nome_usuario: data.user?.email });
    
    if (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }

    setUser(data.user?.id || "", data.user?.email || "");
    navigate("/app");
  }

  const handleSignIn = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email, password
    });

    if (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }

    setUser(data.user?.id || "", data.user?.email || "");
    navigate("/app");
  }

  return (
    <Container maxW="full" centerContent>
      <Center h="100vh">
        <VStack spacing="10">
          <Heading>Login</Heading>

          <VStack spacing="4">
            <FormControl>
              <Text>Email</Text>
              <Input placeholder="Seu email" value={email} onChange={e => setEmail(e.target.value)} />
            </FormControl>

            <FormControl>
              <Text>Senha</Text>
              <Input type="password" placeholder="Sua senha" value={password} onChange={e => setPassword(e.target.value)} />
            </FormControl>  
          </VStack>     

          <VStack w="full">
            <FormControl>
              <Button w="full" bg="blue.900" onClick={handleSignIn} disabled={isLoading}>
                { isLoading ? (
                  <Spinner />
                ) : (
                  "Entrar"
                )}
              </Button>
            </FormControl>

            <FormControl>
              <Button w="full" bg="blue.500" onClick={handleSignUp} disabled={isLoading}>
                { isLoading ? (
                  <Spinner />
                ) : (
                  "Registrar"
                )}
              </Button>
            </FormControl>
          </VStack>
        </VStack>
      </Center>
    </Container>
  );
}
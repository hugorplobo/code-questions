import {
  Container,
  VStack,
  Center,
  Heading,
  FormControl,
  Text,
  Input,
  Button
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseContext } from "../App";

export default function Auth() {
  const supabase = useContext(supabaseContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email, password
    });

    if (error) {
      console.error(error);
      return;
    }

    navigate("/app");
  }

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email, password
    });

    if (error) {
      console.error(error);
      return;
    }

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
              <Button w="full" bg="blue.900" onClick={handleSignIn}>
                Entrar
              </Button>
            </FormControl>

            <FormControl>
              <Button w="full" bg="blue.500" onClick={handleSignUp}>
                Registrar
              </Button>
            </FormControl>
          </VStack>
        </VStack>
      </Center>
    </Container>
  );
}
import {
  Container,
  VStack,
  Center,
  Heading,
  FormControl,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";

function SignIn() {
  return (
    <Container maxW="full" centerContent>
      <Center h="100vh">
        <VStack spacing="10">
          <Heading>Login</Heading>

          <FormControl>
            <Text>Nome de usuário</Text>
            <Input placeholder="Seu nome de usuário" />
          </FormControl>

          <FormControl>
            <Text>Senha</Text>
            <Input type="password" placeholder="Sua senha" />
          </FormControl>

          <FormControl>
            <Button w="full" bg="blue.900">
              Entrar
            </Button>
          </FormControl>
        </VStack>
      </Center>
    </Container>
  );
}

export default SignIn;

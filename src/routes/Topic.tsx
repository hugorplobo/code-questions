import { useContext } from "react";
import { supabaseContext } from "../context/SupabaseContext";
import { userContext } from "../context/UserContext";
import useSWR from "swr";
import { Center, Heading, HStack, Spinner } from "@chakra-ui/react";
import UserQuestions from "../components/UserQuestions";

interface UserResponse { 
  id: string;
  nome_usuario: string;
};

export default function Topic() {
  const supabase = useContext(supabaseContext);
  const user = useContext(userContext);
  const { data, error, isLoading } = useSWR("usuarios", async () => {
    return supabase
      .from("usuario")
      .select()
      .throwOnError()
      .then(res => res);
  });

  if (error) {
    console.error(error);

    return (
      <Center h="100vh">
        <Heading>Houve um erro, tente recarregar a página</Heading>
      </Center>
    );
  }

  if (data?.data) {
    data!.data! = data!.data!.filter((item: UserResponse) => item.id !== user.id);
  }

  return (
    <Center h="100vh">
      { isLoading ? (
        <Spinner size="xl" />
      ) : (
        <HStack maxW="calc(100vw - 250px)" spacing="10" overflowX="scroll">
          <UserQuestions userId={user.id} userName={user.userName} />
          { 
            data!.data!.map((item: UserResponse) => {
              return <UserQuestions key={item.id} userId={item.id} userName={item.nome_usuario} />
            })
          }
        </HStack>
      )}
    </Center>
  );
}

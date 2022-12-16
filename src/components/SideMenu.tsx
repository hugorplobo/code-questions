import { Box, VStack, Heading, Divider, Text, Spinner, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { supabaseContext } from "../App";
import { useContext } from "react";
import useSWR from "swr";

export default function SideMenu() {
  const supabase = useContext(supabaseContext);
  const navigate = useNavigate();

  const fetcher = async () => {
    return await supabase.from("assunto").select("nome").throwOnError().then(res => res);
  }

  const { data, error, isLoading } = useSWR("assuntos", fetcher);

  if (error) {
    console.error(error);
  }

  return (
    <Box w="56" h="100vh" bg="gray.700" overflowY="scroll">
      <VStack spacing="2" py="5" px="2.5">
        <Heading size="md">Conteúdos</Heading>
        <Divider></Divider>
        <VStack w="full">
          {
            data?.data ? (
              <>
                { data.data.map((item: { nome: string }) => (
                  <Button
                    key={item.nome}
                    variant="ghost"
                    colorScheme="teal"
                    w="full"
                    onClick={e => navigate(`/app/${item.nome}`)}
                  >
                    {item.nome}
                  </Button>
                )) }

                <Button variant="outline" colorScheme="teal" w="full" leftIcon={<AddIcon />}>
                  Novo
                </Button>
              </>
            ) : isLoading ? (
              <Spinner />
            ) : (
              <Text>Não foram encontrados dados</Text>
            )
          }
        </VStack>
      </VStack>
    </Box>
  );
}

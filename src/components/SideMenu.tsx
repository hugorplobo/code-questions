import { Box, VStack, Heading, Divider, Text, Spinner, Button, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { supabaseContext } from "../context/SupabaseContext";
import { useContext } from "react";
import useSWR from "swr";
import NewTopicModal from "./NewTopicModal";

export default function SideMenu() {
  const supabase = useContext(supabaseContext);
  const { topicName } = useParams<"topicName">();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetcher = async () => {
    return await supabase.from("assunto").select("nome").throwOnError().then(res => res);
  }

  const { data, error, isLoading, mutate } = useSWR("assuntos", fetcher);

  if (error) {
    console.error(error);
  }

  const handleAddNewTopic = (name: string) => {
    const newData = { ...data! };
    newData.data?.push({ nome: name });
    mutate(newData);
  }

  const generateTopicRoute = (name: string) => {
    return "/app/" + name.split(" ").join("-");
  }

  return (
    <Box w="250px" h="100vh" bg="gray.700" overflowY="scroll">
      <NewTopicModal isOpen={isOpen} onClose={onClose} onAdd={handleAddNewTopic} />
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
                    variant={topicName && topicName.split("-").join(" ") == item.nome ? "solid" : "ghost"}
                    colorScheme="teal"
                    w="full"
                    onClick={e => navigate(generateTopicRoute(item.nome))}
                  >
                    {item.nome}
                  </Button>
                )) }

                <Button
                  variant="outline"
                  colorScheme="teal"
                  w="full"
                  leftIcon={<AddIcon />}
                  onClick={onOpen}
                >
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

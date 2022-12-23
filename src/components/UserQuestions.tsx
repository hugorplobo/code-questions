import { useContext } from "react";
import { supabaseContext } from "../context/SupabaseContext";
import { userContext } from "../context/UserContext";
import useSWR from "swr";
import {
  Button,
  Card,
  CardBody,
  Center,
  Heading,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import NewQuestionModal from "./NewQuestionModal";

interface Props {
  userId: string;
  userName: string;
}

interface QuestionResponse {
  id_assunto: number;
  id_questao: number;
  nome_assunto: string;
  nome_questao: string;
  fonte: string;
}

export default function UserQuestions({ userId, userName }: Props) {
  const supabase = useContext(supabaseContext);
  const user = useContext(userContext);
  const { topicName } = useParams<"topicName">();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { data, error, isLoading, mutate } = useSWR(`questoes-${userId}-${topicName}`, async () => {
    return supabase
      .from("usuario_questao_assunto")
      .select()
      .eq("nome_assunto", topicName!.split("-").join(" "))
      .eq("id_usuario", userId)
      .throwOnError()
      .then((res) => {
        console.log(res);
        return res;
      });
  });

  if (error) {
    console.error(error);

    return (
      <Center>
        <Text>Houve um erro, tente recarregar a página</Text>
      </Center>
    );
  }

  const handleAdd = (name: string, font: string) => {
    const newData = { ...data! };
    newData.data?.push({ nome_questao: name, fonte: font });
    mutate(newData);
  }

  return (
    <VStack minW="250px">
      <NewQuestionModal isOpen={isOpen} onClose={onClose} onAdd={handleAdd} />
      <Heading size="sm">{userName}</Heading>
      <VStack bg="gray.600" w="full" minH="80vh" py="4" px="2.5" borderRadius="md">
        { isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : data!.data!.length === 0 ? (
          <Text>Nada por enquanto :D</Text>
        ) : (
          data!.data!.map((item: QuestionResponse) => {
            return (
              <Card key={`${item.id_questao}-${userId}`} w="full" cursor="pointer" onClick={e => window.open(item.fonte, "_blank")?.focus()}>
                <CardBody>
                  <Text>{item.nome_questao}</Text>
                </CardBody>
              </Card>
            )
          })
        )}

        { isLoading ? (
          null
        ) : (
          user.id === userId ? (
            <Button
              variant="outline"
              colorScheme="teal"
              w="full"
              leftIcon={<AddIcon />}
              onClick={onOpen}
            >
              Adicionar
            </Button>
          ) : null 
        )}
      </VStack>
    </VStack>
  );
}

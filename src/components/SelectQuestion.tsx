import { Button, Flex, FormControl, HStack, ModalBody, ModalFooter, Select, Spacer, Spinner, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { supabaseContext } from "../context/SupabaseContext";
import { userContext } from "../context/UserContext";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";

interface Question {
  id_questao: number;
  nome_questao: string;
  fonte: string;
}

interface Props {
  onAdd: (name: string, font: string) => void;
  onChangeModal: () => void;
}

export default function SelectQuestion({ onAdd, onChangeModal }: Props) {
  const supabase = useContext(supabaseContext);
  const user = useContext(userContext);
  const { topicName } = useParams<"topicName">();
  const [questionId, setQuestionId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { data, error, isLoading: isRequestLoading } = useSWR(`questoes-${topicName}`, async () => {
    return supabase
      .from("usuario_questao_assunto")
      .select("id_questao, nome_questao, fonte")
      .eq("nome_assunto", topicName?.split("-").join(" "))
      .throwOnError()
      .then(res => res);
  });

  if (error) {
    return <Text>Houve um erro, tente recarregar a página</Text>
  }

  const handleAdd = async () => {
    setIsLoading(true);

    await supabase.from("usuario_questao")
      .insert({ id_usuario: user.id, id_questao: questionId });
    
    const question = data!.data!.find(question => {
      return question.id_questao === questionId;
    });

    onAdd(question!.nome_questao, question!.fonte);
    setQuestionId(0);
    setIsLoading(false);
  }

  return (
    <>
      <ModalBody>
        <FormControl>
          <Text>Selecione uma questão</Text>
          <Select value={questionId} onChange={(e) => setQuestionId(Number(e.target.value))}>
            { isRequestLoading ? (
              <option value="nothing">Carregando</option>
            ) : (
              data!.data!.map(({ id_questao, nome_questao }: Question) => {
                return (
                  <option key={id_questao} value={id_questao}>
                    {nome_questao}
                  </option>
                );
              })
            )}
          </Select>
        </FormControl>
      </ModalBody>
      <ModalFooter>
          <HStack spacing="4">
            <Button colorScheme="teal" onClick={handleAdd}>
              { isLoading || isRequestLoading ? (
                <Spinner />
              ) : (
                "Adicionar"
              ) }
            </Button>
            <Button variant="outline" colorScheme="teal" onClick={onChangeModal} leftIcon={<AddIcon />}>
              { isLoading || isRequestLoading ? (
                <Spinner />
              ) : (
                "Criar"
              ) }
            </Button>
          </HStack>
      </ModalFooter>
    </>
  );
}

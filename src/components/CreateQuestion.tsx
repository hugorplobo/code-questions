import { AddIcon } from "@chakra-ui/icons";
import { Button, FormControl, Input, ModalBody, ModalFooter, Spinner, Text, VStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { supabaseContext } from "../context/SupabaseContext";
import { userContext } from "../context/UserContext";
import useSWR, { useSWRConfig } from "swr";

interface Props {
  onCreate: (name: string, font: string) => void;
}

export default function CreateQuestion({ onCreate }: Props) {
  const supabase = useContext(supabaseContext);
  const user = useContext(userContext);
  const { topicName } = useParams<"topicName">();

  const [name, setName] = useState("");
  const [font, setFont] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading: isRequestLoading} = useSWR(`assunto-${topicName}`, async () => {
    return supabase.from("assunto")
      .select("id")
      .eq("nome", topicName?.split("-").join(" "));
  });

  const handleCreate = async () => {
    setIsLoading(true);

    const question = await supabase.from("questao")
      .insert({ nome: name, fonte: font })
      .throwOnError()
      .select();
    
    await supabase.from("questao_assunto")
      .insert({ id_assunto: data!.data![0].id, id_questao: question!.data![0].id })
      .throwOnError();
    
    await supabase.from("usuario_questao")
      .insert({ id_usuario: user.id, id_questao: question!.data![0].id });
    
    onCreate(name, font);
    setIsLoading(false);
  }

  return (
    <>
      <ModalBody>
        <VStack spacing="4">
          <FormControl>
            <Text>Nome da questão</Text>
            <Input
              placeholder="Digite o nome da questão"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <Text>Site da questão</Text>
            <Input 
              placeholder="https://leetcode.com/..."
              value={font}
              onChange={e => setFont(e.target.value)}
            />
          </FormControl>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          variant="solid"
          onClick={handleCreate}
        >
          { isLoading || isRequestLoading ? (
            <Spinner />
          ) : (
            "Criar"
          )}
        </Button>
      </ModalFooter>
    </>
  );
}

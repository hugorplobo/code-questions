import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text } from "@chakra-ui/react";
import { supabaseContext } from "../context/SupabaseContext";
import { useContext, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export default function NewTopicModal({ isOpen, onClose, onAdd }: Props) {
  const supabase = useContext(supabaseContext);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    setIsLoading(true);

    await supabase.from("assunto")
      .insert({ nome: name });
    
    onClose();
    onAdd(name);
    setName("");
    setIsLoading(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar novo conteúdo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Text>Nome</Text>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nome do conteúdo"/>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" onClick={handleAdd}>
            { isLoading ? (
              <Spinner />
            ) : (
              "Adicionar"
            ) }
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

import { Modal, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";
import CreateQuestion from "./CreateQuestion";
import SelectQuestion from "./SelectQuestion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, font: string) => void;
}

export default function NewQuestionModal({ isOpen, onClose, onAdd }: Props) {
  const [isAddingNewQuestion, setIsAddingNewQuestion] = useState(false);

  const handleClose = () => {
    onClose();
    setIsAddingNewQuestion(false);
  }

  const handleAddOrCreate = (name: string, font: string) => {
    handleClose();
    onAdd(name, font);
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar questão</ModalHeader>
        { isAddingNewQuestion ? (
          <CreateQuestion onCreate={handleAddOrCreate} />
        ) : (
          <SelectQuestion onChangeModal={() => setIsAddingNewQuestion(true)} onAdd={handleAddOrCreate} />
        )}
      </ModalContent>
    </Modal>
  )
}
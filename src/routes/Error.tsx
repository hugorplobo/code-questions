import { Container, Center, VStack, Heading, Text } from "@chakra-ui/react";

export default function Error() {
    return (
        <Container maxW="100vw">
            <Center h="100vh">
                <VStack>
                    <Heading>404</Heading>
                    <Text>Essa página não existe</Text>
                </VStack>
            </Center>
        </Container>
    );
}
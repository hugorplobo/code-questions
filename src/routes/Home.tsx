import SideMenu from "../components/SideMenu";
import { Container } from "@chakra-ui/react";

export default function Home() {
    return (
        <Container maxW="full" p="0">
            <SideMenu />
        </Container>
    );
}
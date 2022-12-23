import SideMenu from "../components/SideMenu";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { userContext } from "../context/UserContext";
import { useContext } from "react";

export default function Home() {
  const user = useContext(userContext);
  const navigate = useNavigate();

  if (user.id === "") {
    navigate("/");
  }

  return (
    <Container minW="full" p="0">
      <Grid h="100vh" templateColumns="250px auto">
        <GridItem>
          <SideMenu />
        </GridItem>

        <GridItem>
          <Outlet />
        </GridItem>
      </Grid>
    </Container>
  );
}

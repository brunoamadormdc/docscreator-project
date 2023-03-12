import { Box, Heading, SimpleGrid,Container as Cont } from "@chakra-ui/react";
import ContainerCreate from "../../Components/ContainerCreate/ContainerCreate";
import Title from "../../Components/UI/Title";

export default function Container() {
    return (
        <>
            <Cont maxW={'container.lg'} p={'10'} centerContent>
                <SimpleGrid columns={1} spacing={3}>
                    <Box>
                        <Heading as='h2' textAlign={'center'} fontSize={'30px'} size='2xl' noOfLines={2}>Criar Campos</Heading>
                    </Box>
                    <Box>
                        <Heading as='h4' textAlign={'center'} fontSize={'18px'} fontWeight={'normal'} size='2xl' noOfLines={2}>Crie os campos para cadastrar os dados que irá utilizar nos documentos</Heading>
                    </Box>
                </SimpleGrid>
            </Cont>



            <ContainerCreate />
        </>
    );
}
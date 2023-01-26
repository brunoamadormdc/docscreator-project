import ContainerCreate from "../../Components/ContainerCreate/ContainerCreate";
import Title from "../../Components/UI/Title";

export default function Container() {
    return (
        <>
        <Title title={`Criar Campos`} subtitle={`Crie os campos para cadastrar os dados que irá utilizar nos documentos`}/>
        <ContainerCreate />
        </>
    );
}
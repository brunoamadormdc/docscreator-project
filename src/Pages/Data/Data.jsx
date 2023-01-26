import DataCreate from "../../Components/DataCreate/DataCreate";
import Title from "../../Components/UI/Title";

export default function Data() {
    return (
        <>
            <Title title={`Criar Dados`} subtitle={`Crie dados para inserir dinamicamente nos documentos`} />
            <DataCreate />
        </>
    )
}
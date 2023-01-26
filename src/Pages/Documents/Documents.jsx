import DocumentCreate from "../../Components/DocumentCreate/DocumentCreate"
import Title from "../../Components/UI/Title"

export default function Document() {
    return (
        <>
            <Title title={`Criar Documentos`} subtitle={`Crie seus documentos dinâmicos`} />
            <DocumentCreate />
        </>
    )
}
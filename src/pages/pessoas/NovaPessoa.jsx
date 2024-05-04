import  axios  from "axios"
import { useRef, } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const NovaPessoa = () => {

    const formRef = useRef(null)
    const navigate = useNavigate()

    const savePerson = async(event) => {
        event.preventDefault()
        
        const formData = new FormData(formRef.current)
        
        const name = formData.get("name")
        const endereco = formData.get("endereco")
        const telefone = formData.get("telefone")
        const cpf = formData.get("cpf")

        const person = {
            name: name,
            endereco: endereco,
            telefone: telefone,
            cpf: cpf,
        }

        try {
            const {data} = await axios.post("https://65ec995d0ddee626c9b0a87f.mockapi.io/api/v1/pessoas", person)

            if(data.id) {
                toast.success("Pessoa salva com sucesso")
                navigate("/pessoas")
            }
        } catch (error) {
            toast.error("Erro ao salvar pessoa")
        }
    }
    return(
        <PersonContainer className="container">
            <div className="row">
                <div className="col-12 text-center mt-5">
                    <h1>Nova Pessoa</h1>
                </div>

                <div className="col">
                    <form ref={formRef} onSubmit={savePerson}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="name" name="name"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="endereco" className="form-label">Endereço</label>
                            <input type="endereco" className="form-control" id="endereco" name="endereco"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="telefone" className="form-label">Telefone</label>
                            <input type="telefone" className="form-control" id="telefone" name="telefone"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cpf" className="form-label">CPF</label>
                            <input type="cpf" className="form-control" id="cpf" name="cpf"/>
                        </div>

                        <div className="col d-grid col-12 col-md-4">
                            <button className="btn btn-primary">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </PersonContainer>
    )
}

export default NovaPessoa

const PersonContainer = styled.div`

    .btn-primary {
        background-color: #A020F0;
        border: none;
        &:hover {
            background-color: #aa37f2;
        }
    }

`


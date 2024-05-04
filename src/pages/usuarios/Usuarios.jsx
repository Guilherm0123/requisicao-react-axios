import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([])

    const listarUsuarios =  async() => {
        try {
            const {data} = await axios.get("https://65ec995d0ddee626c9b0a87f.mockapi.io/api/v1/users")
            setUsuarios(data);
        } catch (error) {
           
            toast.error("Erro ao buscar usuários")
        }
    }

    const deleteUser = async(id) => {
        try {
            const {data} = await axios.delete(`https://65ec995d0ddee626c9b0a87f.mockapi.io/api/v1/users/${id}`)

            if(data.id) {
                toast.success("Usuario removido com sucesso")
                const novaLista = usuarios.filter(item => item.id !== id)
                setUsuarios(novaLista)
            }else {
                toast.error("Erro ao remover usuário")
            }

        } catch (error) {
            toast.error("Erro ao remover usuário")
        }
    }

    useEffect(() => {
        listarUsuarios()
    },[])

    return(
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <h1>Usuários</h1>
                </div>
                
                <div className="col-12">
                    <div>
                        
                        <Link to="/usuarios/novo">
                            <ButtonContainer >Adicionar</ButtonContainer>
                        </Link>
                    </div>
                    <table className="table table-striped table-bordered table-hover table-sm">
                    <thead className="table table-dark">
                        <tr>
                        <th scope="col">Avatar</th>
                        <th scope="col">Nome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map(item => (
                                <tr key={item.id}>
                                <th>
                                    <img src={item.avatar} alt="" width={30}/>
                                </th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <Link to={`/usuarios/${item.id}`}>
                                        <button className="btn btn-warning btn-sm"><FaRegEdit /> </button>
                                    </Link>
                                    <button className="btn btn-danger btn-sm " onClick={() => deleteUser(item.id) }><FaRegTrashCan /> </button>
                                </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </table>
                </div>
            </div>
        </div>   
    )
}

export default Usuarios

const ButtonContainer = styled.button`
    border-radius: 8px;
    height: 40px;
    border: none;
    margin-bottom: 20px;
    background: #000000 ;
    color: white;
`
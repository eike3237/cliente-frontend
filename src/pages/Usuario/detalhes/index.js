import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Usuario extends Component {
    state = {
        usuario: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/usuarios/${id}`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({ usuario }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { usuario, index } = this.state;
 
        if (usuario.ativo) {
            usuario.ativo = "Usuário Ativo";
        } else {
            usuario.ativo = "Usuário Inativo";
        }
 
        return (
            <div className="usuario-info">
                <h1 id="user"> {usuario.nome} </h1>
                <h1> Estado =  {usuario.ativo} </h1>
                <h1> Salário = {usuario.salario} </h1>
                <h1> Data de Nascimento = {new Date(usuario.dataNascimento).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })} </h1>
                <br />
                <div className="buttons">
                    <Link to={`/usuarios`}><button type="button" class="btn btn-secondary"> Voltar </button></Link> <br />
                    <Link to={`/editarUsuario/${usuario.id}`}><button type="button" class="btn btn-warning"> Editar </button></Link> <br />
                    <Link to={`/deletarUsuario/${usuario.id}`}> <button type="button" class="btn btn-danger"> Deletar </button> </Link> <br />
                </div>
            </div >
        );
    }
}

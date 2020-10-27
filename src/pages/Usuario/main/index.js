
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {/*Metodo construtor*/
        super(props);

        this.state = {/*React trabalha com estado, caso tenha usuario ele armazena se não já resulta null*/
            usuario: [],
            erro: null
        };
    }

    componentDidMount() { /*é executado sempre após um metodo construtor, antes de renderizar no metodo render*/
        fetch(`http://localhost:3003/sistema/usuarios`)/*ele acessa o backend*/
            .then(usuario =>/*arrow function comum*/
                usuario.json().then(usuario => this.setState({ usuario }))/*armazena no state usuario os usuarios que foram pegos do bd "usuario"*/
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { usuario } = this.state;
        //return usuario.map((usuario, index) => (/*usuario.map é um loop pique for each, que vai executar para cada usuario*/
                /*Daqui pra baixo é a definição html/css de como será exibido os dados pegos. Ex.:
                entre tag H5 será exibido o nome do usuario, pego do BD por usuario.nome.*/
        return(
            <div className="usuario-list">
                <Link to={`criarUsuario`}><button type="button" class="btn btn-primary">Criar</button></Link>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Salário</th>
                            <th scope="col">Data de Nascimento</th>
                            <th scope="col">Ativo</th>
                            <th scope="col">Detalhes</th>
                            <th scope="col">Atualizar</th>
                            <th scope="col">Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuario.map((usuario, index) => (
                            <tr>
                                <th scope="row">{usuario.id}</th>
                                <td>{usuario.nome}</td>
                                <td>{usuario.salario.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})}</td>
                                <td>{new Date(usuario.dataNascimento).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                <td>{usuario.ativo ? "Sim" : "Não"}</td>
                                <td>< Link to={`/usuarios/${usuario.id}`}>
                                    <button type="button" class="btn btn-outline-primary">
                                    Acessar</button></ Link>
                                    </td>
                                <td><Link to={`/editarUsuario/${usuario.id}`}>
                                    <button type="button" class="btn btn-outline-success">Atualizar
                                    </button></Link></td>
                                <td><Link to={`/deletarUsuario/${usuario.id}`}>
                                    <button type="button" class="btn btn-outline-danger">Deletar
                                    </button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    };
}

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ContatoService from "./services/contatoService.js";
import "./styles.css";

function Contatos() {

  const navigate = useNavigate();
  let [contatos, setContatos] = useState([]);
  let [mensagem, setMensagem] = useState({texto: "", tipo: ""});
  let mensagemTimeoutRef = useRef(null);
  let contatoService = useRef(new ContatoService()).current; //Não precisa acessar .current é apenas o serviço mesmo
  
  useEffect(() => {
    contatoService.getContatos().then((lista)=>{
      setContatos(lista);
    });
  }, []);//Dependências observam mudança de estados e re-renderiza novamente o componente

  function mostrarMensagem(tipo, texto){
    setMensagem({tipo, texto});
  }

  function deletar(contato){
    if(window.confirm("Deseja deletar o contato: "+contato.nome)){
      contatoService.deleteContato(contato.id).then((contatos)=>{
        setContatos(contatos);
        if (mensagemTimeoutRef.current) {
            clearTimeout(mensagemTimeoutRef.current);
        }
        mostrarMensagem("success", "Contato deletado com sucesso!");
        mensagemTimeoutRef.current = setTimeout(()=>{
          setMensagem({tipo: "", texto: ""});
        }, 3000);
      });
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 meus-contatos">
          <h4>Meus Contatos</h4>
          <hr></hr>
          {
            (mensagem.texto && mensagem.tipo) ? 
            <div className={`alert alert-${mensagem.tipo}`} role="alert">
              {mensagem.texto}
            </div>
            : ''
          }
          
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {(!contatos.length) ? <tr><td colSpan="4" align="center">Nenhum registro carregado.</td></tr> : ''}
              {contatos.map(c => (
                <tr key={c.id}>
                  <td>{c.nome}</td>
                  <td>{c.email}</td>
                  <td>{c.telefone}</td>
                  <td>
                    <button className="btn btn-info btn-sm" onClick={()=>navigate(`/contatos/save/${c.id}`)}>Editar</button>
                    &nbsp;
                    <button className="btn btn-danger btn-sm" onClick={()=>{deletar(c)}}>Detetar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
  
export default Contatos;
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ContatoService from '../services/contatoService';
import './styles.css';

function Search() {

  const navigate = useNavigate();
  let [term, setTerm] = useState("");
  let [contatosEncontrados, setContatosEncontrados] = useState([]);
  let listaTimeoutRef = useRef(null);//Usado para evitar re-Render (sempre recria a variavel)
  let contatoService = useRef(new ContatoService()).current;//A instância da classe já é uma referência

  function buscarContato(e){
    let codes = [37,38,39,40];
    if(codes.includes(e.keyCode)){
      return;
    }
    if(e.target.value.length > 2 && e.target.value.length <= 23){
      if(term !== e.target.value){
        if(listaTimeoutRef.current){
          clearTimeout(listaTimeoutRef.current);
        }
        listaTimeoutRef.current = setTimeout(()=>{
          setTerm(e.target.value);
        }, 200);
      }
    }else{
      setContatosEncontrados([]);
      setTerm("");
    }
  }

  useEffect(()=>{
    if(term.trim()){
      contatoService.searchContatos(term.trim()).then((result)=>{
        setContatosEncontrados(result);
      });
    }
  }, [term]);

  return (
    <form className="form-inline contatos-busca">
      <input className="form-control mr-sm-2" type="text" placeholder="Digite aqui" maxLength="23" onKeyUp={(e)=>{buscarContato(e)}}/>
      {(contatosEncontrados.length) ?
      <ul className="list-group">
        {contatosEncontrados.map(c => (
          <li key={c.id} className="list-group-item">
            <a href={"/contatos/save/"+c.id} onClick={(e)=>{e.preventDefault(); navigate("/contatos/save/"+c.id);}}>{c.nome}</a>
          </li>
        ))}
      </ul> : ''}
    </form>
  );
}
  
export default Search;
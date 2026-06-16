import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContatoService from '../services/contatoService';

import "./styles.css";

function Save() {
  
  let { id } = useParams()
  const navigate = useNavigate();
  let contatoService = useRef(new ContatoService()).current;

  const [formData, setFormData] = useState({
    id: 0,
    nome: "",
    email: "",
    telefone: ""
  });

  const [formInvalid, setFormInvalid] = useState({
    nome: false,
    email: false,
    telefone: false
  });

  function salvarContato(e){
    e.preventDefault();
    let sanitazed = {}; 
    for(const [key, value] of Object.entries(formData)){
      sanitazed[key] = (typeof value === "string") ? value.trim() : value;
    }
    if(id){//update
      contatoService.updateContato(sanitazed).then((result) => { 
        navigate(`/contatos/`);
      });
    }else{//create
      contatoService.createContato(sanitazed).then((result) => { 
        navigate(`/contatos/`);
      });
    }
  }

  function setFormField(element){
    setFormInvalid({...formInvalid, [element.name]: !element.value.trim()});
    setFormData({...formData, [element.name]: element.value})
  }

  function setFormFieldVisited(element){
    if(!element.value.trim()){
      setFormInvalid({...formInvalid, [element.name]: true});
    }
  }

  useEffect(()=>{
    if(id){
      contatoService.getContatoById(id).then((formItem)=>{
        setFormData(formItem);
      });
    }else{
      contatoService.getLastId().then((lastId)=>{
        setFormData({id: lastId, nome: "", email: "", telefone: ""});
      });
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12 salvar-contato">
          <h4>Cadastro Contato</h4>
          <hr/>
          <form noValidate onSubmit={(e)=>{salvarContato(e)}}>
            <div className="form-group">
              <label htmlFor="nome" className="form-label">Nome</label><br/>
              <input type="text" className="form-control" id="nome" name="nome" required value={formData.nome} onChange={(e)=>{ setFormField(e.target)}} onBlur={(e)=>{ setFormFieldVisited(e.target) }}/>
              <small className="form-text text-danger">
                {(formInvalid.nome) ? 'Este campo é obrigatório' : ''}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label><br/>
              <input type="email" className="form-control" id="email" name="email" required value={formData.email} onChange={(e)=>{setFormField(e.target)}} onBlur={(e)=>{ setFormFieldVisited(e.target) }}/>
              <small className="form-text text-danger">
                {(formInvalid.email) ? 'Este campo é obrigatório' : ''}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="telefone" className="form-label">Telefone</label><br/>
              <input type="tel" className="form-control" id="telefone" name="telefone" required value={formData.telefone}  onChange={(e)=>{setFormField(e.target)}} onBlur={(e)=>{ setFormFieldVisited(e.target) }}/>
              <small className="form-text text-danger">
                {(formInvalid.telefone) ? 'Este campo é obrigatório' : ''}
              </small>
            </div>
            <button type="submit" className="btn btn-success btn-sm">Salvar</button>&nbsp;
            <button type="button" className="btn btn-secondary btn-sm" onClick={(e)=>{e.preventDefault(); window.history.back();}}>Voltar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Save;
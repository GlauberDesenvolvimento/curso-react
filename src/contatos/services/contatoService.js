import { CONTATOS } from "./mock";

export default class ContatoService{

    static contatos = [...CONTATOS];

    simulateSlowly(data){
        return new Promise(resolve => {
            setTimeout(resolve, 100);
        }).then(()=>data);
    }

    getContatos(){
        return this.simulateSlowly(ContatoService.contatos);
    }

    getContatoById(id){
        let item = ContatoService.contatos.find((c) => c.id === parseInt(id));
        return this.simulateSlowly(item);
    }

    searchContatos(term){
        let searchedContatos = ContatoService.contatos.filter((c) => {
            return (
                c.nome.toUpperCase().includes(term.toUpperCase()) || 
                c.email.toUpperCase().includes(term.toUpperCase()) || 
                c.telefone.toUpperCase().includes(term.toUpperCase())
            )
        });
        return this.simulateSlowly(searchedContatos);
    }

    updateContato(newItem){
        ContatoService.contatos = ContatoService.contatos.map(function(oldItem){
            if(oldItem.id === parseInt(newItem.id)){
                return newItem;
            }
            return oldItem;
        });
        return Promise.resolve(newItem);
    }

    createContato(item){
        ContatoService.contatos.push(item);
        return Promise.resolve(item);
    }

    deleteContato(id){
        ContatoService.contatos = ContatoService.contatos.filter((c)=>{
            return c.id !== parseInt(id);
        })
        return Promise.resolve(ContatoService.contatos);
    }

    getLastId(){
        return Promise.resolve(ContatoService.contatos.length ? Math.max(...ContatoService.contatos.map(c => c.id)) + 1 : 1)
    }
}
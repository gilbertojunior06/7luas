import { PaginaType } from "../types";
import "./style/Contato.css";


type ContatoProps = {
  setPagina: (pagina: PaginaType) => void;
};

export default function Contato({ setPagina }: ContatoProps) {
  return (
    <div className="contato-container">
      <button className="voltar" onClick={() => setPagina("home")}>
        ← Voltar
      </button>
      <h2 className="page-title">Contato</h2>
      <form>
        <label>Nome</label>
        <input type="text" />
        <label>Mensagem</label>
        <textarea />
        <button className="turma-btn whatsapp">Enviar</button>
      </form>
    </div>
  );
}

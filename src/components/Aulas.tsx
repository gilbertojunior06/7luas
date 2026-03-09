import { PaginaType } from "../types";
import "./style/Aulas.css";


type AulasProps = {
  setPagina: (pagina: PaginaType) => void;
};

export default function Aulas({ setPagina }: AulasProps) {
  return (
    <div className="aulas-container">
      <button className="voltar" onClick={() => setPagina("home")}>
        ← Voltar
      </button>
      <h2 className="page-title">Aulas</h2>
      <ul>
        <li>segunda - feiras das 09:00 as 13:00</li>
        <li>terca - feira das 09:00 as 13:00</li>
        <li>quarta - feira das 09:00 as 13:00</li>
        <li>quinta feira - feira das 09:00 as 13:00</li>
        <li>sabado  das 10:00 as 14:00</li>
      </ul>
    </div>
  );
}

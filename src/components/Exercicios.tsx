import { PaginaType } from "../types";
import "./style/Exercicios.css";


type ExerciciosProps = {
  setPagina: (pagina: PaginaType) => void;
};

export default function Exercicios({ setPagina }: ExerciciosProps) {
  return (
    <div className="exercicios-container">
      <button className="voltar" onClick={() => setPagina("home")}>
        ← Voltar
      </button>
      <h2 className="page-title">Exercícios</h2>
      <ul>
        <li>Agachamento</li>
        <li>Flexão</li>
      </ul>
    </div>
  );
}

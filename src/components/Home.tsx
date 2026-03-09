import { TurmaType, PaginaType } from "../types";
import lua from "../lua.jpg";
import "./style/Home.css";

type HomeProps = {
  turmas: TurmaType[];
  setPagina: (pagina: PaginaType) => void;
  setTurmaSelecionada: (turma: TurmaType) => void;
};

export default function Home({ turmas, setPagina, setTurmaSelecionada }: HomeProps) {
  return (
    <div className="layout">
      <header className="header">
        <img src={lua} alt="Logo 7 Luas" className="logo-img" />
      </header>

      <main className="home-container">
        <div className="turmas">
          {turmas.map((turma) => (
            <button
              key={turma.nome}
              className={`turma-btn ${turma.nome.includes("Iniciante") ? "iniciante" : "avancada"}`}
              onClick={() => {
                setTurmaSelecionada(turma);
                setPagina("turma");
              }}
            >
              {turma.nome}
            </button>
          ))}

          <button className="turma-btn aulas" onClick={() => setPagina("aulas")}>Aulas</button>
          <button className="turma-btn alongamentos" onClick={() => setPagina("alongamentos")}>Alongamentos</button>
          <button className="turma-btn exercicios" onClick={() => setPagina("exercicios")}>Exercícios</button>
          <button className="turma-btn contato" onClick={() => setPagina("contato")}>Contato</button>
        </div>
      </main>

      <footer className="footer">
        {/* ícones sociais */}
      </footer>
    </div>
  );
}

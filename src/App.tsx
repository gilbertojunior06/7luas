import { useState } from "react";
import { PaginaType, TurmaType } from "./types";
import Home from "./components/Home";
import Turma from "./components/Turma";
import Aulas from "./components/Aulas";
import Contato from "./components/Contato";
import Alongamentos from "./components/Alongamentos";
import Exercicios from "./components/Exercicios";
import Footer from "./components/Footer";

const turmas: TurmaType[] = [
  { nome: "Turma Iniciante", alunos: ["Gisele Silverio", "Natalia Silva", "Carol da Silva"] },
  { nome: "Turma Avançada", alunos: ["Maria Souza", "João Silva"] }
];

function App() {
  const [pagina, setPagina] = useState<PaginaType>("home");
  const [turmaSelecionada, setTurmaSelecionada] = useState<TurmaType | null>(null);

  return (
    <div className="App">
      <main className="content">
        {pagina === "home" && (
          <Home turmas={turmas} setPagina={setPagina} setTurmaSelecionada={setTurmaSelecionada} />
        )}
        {pagina === "turma" && turmaSelecionada && (
          <Turma turmaSelecionada={turmaSelecionada} setPagina={setPagina} />
        )}
        {pagina === "aulas" && <Aulas setPagina={setPagina} />}
        {pagina === "contato" && <Contato setPagina={setPagina} />}
        {pagina === "alongamentos" && <Alongamentos setPagina={setPagina} />}
        {pagina === "exercicios" && <Exercicios setPagina={setPagina} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;

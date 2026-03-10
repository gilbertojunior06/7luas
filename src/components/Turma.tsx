import { useState } from "react";
import { TurmaType, PaginaType } from "../types";
import "./style/Turma.css";

type TurmaProps = {
  turmaSelecionada: TurmaType;
  setPagina: (pagina: PaginaType) => void;
};

function gerarDiasDoMes(mes: number, ano: number, diasSemanaSelecionados: number[]) {
  const dias: string[] = [];
  const ultimoDia = new Date(ano, mes, 0).getDate();
  for (let dia = 1; dia <= ultimoDia; dia++) {
    const data = new Date(ano, mes - 1, dia);
    const diaSemana = data.getDay();
    if (diasSemanaSelecionados.includes(diaSemana)) {
      dias.push(`${dia.toString().padStart(2, "0")}/${mes.toString().padStart(2, "0")}`);
    }
  }
  return dias;
}

export default function Turma({ turmaSelecionada, setPagina }: TurmaProps) {
  const [mesSelecionado, setMesSelecionado] = useState<number>(3); 
  const [anoSelecionado, setAnoSelecionado] = useState<number>(2026);
  const [diasSemanaSelecionados, setDiasSemanaSelecionados] = useState<number[]>([1, 3]);
  const [chamada, setChamada] = useState<Record<string, Record<string, string>>>({});

  const diasDeAula = gerarDiasDoMes(mesSelecionado, anoSelecionado, diasSemanaSelecionados);

  const alternarChamada = (aluno: string, dia: string) => {
    setChamada((prev) => {
      const alunoKey = `${aluno}-${anoSelecionado}`; // Chave única por aluno/ano
      const alunoChamada = prev[alunoKey] || {};
      const valorAtual = alunoChamada[dia];
      
      let novoValor = "";
      if (!valorAtual) novoValor = "P";
      else if (valorAtual === "P") novoValor = "F";
      else if (valorAtual === "F") novoValor = "A";
      else novoValor = "";

      return {
        ...prev,
        [alunoKey]: { ...alunoChamada, [dia]: novoValor },
      };
    });
  };

  const mudarMes = (direcao: number) => {
    setMesSelecionado((prev) => {
      let novoMes = prev + direcao;
      if (novoMes < 1) {
        setAnoSelecionado(a => a - 1);
        return 12;
      }
      if (novoMes > 12) {
        setAnoSelecionado(a => a + 1);
        return 1;
      }
      return novoMes;
    });
  };

  const toggleDiaSemana = (valor: number) => {
    setDiasSemanaSelecionados((prev) =>
      prev.includes(valor) ? prev.filter((d) => d !== valor) : [...prev, valor]
    );
  };

  return (
    <div className="turma-page">
      <header className="turma-header">
        <button className="voltar" onClick={() => setPagina("home")}>← Voltar</button>
        <h2 className="page-title">{turmaSelecionada.nome}</h2>
      </header>

      <section className="filtros-modernos">
        <div className="seletor-tempo-container">
          <button className="seta-principal" onClick={() => mudarMes(-1)}>❮</button>
          
          <div className="info-data">
            <span className="mes-extenso">
              {new Date(anoSelecionado, mesSelecionado - 1).toLocaleString('pt-BR', { month: 'long' })}
            </span>
            <div className="ano-controls">
              <button onClick={() => setAnoSelecionado(a => a - 1)}>−</button>
              <span className="ano-numero">{anoSelecionado}</span>
              <button onClick={() => setAnoSelecionado(a => a + 1)}>+</button>
            </div>
          </div>

          <button className="seta-principal" onClick={() => mudarMes(1)}>❯</button>
        </div>

        <div className="dias-semana-chips">
          {[1, 2, 3, 4, 5, 6].map((d) => (
            <button 
              key={d} 
              className={`chip-dia ${diasSemanaSelecionados.includes(d) ? 'ativo' : ''}`}
              onClick={() => toggleDiaSemana(d)}
            >
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"][d]}
            </button>
          ))}
        </div>
      </section>

      <div className="tabela-container">
        <div className="tabela-scroll">
          <table>
            <thead>
              <tr>
                <th className="col-fixa">Aluno</th>
                {diasDeAula.map((dia) => <th key={dia}>{dia}</th>)}
              </tr>
            </thead>
            <tbody>
              {turmaSelecionada.alunos.map((aluno: string) => (
                <tr key={aluno}>
                  <td className="col-fixa nome-aluno">{aluno}</td>
                  {diasDeAula.map((dia) => {
                    const status = chamada[`${aluno}-${anoSelecionado}`]?.[dia];
                    return (
                      <td 
                        key={dia} 
                        onClick={() => alternarChamada(aluno, dia)}
                        className={`celula-presenca ${status === "P" ? "p" : status === "F" ? "f" : status === "A" ? "a" : ""}`}
                      >
                        {status || "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
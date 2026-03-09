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
    const diaSemana = data.getDay(); // 0=Dom, 1=Seg, ..., 6=Sab
    if (diasSemanaSelecionados.includes(diaSemana)) {
      dias.push(`${dia.toString().padStart(2, "0")}/${mes.toString().padStart(2, "0")}`);
    }
  }
  return dias;
}

export default function Turma({ turmaSelecionada, setPagina }: TurmaProps) {
  const [mesSelecionado, setMesSelecionado] = useState<number>(3);
  const [diasSemanaSelecionados, setDiasSemanaSelecionados] = useState<number[]>([1, 3]);
  const [chamada, setChamada] = useState<Record<string, Record<string, string>>>({});

  const diasDeAula = gerarDiasDoMes(mesSelecionado, 2026, diasSemanaSelecionados);

  const alternarChamada = (aluno: string, dia: string) => {
    setChamada((prev) => {
      const alunoChamada = prev[aluno] || {};
      const valorAtual = alunoChamada[dia];
      const novoValor = valorAtual === "P" ? "F" : "P";
      return {
        ...prev,
        [aluno]: {
          ...alunoChamada,
          [dia]: novoValor,
        },
      };
    });
  };

  const toggleDiaSemana = (valor: number) => {
    setDiasSemanaSelecionados((prev) =>
      prev.includes(valor) ? prev.filter((d) => d !== valor) : [...prev, valor]
    );
  };

  return (
    <div className="turma-page">
      <button className="voltar" onClick={() => setPagina("home")}>
        ← Voltar
      </button>
      <h2 className="page-title">{turmaSelecionada.nome}</h2>

      <div className="filtros">
        <label>
          Mês:
          <select value={mesSelecionado} onChange={(e) => setMesSelecionado(Number(e.target.value))}>
            <option value={1}>Janeiro</option>
            <option value={2}>Fevereiro</option>
            <option value={3}>Março</option>
            <option value={4}>Abril</option>
            <option value={5}>Maio</option>
            <option value={6}>Junho</option>
            <option value={7}>Julho</option>
            <option value={8}>Agosto</option>
            <option value={9}>Setembro</option>
            <option value={10}>Outubro</option>
            <option value={11}>Novembro</option>
            <option value={12}>Dezembro</option>
          </select>
        </label>

        <div className="dias-semana">
          <label><input type="checkbox" checked={diasSemanaSelecionados.includes(1)} onChange={() => toggleDiaSemana(1)} /> Seg</label>
          <label><input type="checkbox" checked={diasSemanaSelecionados.includes(2)} onChange={() => toggleDiaSemana(2)} /> Ter</label>
          <label><input type="checkbox" checked={diasSemanaSelecionados.includes(3)} onChange={() => toggleDiaSemana(3)} /> Qua</label>
          <label><input type="checkbox" checked={diasSemanaSelecionados.includes(4)} onChange={() => toggleDiaSemana(4)} /> Qui</label>
          <label><input type="checkbox" checked={diasSemanaSelecionados.includes(5)} onChange={() => toggleDiaSemana(5)} /> Sex</label>
        </div>
      </div>

      <div className="tabela-scroll">
        <table>
          <thead>
            <tr>
              <th>Aluno</th>
              {diasDeAula.map((dia) => (
                <th key={dia}>{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {turmaSelecionada.alunos.map((aluno: string) => (
              <tr key={aluno}>
                <td className="aluno">{aluno}</td>
                {diasDeAula.map((dia) => (
                  <td key={dia} onClick={() => alternarChamada(aluno, dia)}>
                    {chamada[aluno]?.[dia] === "P" && <span className="presente">P</span>}
                    {chamada[aluno]?.[dia] === "F" && <span className="falta">F</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

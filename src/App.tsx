import "./App.css";
import { useState } from "react";

type Aluno = { nome: string };
type Turma = { nome: string; alunos: Aluno[] };

const turmas: Turma[] = [
  {
    nome: "Turma Iniciante",
    alunos: [
      { nome: "Gisele Silverio" },
      { nome: "Natalia Silva" },
      { nome: "Carol da Silva" },
    ],
  },
  {
    nome: "Turma Avançada",
    alunos: [
      { nome: "Maria Oliveira" },
      { nome: "Fernanda Souza" },
    ],
  },
];

// Dias simulados: apenas terça e quinta
const diasDoMes: number[] = [2, 4, 9, 11, 16, 18, 23, 25, 30];

function App() {
  const [pagina, setPagina] = useState<"home" | "turma" | "aulas">("home");
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma | null>(null);
  const [presencas, setPresencas] = useState<Record<string, string>>({});
  const [mensagem, setMensagem] = useState<string>("");

  const marcar = (aluno: string, dia: number, valor: string) => {
    const chave = `${aluno}-${dia}`;
    setPresencas({ ...presencas, [chave]: valor });

    setMensagem(
      valor === "P"
        ? `${aluno} marcado como Presente no dia ${dia}`
        : valor === "F"
        ? `${aluno} marcado como Falta no dia ${dia}`
        : `${aluno} limpo no dia ${dia}`
    );

    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <div className="App">
      {pagina === "home" && (
        <div className="turmas">
          {/* Logo 7 Luas */}
          <div className="logo-container">
            <h1 className="logo-text">7 Luas</h1>
            <div className="luas">
              {Array.from({ length: 0 }).map((_, i) => (
                <div key={i} className="lua"></div>
              ))}
            </div>
          </div>

          {/* Botões das turmas */}
          {turmas.map((turma) => (
            <button
              key={turma.nome}
              className={`turma-btn ${
                turma.nome.includes("Iniciante") ? "iniciante" : "avancada"
              }`}
              onClick={() => {
                setTurmaSelecionada(turma);
                setPagina("turma");
              }}
            >
              {turma.nome}
            </button>
          ))}

          {/* Botão Aulas */}
          <button className="turma-btn aulas" onClick={() => setPagina("aulas")}>
            Aulas 
          </button>

          {/* Botão Localização */}
          <button
            className="turma-btn localizacao"
            onClick={() =>
              window.open(
                "https://www.google.com/maps?q=Av.+Ragueb+Chohfi,+444+-+São+Mateus,+São+Paulo+-+SP,+08375-000",
                "_blank"
              )
            }
          >
            📍 Localização da Sala
          </button>

          {/* Botão WhatsApp */}
          <button
            className="turma-btn whatsapp"
            onClick={() =>
              window.open(
                "https://wa.me/5511998800966?text=Olá,%20gostaria%20de%20informações%20sobre%20as%20aulas",
                "_blank"
              )
            }
          >
            📞 WhatsApp
          </button>
        </div>
      )}

      {pagina === "turma" && turmaSelecionada && (
        <div className="chamada">
          <button className="voltar" onClick={() => setPagina("home")}>
            ← Voltar
          </button>
          <h2>{turmaSelecionada.nome}</h2>
          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th>Aluno</th>
                  {diasDoMes.map((dia) => (
                    <th key={dia}>{dia}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {turmaSelecionada.alunos.map((aluno) => (
                  <tr key={aluno.nome}>
                    <td>{aluno.nome}</td>
                    {diasDoMes.map((dia) => {
                      const chave = `${aluno.nome}-${dia}`;
                      return (
                        <td key={dia}>
                          <button
                            className={
                              presencas[chave] === "P"
                                ? "presente"
                                : presencas[chave] === "F"
                                ? "falta"
                                : ""
                            }
                            onClick={() =>
                              marcar(
                                aluno.nome,
                                dia,
                                presencas[chave] === "P"
                                  ? "F"
                                  : presencas[chave] === "F"
                                  ? ""
                                  : "P"
                              )
                            }
                          >
                            {presencas[chave] === "P"
                              ? "✔"
                              : presencas[chave] === "F"
                              ? "✖"
                              : ""}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {pagina === "aulas" && (
        <div className="aulas-container">
          <button className="voltar" onClick={() => setPagina("home")}>
            ← Voltar
          </button>
          <h2>Horários das Aulas</h2>
          <ul>
            <li>segunda- feira: 10h00 – 13h00</li>
            <li>Terça-feira: 09h00 – 12h00</li>
            <li>Quinta-feira: 09h00 – 12h00</li>
            <li>sexta-feira: 10h00 – 13h00</li>
          </ul>
        </div>
      )}

      {mensagem && (
        <div
          className={`snackbar ${
            mensagem.includes("Presente")
              ? "presente"
              : mensagem.includes("Falta")
              ? "falta"
              : "limpo"
          }`}
        >
          {mensagem}
        </div>
      )}
    </div>
  );
}

export default App;

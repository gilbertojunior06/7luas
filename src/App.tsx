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

const diasDoMes: number[] = [2, 4, 9, 11, 16, 18, 23, 25, 30];

function App() {
  const [pagina, setPagina] = useState<"home" | "turma" | "aulas" | "contato">("home");
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
          <div className="logo-container">
            <img 
                  src="https://scontent-gru1-2.xx.fbcdn.net/v/t39.30808-6/327594339_586363646199883_7458059908283760702_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=nsGOZY3vzFoQ7kNvwGqhOos&_nc_oc=AdkatNoZ4MD2bYJSxNyjYh6komUyFzFkXW0Jp-NaBTtWztbr0C9yoHjwgo17G9a6t5F6eauwjZ78Nq7rwNRI2XxN&_nc_zt=23&_nc_ht=scontent-gru1-2.xx&_nc_gid=zSG4UXZRkVbHv97gHlcj-g&_nc_ss=8&oh=00_Afxi0_TaodU6UoeupANC7CujAJpRHuLcW7uw56v2pHhUVw&oe=69AFE2C9" 
                  alt="Logo 7 Luas" 
                  className="logo-img" 
                />

          </div>

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

          <button className="turma-btn aulas" onClick={() => setPagina("aulas")}>
            Aulas
          </button>

          <button
            className="turma-btn localizacao"
            onClick={() =>
              window.open(
                "https://www.google.com/maps?q=Av.+Ragueb+Chohfi,+444+-+São+Mateus,+São+Paulo+-+SP,+08375-000",
                "_blank"
              )
            }
          >
            Localização
          </button>

          <button className="turma-btn whatsapp" onClick={() => setPagina("contato")}>
            Contato
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
            <li>Segunda-feira: 10h00 – 13h00</li>
            <li>Terça-feira: 09h00 – 12h00</li>
            <li>Quinta-feira: 09h00 – 12h00</li>
            <li>Sexta-feira: 10h00 – 13h00</li>
          </ul>
        </div>
      )}

      {pagina === "contato" && (
        <div className="contato-container">
          <button className="voltar" onClick={() => setPagina("home")}>
            ← Voltar
          </button>
          <h2>Entre em Contato</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Mensagem enviada com sucesso!");
            }}
          >
            <div>
              <label>Nome:</label>
              <input type="text" required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" required />
            </div>
            <div>
              <label>Mensagem:</label>
              <textarea required />
            </div>
            <button type="submit" className="turma-btn whatsapp">
              Enviar
            </button>
          </form>
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

      {/* Rodapé com ícones */}
      <footer className="footer">
      <a href="https://www.instagram.com/explore/locations/108651894794963/sala-7-luas-dancas-e-terapias/" target="_blank" rel="noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="social-icon" />
      </a>
      <a href="https://www.facebook.com/sala7luas/" target="_blank" rel="noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="social-icon" />
      </a>
      <a href="https://wa.me/5511994994145" target="_blank" rel="noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="social-icon" />
      </a>
      </footer>

    </div>
  );
}

export default App;

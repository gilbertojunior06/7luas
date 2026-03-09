import { PaginaType } from "../types";
import "./style/Alongamentos.css";

type AlongamentosProps = {
  setPagina: (pagina: PaginaType) => void;
};

export default function Alongamentos({ setPagina }: AlongamentosProps) {
  return (
    <div className="alongamentos-container">
      <button className="voltar" onClick={() => setPagina("home")}>
        ← Voltar
      </button>
      <h2 className="page-title">Alongamentos</h2>

      <h3>Principais Exercícios de Alongamento e Aquecimento:</h3>
      <ul>
        <li><strong>Rotação de Ombros:</strong> Mover os ombros para trás e para baixo para melhorar a postura.</li>
        <li><strong>Alongamento Lateral:</strong> Com uma mão na cintura, estenda o outro braço sobre a cabeça, inclinando o corpo para a lateral.</li>
        <li><strong>Aquecimento de Quadril:</strong> Encaixar e desencaixar o quadril, e movimentos laterais (para os lados).</li>
        <li><strong>Coluna e Abdômen:</strong> Deitado, dobrar os joelhos e tombá-los para os lados, alongando a região lombar e abdominal.</li>
        <li><strong>Alongamento Geral:</strong> Afastar as pernas, dobrar os joelhos levemente e descer o tronco para a frente, desenrolando a coluna lentamente ao subir.</li>
        <li><strong>Pescoço:</strong> Rotações suaves e inclinações laterais para relaxar a cervical.</li>
      </ul>

      <h3>Dicas para Prática:</h3>
      <ul>
        <li><strong>Respiração:</strong> Inspire e expire profundamente durante os movimentos.</li>
        <li><strong>Postura:</strong> Mantenha os joelhos relaxados (levemente dobrados) e o abdômen contraído.</li>
        <li><strong>Frequência:</strong> Realizar alongamentos diariamente, mesmo que brevemente (ex: 10 minutos), ajuda na flexibilidade e no aprendizado.</li>
      </ul>
    </div>
  );
}

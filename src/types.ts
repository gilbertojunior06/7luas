export type PaginaType =
  | "home"
  | "turma"
  | "aulas"
  | "contato"
  | "alongamentos"
  | "exercicios";

export type TurmaType = {
  nome: string;
  alunos: string[];
};

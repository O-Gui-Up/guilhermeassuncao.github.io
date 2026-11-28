
const AREAS_VALIDAS = [
  "Humanas",
  "Linguagens",
  "Matemática",
  "Natureza",
  "Informática"
];

const SECOES_VALIDAS = [
  "Reflexão Crítica",
  "Conexões Interdisciplinares",
  "Aprendizados da Escola para a Vida",
  "Fundamentos Teóricos",
  "Participação em Sala de Aula",
  "Projetos e Trabalhos Desenvolvidos"
];

export default class ConteudoPortfolio {
  constructor({ secao, bimestre = null, area_conhecimento, descricao }) {
    if (!SECOES_VALIDAS.includes(secao)) {
      throw new Error("A seção informada é inválida.");
    }

    if (!AREAS_VALIDAS.includes(area_conhecimento)) {
      throw new Error("A área de conhecimento é inválida.");
    }

    if (
      bimestre !== null &&
      (!Number.isInteger(bimestre) || bimestre < 1 || bimestre > 4)
    ) {
      throw new Error("O bimestre deve ser um número de 1 a 4 ou null.");
    }

    if (typeof descricao !== "string" || !descricao.trim()) {
      throw new Error("A descrição é obrigatória.");
    }

    this.secao = secao;
    this.bimestre = bimestre;
    this.area_conhecimento = area_conhecimento;
    this.descricao = descricao.trim();
  }
}

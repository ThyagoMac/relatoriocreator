export type PriorityLevel = 'Urgente' | 'Alta' | 'Média' | 'Baixa';

export type DemandType = 'Configuração' | 'Nova demanda' | 'Sustentação' | 'Garantia';

export type DemandSource = 'Levantamento de Requisitos' | 'Inspeção de Sistemas' | 'E-mail';

export type ActivityType =
  | 'Definir arquitetura'
  | 'Montar ambiente arquitetural'
  | 'Modelar BD/Configurar BD/ Intervenção no BD'
  | 'Configurar sistemas e/ou ambiente'
  | 'Elaborar Relatório'
  | 'Desenvolver back-end'
  | 'Desenvolver front-end'
  | 'Integrar sistemas'
  | 'Desenvolver serviço'
  | 'Desenvolver rotina'
  | 'Teste caixa branca (manual)'
  | 'Teste caixa preta (unitário)'
  | 'Criar massa de teste'
  | 'Merge de versões'
  | 'Consultas ao Sistema';

export type DeveloperLevel = 'Trainee' | 'Júnior' | 'Pleno' | 'Sênior' | 'Especialista';

export type ComplexityLevel = 'Baixa' | 'Média' | 'Intermediária' | 'Alta' | 'Especialista';

export interface Evidence {
  id: string;
  imagens: string[];
  descricao: string;
}

export interface Demand {
  id: string;
  titulo: string;
  nivelPrioridade: PriorityLevel;
  tipoDemanda: DemandType;
  demandaSolicitadaVia: DemandSource;
  responsavelTecnico: string;
  atividadesRealizadas: ActivityType[];
  breveDescricao: string;
  ferramentasTecnologias: string;
  ambienteDSV: string;
  repositorioImplementacoes: string;
  nomeFuncionalidadeTela: string;
  perfilDesenvolvedor: DeveloperLevel;
  complexidadeDemanda: ComplexityLevel;
  evidencias: Evidence[];
  // Campos antigos para compatibilidade (deprecated)
  evidenciaImagem?: string | null;
  evidenciaTexto?: string;
}

export interface GeneralData {
  logoEmpresa: string | null;
  nomeUsuario: string;
  prepostoGerente: string;
  responsavelTecnico: string;
  fiscalContrato: string;
  titulo: string;
  imagemCapa: string | null;
  subtitulo: string;
  objetivoArtefato: string;
  numeroContrato: string;
  numeroOS: string;
  detalhamentoOS: string;
  objetivoERS: string;
  data: string;
  autorEmail: string;
  descricao: string;
}

export interface Report {
  generalData: GeneralData;
  demands: Demand[];
}

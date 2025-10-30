import { z } from 'zod';

export const demandSchema = z.object({
  id: z.string(),
  titulo: z.string().min(1, 'Título é obrigatório'),
  nivelPrioridade: z.enum(['Urgente', 'Alta', 'Média', 'Baixa'] as const, {
    message: 'Nível de prioridade é obrigatório',
  }),
  tipoDemanda: z.enum(['Configuração', 'Nova demanda', 'Sustentação', 'Garantia'] as const, {
    message: 'Tipo da demanda é obrigatório',
  }),
  demandaSolicitadaVia: z.enum(
    ['Levantamento de Requisitos', 'Inspeção de Sistemas', 'E-mail'] as const,
    {
      message: 'Demanda solicitada via é obrigatório',
    }
  ),
  responsavelTecnico: z.string().min(1, 'Responsável Técnico é obrigatório'),
  atividadesRealizadas: z
    .array(
      z.enum([
        'Definir arquitetura',
        'Montar ambiente arquitetural',
        'Modelar BD/Configurar BD/ Intervenção no BD',
        'Configurar sistemas e/ou ambiente',
        'Elaborar Relatório',
        'Desenvolver back-end',
        'Desenvolver front-end',
        'Integrar sistemas',
        'Desenvolver serviço',
        'Desenvolver rotina',
        'Teste caixa branca (manual)',
        'Teste caixa preta (unitário)',
        'Criar massa de teste',
        'Merge de versões',
        'Consultas ao Sistema',
      ] as const)
    )
    .min(1, 'Pelo menos uma atividade deve ser selecionada'),
  breveDescricao: z.string().min(1, 'Breve descrição é obrigatória'),
  ferramentasTecnologias: z.string().min(1, 'Ferramentas e Tecnologias é obrigatório'),
  ambienteDSV: z.string().min(1, 'Ambiente dsv é obrigatório'),
  repositorioImplementacoes: z.string().min(1, 'Repositório com as implementações é obrigatório'),
  nomeFuncionalidadeTela: z.string().min(1, 'Nome da Funcionalidade/Tela é obrigatório'),
  perfilDesenvolvedor: z.enum(['Trainee', 'Júnior', 'Pleno', 'Sênior', 'Especialista'] as const, {
    message: 'Perfil do desenvolvedor é obrigatório',
  }),
  complexidadeDemanda: z.enum(
    ['Baixa', 'Média', 'Intermediária', 'Alta', 'Especialista'] as const,
    {
      message: 'Complexidade da demanda é obrigatória',
    }
  ),
  evidenciaImagem: z.string().nullable(),
  evidenciaTexto: z.string().min(1, 'Evidência (texto) é obrigatória'),
});

export type DemandFormData = z.infer<typeof demandSchema>;

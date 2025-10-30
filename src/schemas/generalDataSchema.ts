import { z } from 'zod';

export const generalDataSchema = z.object({
  logoEmpresa: z.string().nullable(),
  nomeUsuario: z.string().min(1, 'Nome do usuário é obrigatório'),
  prepostoGerente: z.string().min(1, 'Preposto/Gerente de Projetos é obrigatório'),
  responsavelTecnico: z.string().min(1, 'Responsável Técnico é obrigatório'),
  fiscalContrato: z.string().min(1, 'Fiscal do Contrato é obrigatório'),
  titulo: z.string().min(1, 'Título é obrigatório'),
  imagemCapa: z.string().nullable(),
  subtitulo: z.string().min(1, 'Sub-título é obrigatório'),
  objetivoArtefato: z.string().min(1, 'Objetivo deste artefato é obrigatório'),
  numeroContrato: z.string().min(1, 'Nº do Contrato é obrigatório'),
  numeroOS: z.string().min(1, 'Nº da OS é obrigatório'),
  detalhamentoOS: z.string().min(1, 'Detalhamento da OS é obrigatório'),
  objetivoERS: z.string().min(1, 'Objetivo desta ERS é obrigatório'),
  data: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data deve estar no formato dd/mm/aaaa'),
  autorEmail: z.string().email('E-mail inválido').min(1, 'Autor (e-mail) é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
});

export type GeneralDataFormData = z.infer<typeof generalDataSchema>;

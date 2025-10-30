import type { Report, GeneralData, Demand } from '../types/report';
import { formatCurrentDate } from './date';

const STORAGE_KEY = 'relatorio_tecnico';

/**
 * Salva o relatório completo no LocalStorage
 */
export function saveReport(report: Report): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(report));
  } catch (error) {
    console.error('Erro ao salvar no LocalStorage:', error);
  }
}

/**
 * Carrega o relatório completo do LocalStorage
 */
export function loadReport(): Report | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as Report;
  } catch (error) {
    console.error('Erro ao carregar do LocalStorage:', error);
    return null;
  }
}

/**
 * Salva apenas os dados gerais
 */
export function saveGeneralData(data: GeneralData): void {
  const report = loadReport() || { generalData: data, demands: [] };
  report.generalData = data;
  saveReport(report);
}

/**
 * Carrega os dados gerais
 */
export function loadGeneralData(): GeneralData | null {
  const report = loadReport();
  return report?.generalData || null;
}

/**
 * Salva as demandas
 */
export function saveDemands(demands: Demand[]): void {
  const report = loadReport() || {
    generalData: getDefaultGeneralData(),
    demands: [],
  };
  report.demands = demands;
  saveReport(report);
}

/**
 * Carrega as demandas
 */
export function loadDemands(): Demand[] {
  const report = loadReport();
  return report?.demands || [];
}

/**
 * Retorna dados gerais padrão
 */
export function getDefaultGeneralData(): GeneralData {
  return {
    logoEmpresa: null,
    nomeUsuario: '',
    prepostoGerente: '',
    responsavelTecnico: '',
    fiscalContrato: '',
    titulo: 'Relatório Técnico de Desenvolvimento',
    imagemCapa: null,
    subtitulo: 'SISTEMA SIF',
    objetivoArtefato:
      'O objetivo deste documento é detalhar os elementos desenvolvidos durante a Sprint, relacionados ao módulo específico do sistema e demais alterações solicitadas durante as revisões.',
    numeroContrato: '',
    numeroOS: '',
    detalhamentoOS: 'Demandas de novo projeto, sustentação e correções (garantia), realizadas durante a sprint.',
    objetivoERS: 'Detalhamento das entregas da demanda de desenvolvimento front-end, referente a implementação do mês.',
    data: formatCurrentDate(),
    autorEmail: '',
    descricao: 'Relatório Técnico',
  };
}

/**
 * Converte um arquivo de imagem para base64
 */
export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Erro ao converter imagem'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

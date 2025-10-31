import Dexie, { type Table } from "dexie";
import type { Report, GeneralData, Demand } from "../types/report";
import { formatCurrentDate } from "./date";

const STORAGE_KEY = "relatorio_tecnico";

// Configuração do IndexedDB com Dexie
class ReportDatabase extends Dexie {
  reports!: Table<{ id: string; data: Report; updatedAt: Date }>;

  constructor() {
    super("ReportDatabase");
    this.version(1).stores({
      reports: "id, updatedAt",
    });
  }
}

const db = new ReportDatabase();

/**
 * Migra dados do LocalStorage para IndexedDB (se houver)
 */
async function migrateFromLocalStorage(): Promise<void> {
  try {
    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) {
      const report = JSON.parse(localData) as Report;
      await db.reports.put({
        id: "current-report",
        data: report,
        updatedAt: new Date(),
      });
      console.log("✅ Dados migrados do LocalStorage para IndexedDB");
      // Remove do LocalStorage após migração bem-sucedida
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error("Erro ao migrar dados do LocalStorage:", error);
  }
}

/**
 * Salva o relatório completo no IndexedDB
 */
export async function saveReport(report: Report): Promise<void> {
  try {
    const data = JSON.stringify(report);
    const sizeInMB = new Blob([data]).size / (1024 * 1024);

    console.log(`📊 Tamanho do relatório: ${sizeInMB.toFixed(2)}MB`);

    await db.reports.put({
      id: "current-report",
      data: report,
      updatedAt: new Date(),
    });

    console.log("✅ Relatório salvo com sucesso no IndexedDB");
  } catch (error) {
    console.error("Erro ao salvar no IndexedDB:", error);
    alert(
      "Erro ao salvar o relatório. Por favor, tente novamente ou entre em contato com o suporte."
    );
    throw error;
  }
}

/**
 * Carrega o relatório completo do IndexedDB
 */
export async function loadReport(): Promise<Report | null> {
  try {
    // Primeiro tenta migrar dados do LocalStorage se houver
    await migrateFromLocalStorage();

    // Carrega do IndexedDB
    const record = await db.reports.get("current-report");
    return record?.data || null;
  } catch (error) {
    console.error("Erro ao carregar do IndexedDB:", error);
    return null;
  }
}

/**
 * Salva apenas os dados gerais
 */
export async function saveGeneralData(data: GeneralData): Promise<void> {
  const report = (await loadReport()) || { generalData: data, demands: [] };
  report.generalData = data;
  await saveReport(report);
}

/**
 * Carrega os dados gerais
 */
export async function loadGeneralData(): Promise<GeneralData | null> {
  const report = await loadReport();
  return report?.generalData || null;
}

/**
 * Salva as demandas
 */
export async function saveDemands(demands: Demand[]): Promise<void> {
  const report = (await loadReport()) || {
    generalData: getDefaultGeneralData(),
    demands: [],
  };
  report.demands = demands;
  await saveReport(report);
}

/**
 * Carrega as demandas
 */
export async function loadDemands(): Promise<Demand[]> {
  const report = await loadReport();
  return report?.demands || [];
}

/**
 * Retorna dados gerais padrão
 */
export function getDefaultGeneralData(): GeneralData {
  return {
    logoEmpresa: null,
    nomeUsuario: "",
    prepostoGerente: "",
    responsavelTecnico: "",
    fiscalContrato: "",
    titulo: "Relatório Técnico de Desenvolvimento",
    imagemCapa: null,
    subtitulo: "SISTEMA SIF",
    objetivoArtefato:
      "O objetivo deste documento é detalhar os elementos desenvolvidos durante a Sprint, relacionados ao módulo específico do sistema e demais alterações solicitadas durante as revisões.",
    numeroContrato: "",
    numeroOS: "",
    detalhamentoOS:
      "Demandas de novo projeto, sustentação e correções (garantia), realizadas durante a sprint.",
    objetivoERS:
      "Detalhamento das entregas da demanda de desenvolvimento front-end, referente a implementação do mês.",
    data: formatCurrentDate(),
    autorEmail: "",
    descricao: "Relatório Técnico",
  };
}

/**
 * Converte um arquivo de imagem para base64 com compressão e redimensionamento
 */
export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Configurações de compressão
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        const QUALITY = 0.7; // 70% de qualidade para JPEG

        let width = img.width;
        let height = img.height;

        // Redimensiona mantendo a proporção se necessário
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }

        // Cria canvas para redimensionar/comprimir
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Erro ao criar contexto do canvas"));
          return;
        }

        // Desenha a imagem redimensionada
        ctx.drawImage(img, 0, 0, width, height);

        // Converte para base64 com compressão
        // Usa JPEG para melhor compressão, exceto se for PNG com transparência
        const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
        const base64 = canvas.toDataURL(mimeType, QUALITY);

        resolve(base64);
      };

      img.onerror = () => reject(new Error("Erro ao carregar imagem"));

      if (typeof e.target?.result === "string") {
        img.src = e.target.result;
      } else {
        reject(new Error("Erro ao ler arquivo"));
      }
    };

    reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
    reader.readAsDataURL(file);
  });
}

import { lazy, Suspense } from "react";
import { Button } from "./ui/Button";
import { ReportPreview } from "./ReportPreview";
import type { Report } from "../types/report";

// Lazy load do PDFDownloadLink e PDFDocument
const PDFDownloadLink = lazy(() =>
  import("@react-pdf/renderer").then((module) => ({
    default: module.PDFDownloadLink,
  }))
);

const PDFDocument = lazy(() =>
  import("./PDFDocument").then((module) => ({
    default: module.PDFDocument,
  }))
);

interface ReportExportProps {
  report: Report;
}

export function ReportExport({ report }: ReportExportProps) {
  // Função para gerar o nome do arquivo
  const generateFileName = () => {
    const { numeroOS, subtitulo, nomeUsuario, data } = report.generalData;

    // Formatar data para dd-mm-aaaa
    let dataFormatada = "";
    if (data) {
      const dataObj = new Date(data);
      if (!isNaN(dataObj.getTime())) {
        const dia = String(dataObj.getDate()).padStart(2, "0");
        const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
        const ano = dataObj.getFullYear();
        dataFormatada = `${dia}-${mes}-${ano}`;
      } else {
        // Se a data já estiver em formato dd/mm/aaaa ou similar
        dataFormatada = data.replace(/\//g, "-");
      }
    }

    // Sanitizar strings para remover caracteres inválidos em nomes de arquivos
    const sanitize = (str: string) => str.replace(/[<>:"/\\|?*]/g, "_").trim();

    const nomeArquivo = `OS.${sanitize(
      numeroOS
    )}_ORC_IMP_MANTER_SISTEMA_${sanitize(subtitulo)}_DEV-${sanitize(
      nomeUsuario
    )}_${dataFormatada}.pdf`;

    return nomeArquivo;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-4 mb-6">
        <Suspense
          fallback={
            <Button disabled>
              <svg
                className="animate-spin h-4 w-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Carregando...
            </Button>
          }
        >
          <PDFDownloadLink
            document={<PDFDocument report={report} />}
            fileName={generateFileName()}
          >
            {({ loading }) => (
              <Button disabled={loading}>
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Gerando PDF...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Exportar PDF
                  </>
                )}
              </Button>
            )}
          </PDFDownloadLink>
        </Suspense>
      </div>

      <div className="bg-white">
        <ReportPreview report={report} />
      </div>
    </div>
  );
}

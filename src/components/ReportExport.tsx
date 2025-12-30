import { Button } from "./ui/Button";
import { ReportPreview } from "./ReportPreview";
import type { Report } from "../types/report";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

interface ReportExportProps {
  report: Report;
}

// Estilos para o PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  coverPage: {
    padding: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    maxWidth: 80,
    maxHeight: 80,
    marginBottom: 20,
    objectFit: "contain",
  },
  coverImage: {
    maxWidth: 400,
    maxHeight: 300,
    marginBottom: 20,
    objectFit: "contain",
  },
  evidenceImage: {
    maxWidth: "100%",
    maxHeight: 400,
    marginTop: 8,
    marginBottom: 8,
    objectFit: "contain",
  },
  table: {
    marginTop: 20,
    border: "1px solid #000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
  },
  tableCell: {
    padding: 8,
    borderRight: "1px solid #000",
    fontSize: 10,
    justifyContent: "center",
  },
  tableCellBold: {
    padding: 8,
    borderRight: "1px solid #000",
    fontSize: 10,
    fontWeight: "bold",
    justifyContent: "center",
  },
  tableCellHeader: {
    padding: 8,
    borderRight: "1px solid #000",
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor: "#fbe5d5",
    textAlign: "center",
    justifyContent: "center",
  },
  demandSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  demandTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 8,
  },
  fieldValue: {
    fontSize: 10,
    marginTop: 4,
  },
  highlightedBox: {
    backgroundColor: "#fbe5d5",
    padding: 10,
    marginTop: 8,
  },
  approvalSection: {
    marginTop: 40,
  },
  approvalBox: {
    border: "2px solid #000",
    marginTop: 20,
  },
  approvalHeader: {
    backgroundColor: "#fbe5d5",
    padding: 8,
    borderBottom: "2px solid #000",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  approvalSubHeader: {
    padding: 6,
    borderBottom: "2px solid #000",
    textAlign: "center",
    fontSize: 10,
  },
  approvalContent: {
    padding: 40,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
  },
  gridWithBorder: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "2px solid #fbe5d5",
    paddingBottom: 8,
    marginBottom: 8,
  },
});

// Componente de Documento PDF
const PDFDocument = ({ report }: { report: Report }) => {
  const { generalData, demands } = report;

  return (
    <Document>
      {/* Página de Capa */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.title}>{generalData.titulo}</Text>

        {generalData.imagemCapa && (
          <Image src={generalData.imagemCapa} style={styles.coverImage} />
        )}

        <Text style={styles.subtitle}>{generalData.subtitulo}</Text>

        {generalData.logoEmpresa && (
          <Image src={generalData.logoEmpresa} style={styles.logo} />
        )}

        {/* Tabela de Histórico de Versão */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text
              style={[
                styles.tableCellHeader,
                { width: "100%", borderRight: "none" },
              ]}
            >
              Objetivo deste artefato
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text
              style={[styles.tableCell, { width: "100%", borderRight: "none" }]}
            >
              {generalData.objetivoArtefato}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { width: "25%" }]}>
              Nº do Contrato:
            </Text>
            <Text style={[styles.tableCell, { width: "75%" }]}>
              {generalData.numeroContrato}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { width: "25%" }]}>
              Nº da Os:
            </Text>
            <Text style={[styles.tableCell, { width: "75%" }]}>
              {generalData.numeroOS}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { width: "25%" }]}>
              Detalhamento da OS:
            </Text>
            <Text style={[styles.tableCell, { width: "75%" }]}>
              {generalData.detalhamentoOS}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text
              style={[
                styles.tableCellHeader,
                { width: "100%", borderRight: "none" },
              ]}
            >
              O(s) objetivo(s) desta ERS é (são)
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text
              style={[styles.tableCell, { width: "100%", borderRight: "none" }]}
            >
              {generalData.objetivoERS}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text
              style={[
                styles.tableCellHeader,
                { width: "100%", borderRight: "none" },
              ]}
            >
              Controle de alterações do documento
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { width: "33.33%" }]}>
              Data
            </Text>
            <Text style={[styles.tableCellHeader, { width: "33.33%" }]}>
              Autor (e-mail)
            </Text>
            <Text
              style={[
                styles.tableCellHeader,
                { width: "33.33%", borderRight: "none" },
              ]}
            >
              Descrição
            </Text>
          </View>
          <View style={[styles.tableRow, { borderBottom: "none" }]}>
            <Text
              style={[
                styles.tableCell,
                { width: "33.33%", textAlign: "center" },
              ]}
            >
              {generalData.data}
            </Text>
            <Text
              style={[
                styles.tableCell,
                { width: "33.33%", textAlign: "center" },
              ]}
            >
              {generalData.autorEmail}
            </Text>
            <Text
              style={[
                styles.tableCell,
                { width: "33.33%", textAlign: "center", borderRight: "none" },
              ]}
            >
              {generalData.descricao}
            </Text>
          </View>
        </View>
      </Page>

      {/* Páginas de Demandas */}
      {demands.map((demand, index) => (
        <>
          <Page key={demand.id} size="A4" style={styles.page}>
            <View style={styles.demandSection}>
              <Text style={styles.demandTitle}>
                • DEMANDA {String(index + 1).padStart(2, "0")}: {demand.titulo}
              </Text>
              <View style={styles.gridWithBorder}>
                <View style={styles.gridItem}>
                  <Text style={styles.fieldLabel}>Nível de prioridade:</Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.nivelPrioridade === "Urgente"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.nivelPrioridade === "Urgente" ? "x" : " "}) Urgente
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.nivelPrioridade === "Alta"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.nivelPrioridade === "Alta" ? "x" : " "}) Alta
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.nivelPrioridade === "Média"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.nivelPrioridade === "Média" ? "x" : " "}) Média
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.nivelPrioridade === "Baixa"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.nivelPrioridade === "Baixa" ? "x" : " "}) Baixa
                  </Text>
                </View>

                <View style={styles.gridItem}>
                  <Text style={styles.fieldLabel}>Tipo de demanda:</Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.tipoDemanda === "Configuração"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.tipoDemanda === "Configuração" ? "x" : " "})
                    Configuração
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.tipoDemanda === "Nova demanda"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.tipoDemanda === "Nova demanda" ? "x" : " "}) Nova
                    demanda
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.tipoDemanda === "Sustentação"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.tipoDemanda === "Sustentação" ? "x" : " "})
                    Sustentação
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.tipoDemanda === "Garantia"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.tipoDemanda === "Garantia" ? "x" : " "}) Garantia
                  </Text>
                </View>
              </View>

              <View style={styles.gridWithBorder}>
                <View style={styles.gridItem}>
                  <Text style={styles.fieldLabel}>Demanda solicitada via:</Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.demandaSolicitadaVia ===
                      "Levantamento de Requisitos"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    (
                    {demand.demandaSolicitadaVia ===
                    "Levantamento de Requisitos"
                      ? "x"
                      : " "}
                    ) Levantamento de Requisitos
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.demandaSolicitadaVia === "Inspeção de Sistemas"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    (
                    {demand.demandaSolicitadaVia === "Inspeção de Sistemas"
                      ? "x"
                      : " "}
                    ) Inspeção de Sistemas
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.demandaSolicitadaVia === "E-mail"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.demandaSolicitadaVia === "E-mail" ? "x" : " "})
                    E-mail
                  </Text>
                </View>

                <View style={styles.gridItem}>
                  <Text style={styles.fieldLabel}>Atividades realizadas:</Text>
                  {demand.atividadesRealizadas.map((activity, idx) => (
                    <Text
                      key={idx}
                      style={[styles.fieldValue, { fontWeight: "bold" }]}
                    >
                      ( x ) {activity}
                    </Text>
                  ))}
                </View>
              </View>

              <View style={styles.gridWithBorder}>
                <View style={styles.gridItem}>
                  <Text style={styles.fieldLabel}>
                    Perfil do desenvolvedor:
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.perfilDesenvolvedor === "Trainee"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.perfilDesenvolvedor === "Trainee" ? "x" : " "})
                    Trainee
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.perfilDesenvolvedor === "Júnior"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.perfilDesenvolvedor === "Júnior" ? "x" : " "})
                    Júnior
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.perfilDesenvolvedor === "Pleno"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.perfilDesenvolvedor === "Pleno" ? "x" : " "}) Pleno
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.perfilDesenvolvedor === "Sênior"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.perfilDesenvolvedor === "Sênior" ? "x" : " "})
                    Sênior
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.perfilDesenvolvedor === "Especialista"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.perfilDesenvolvedor === "Especialista" ? "x" : " "}
                    ) Especialista
                  </Text>
                </View>

                <View style={styles.gridItem}>
                  <Text style={styles.fieldLabel}>
                    Complexidade da demanda:
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.complexidadeDemanda === "Baixa"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.complexidadeDemanda === "Baixa" ? "x" : " "}) Baixa
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.complexidadeDemanda === "Média"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.complexidadeDemanda === "Média" ? "x" : " "}) Média
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.complexidadeDemanda === "Intermediária"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    (
                    {demand.complexidadeDemanda === "Intermediária" ? "x" : " "}
                    ) Intermediária
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.complexidadeDemanda === "Alta"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.complexidadeDemanda === "Alta" ? "x" : " "}) Alta
                  </Text>
                  <Text
                    style={[
                      styles.fieldValue,
                      demand.complexidadeDemanda === "Especialista"
                        ? { fontWeight: "bold" }
                        : {},
                    ]}
                  >
                    ({demand.complexidadeDemanda === "Especialista" ? "x" : " "}
                    ) Especialista
                  </Text>
                </View>
              </View>

              <Text style={styles.fieldLabel}>Responsável Técnico:</Text>
              <Text style={styles.fieldValue}>{demand.responsavelTecnico}</Text>

              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text
                    style={[
                      styles.tableCellHeader,
                      { width: "35%", textAlign: "right", fontSize: 9 },
                    ]}
                  >
                    Breve descrição das atividades:
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: "65%", borderRight: "none" },
                    ]}
                  >
                    {demand.breveDescricao}
                  </Text>
                </View>

                <View style={styles.tableRow}>
                  <Text
                    style={[
                      styles.tableCellHeader,
                      { width: "35%", textAlign: "right", fontSize: 9 },
                    ]}
                  >
                    Ferramentas e Tecnologias utilizadas:
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: "65%", borderRight: "none" },
                    ]}
                  >
                    {demand.ferramentasTecnologias}
                  </Text>
                </View>

                <View style={styles.tableRow}>
                  <Text
                    style={[
                      styles.tableCellHeader,
                      { width: "35%", textAlign: "right", fontSize: 9 },
                    ]}
                  >
                    Ambiente dsv:
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: "65%", borderRight: "none" },
                    ]}
                  >
                    {demand.ambienteDSV}
                  </Text>
                </View>

                <View style={styles.tableRow}>
                  <Text
                    style={[
                      styles.tableCellHeader,
                      { width: "35%", textAlign: "right", fontSize: 9 },
                    ]}
                  >
                    Repositório com as implementações:
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: "65%", borderRight: "none" },
                    ]}
                  >
                    {demand.repositorioImplementacoes}
                  </Text>
                </View>

                <View style={[styles.tableRow, { borderBottom: "none" }]}>
                  <Text
                    style={[
                      styles.tableCellHeader,
                      { width: "35%", textAlign: "right", fontSize: 9 },
                    ]}
                  >
                    Nome da Funcionalidade/Tela:
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: "65%", borderRight: "none" },
                    ]}
                  >
                    {demand.nomeFuncionalidadeTela}
                  </Text>
                </View>
              </View>

              <Text style={styles.fieldLabel}>
                Evidências da Configuração e/ou Desenvolvimento:
              </Text>
              <Text style={styles.fieldValue}>(Ver páginas seguintes)</Text>
            </View>
          </Page>

          {/* Páginas separadas para cada evidência */}
          {demand.evidencias.map((evidencia, evidIdx) => (
            <Page
              key={`${demand.id}-evidence-${evidIdx}`}
              size="A4"
              style={styles.page}
            >
              <View style={styles.demandSection}>
                <Text style={styles.demandTitle}>
                  • DEMANDA {String(index + 1).padStart(2, "0")}:{" "}
                  {demand.titulo} - Evidência {evidIdx + 1}
                </Text>
                {evidencia.imagens.map((imagem, imgIdx) => (
                  <View
                    key={imgIdx}
                    style={{ alignItems: "center", marginVertical: 8 }}
                  >
                    <Image src={imagem} style={styles.evidenceImage} />
                  </View>
                ))}
                {evidencia.descricao && (
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.fieldLabel}>Descrição:</Text>
                    <Text style={styles.fieldValue}>{evidencia.descricao}</Text>
                  </View>
                )}
              </View>
            </Page>
          ))}
        </>
      ))}

      {/* Página de Aprovação */}
      <Page size="A4" style={styles.page}>
        <View style={styles.approvalSection}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
            APROVAÇÃO
          </Text>

          <View style={styles.approvalBox}>
            <View style={styles.approvalHeader}>
              <Text>AUTORIZADO POR:</Text>
            </View>
            <View style={styles.approvalSubHeader}>
              <Text>Fiscal do Contrato</Text>
            </View>
            <View style={styles.approvalContent}>
              <Text>{generalData.fiscalContrato}</Text>
            </View>
          </View>

          <View style={styles.approvalBox}>
            <View style={styles.approvalHeader}>
              <Text>AUTORIZADO POR:</Text>
            </View>
            <View style={styles.approvalSubHeader}>
              <Text>Responsável Técnico</Text>
            </View>
            <View style={styles.approvalContent}>
              <Text>{generalData.responsavelTecnico}</Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              marginTop: 20,
              marginBottom: 0,
            }}
          >
            Cliente,
          </Text>

          <View style={styles.approvalBox}>
            <View style={styles.approvalHeader}>
              <Text>CONTRATADA: IBROWSE</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "50%",
                  borderRight: "2px solid #000",
                  padding: 40,
                }}
              >
                <View
                  style={{
                    borderTop: "2px solid #000",
                    paddingTop: 10,
                    marginTop: 60,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {generalData.prepostoGerente}
                  </Text>
                  <Text
                    style={{ textAlign: "center", fontSize: 9, marginTop: 4 }}
                  >
                    Preposto/Gerente de Projetos
                  </Text>
                </View>
              </View>
              <View style={{ width: "50%", padding: 40 }}>
                <View
                  style={{
                    borderTop: "2px solid #000",
                    paddingTop: 10,
                    marginTop: 60,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {generalData.nomeUsuario}
                  </Text>
                  <Text
                    style={{ textAlign: "center", fontSize: 9, marginTop: 4 }}
                  >
                    Desenvolvedor
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

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
      </div>

      <div className="bg-white">
        <ReportPreview report={report} />
      </div>
    </div>
  );
}

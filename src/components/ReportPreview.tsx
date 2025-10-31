import type { CSSProperties } from "react";
import type { Report } from "../types/report";

interface ReportPreviewProps {
  report: Report;
}

const wrapperStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  color: "#000000",
  fontFamily: "Helvetica, Arial, sans-serif",
  lineHeight: 1.6,
  fontSize: "11px",
};

const pageStyle: CSSProperties = {
  maxWidth: "210mm",
  margin: "0 auto",
  padding: "30px",
  minHeight: "297mm",
};

const coverPageStyle: CSSProperties = {
  maxWidth: "210mm",
  margin: "0 auto",
  padding: "40px",
  minHeight: "297mm",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const coverTitleStyle: CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  textAlign: "center",
  marginBottom: "20px",
};

const coverSubtitleStyle: CSSProperties = {
  fontSize: "24px",
  fontWeight: 700,
  textAlign: "center",
  marginBottom: "20px",
};

const infoTableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  border: "1px solid #000",
};

const tableCellHeaderStyle: CSSProperties = {
  padding: "8px",
  borderRight: "1px solid #000",
  borderBottom: "1px solid #000",
  fontSize: "10px",
  fontWeight: 700,
  backgroundColor: "#fbe5d5",
  textAlign: "center",
};

const tableCellStyle: CSSProperties = {
  padding: "8px",
  borderRight: "1px solid #000",
  borderBottom: "1px solid #000",
  fontSize: "10px",
};

const demandTitleStyle: CSSProperties = {
  fontSize: "14px",
  fontWeight: 700,
  marginBottom: "10px",
};

const fieldLabelStyle: CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  marginTop: "8px",
};

const fieldValueStyle: CSSProperties = {
  fontSize: "10px",
  marginTop: "4px",
};

const gridStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "2px solid #fbe5d5",
  paddingBottom: "8px",
  marginBottom: "8px",
};

const gridItemStyle: CSSProperties = {
  width: "48%",
};

const approvalCardStyle: CSSProperties = {
  border: "2px solid #000",
  marginTop: "20px",
};

const approvalHeaderStyle: CSSProperties = {
  backgroundColor: "#fbe5d5",
  borderBottom: "2px solid #000",
  padding: "8px",
  fontSize: "12px",
  fontWeight: 700,
  textAlign: "center",
};

const approvalSubHeaderStyle: CSSProperties = {
  padding: "6px",
  borderBottom: "2px solid #000",
  textAlign: "center",
  fontSize: "10px",
};

const approvalContentStyle: CSSProperties = {
  padding: "40px",
  textAlign: "center",
  fontSize: "14px",
  fontWeight: 700,
};

export function ReportPreview({ report }: ReportPreviewProps) {
  const { generalData, demands } = report;

  return (
    <div id="report-preview" style={wrapperStyle}>
      {/* Página de Capa */}
      <div style={{ ...coverPageStyle, pageBreakAfter: "always" }}>
        <p style={coverTitleStyle}>{generalData.titulo}</p>

        {generalData.imagemCapa && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src={generalData.imagemCapa}
              alt="Imagem de capa"
              style={{
                maxWidth: "400px",
                maxHeight: "300px",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        <p style={coverSubtitleStyle}>{generalData.subtitulo}</p>

        {generalData.logoEmpresa && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src={generalData.logoEmpresa}
              alt="Logotipo da empresa"
              style={{
                maxWidth: "80px",
                maxHeight: "80px",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        {/* Tabela de Histórico de Versão */}
        <table style={infoTableStyle}>
          <tbody>
            <tr>
              <td
                style={{
                  ...tableCellHeaderStyle,
                  width: "100%",
                  borderRight: "none",
                }}
              >
                Objetivo deste artefato
              </td>
            </tr>
            <tr>
              <td
                style={{
                  ...tableCellStyle,
                  width: "100%",
                  borderRight: "none",
                }}
              >
                {generalData.objetivoArtefato}
              </td>
            </tr>
            <tr>
              <td style={{ ...tableCellHeaderStyle, width: "25%" }}>
                Nº do Contrato:
              </td>
              <td
                style={{
                  ...tableCellStyle,
                  width: "75%",
                  borderRight: "none",
                }}
              >
                {generalData.numeroContrato}
              </td>
            </tr>
            <tr>
              <td style={{ ...tableCellHeaderStyle, width: "25%" }}>
                Nº da Os:
              </td>
              <td
                style={{
                  ...tableCellStyle,
                  width: "75%",
                  borderRight: "none",
                }}
              >
                {generalData.numeroOS}
              </td>
            </tr>
            <tr>
              <td style={{ ...tableCellHeaderStyle, width: "25%" }}>
                Detalhamento da OS:
              </td>
              <td
                style={{
                  ...tableCellStyle,
                  width: "75%",
                  borderRight: "none",
                }}
              >
                {generalData.detalhamentoOS}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  ...tableCellHeaderStyle,
                  width: "100%",
                  borderRight: "none",
                }}
              >
                O(s) objetivo(s) desta ERS é (são)
              </td>
            </tr>
            <tr>
              <td
                style={{
                  ...tableCellStyle,
                  width: "100%",
                  borderRight: "none",
                }}
              >
                {generalData.objetivoERS}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  ...tableCellHeaderStyle,
                  width: "100%",
                  borderRight: "none",
                }}
              >
                Controle de alterações do documento
              </td>
            </tr>
            <tr>
              <td style={{ ...tableCellHeaderStyle, width: "33.33%" }}>Data</td>
              <td style={{ ...tableCellHeaderStyle, width: "33.33%" }}>
                Autor (e-mail)
              </td>
              <td
                style={{
                  ...tableCellHeaderStyle,
                  width: "33.33%",
                  borderRight: "none",
                }}
              >
                Descrição
              </td>
            </tr>
            <tr>
              <td
                style={{
                  ...tableCellStyle,
                  width: "33.33%",
                  textAlign: "center",
                  borderBottom: "none",
                }}
              >
                {generalData.data}
              </td>
              <td
                style={{
                  ...tableCellStyle,
                  width: "33.33%",
                  textAlign: "center",
                  borderBottom: "none",
                }}
              >
                {generalData.autorEmail}
              </td>
              <td
                style={{
                  ...tableCellStyle,
                  width: "33.33%",
                  textAlign: "center",
                  borderRight: "none",
                  borderBottom: "none",
                }}
              >
                {generalData.descricao}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Páginas de Demandas */}
      {demands.map((demand, index) => (
        <div key={demand.id} style={{ ...pageStyle, pageBreakAfter: "always" }}>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <p style={demandTitleStyle}>
              • DEMANDA {String(index + 1).padStart(2, "0")}.
            </p>

            <div style={gridStyle}>
              <div style={gridItemStyle}>
                <p style={fieldLabelStyle}>Nível de prioridade:</p>
                <p style={fieldValueStyle}>
                  ({demand.nivelPrioridade === "Urgente" ? "x" : " "}) Urgente
                </p>
                <p style={fieldValueStyle}>
                  ({demand.nivelPrioridade === "Alta" ? "x" : " "}) Alta
                </p>
                <p style={fieldValueStyle}>
                  ({demand.nivelPrioridade === "Média" ? "x" : " "}) Média
                </p>
                <p style={fieldValueStyle}>
                  ({demand.nivelPrioridade === "Baixa" ? "x" : " "}) Baixa
                </p>
              </div>

              <div style={gridItemStyle}>
                <p style={fieldLabelStyle}>Tipo de demanda:</p>
                <p style={fieldValueStyle}>
                  ({demand.tipoDemanda === "Configuração" ? "x" : " "})
                  Configuração
                </p>
                <p style={fieldValueStyle}>
                  ({demand.tipoDemanda === "Nova demanda" ? "x" : " "}) Nova
                  demanda
                </p>
                <p style={fieldValueStyle}>
                  ({demand.tipoDemanda === "Sustentação" ? "x" : " "})
                  Sustentação
                </p>
                <p style={fieldValueStyle}>
                  ({demand.tipoDemanda === "Garantia" ? "x" : " "}) Garantia
                </p>
              </div>
            </div>

            <div style={gridStyle}>
              <div style={gridItemStyle}>
                <p style={fieldLabelStyle}>Demanda solicitada via:</p>
                <p style={fieldValueStyle}>
                  (
                  {demand.demandaSolicitadaVia === "Levantamento de Requisitos"
                    ? "x"
                    : " "}
                  ) Levantamento de Requisitos
                </p>
                <p style={fieldValueStyle}>
                  (
                  {demand.demandaSolicitadaVia === "Inspeção de Sistemas"
                    ? "x"
                    : " "}
                  ) Inspeção de Sistemas
                </p>
                <p style={fieldValueStyle}>
                  ({demand.demandaSolicitadaVia === "E-mail" ? "x" : " "})
                  E-mail
                </p>
              </div>

              <div style={gridItemStyle}>
                <p style={fieldLabelStyle}>Atividades realizadas:</p>
                {demand.atividadesRealizadas.map((activity, idx) => (
                  <p key={idx} style={fieldValueStyle}>
                    ( x ) {activity}
                  </p>
                ))}
              </div>
            </div>

            <div style={gridStyle}>
              <div style={gridItemStyle}>
                <p style={fieldLabelStyle}>Perfil do desenvolvedor:</p>
                <p style={fieldValueStyle}>
                  ({demand.perfilDesenvolvedor === "Trainee" ? "x" : " "})
                  Trainee
                </p>
                <p style={fieldValueStyle}>
                  ({demand.perfilDesenvolvedor === "Júnior" ? "x" : " "}) Júnior
                </p>
                <p style={fieldValueStyle}>
                  ({demand.perfilDesenvolvedor === "Pleno" ? "x" : " "}) Pleno
                </p>
                <p style={fieldValueStyle}>
                  ({demand.perfilDesenvolvedor === "Sênior" ? "x" : " "}) Sênior
                </p>
                <p style={fieldValueStyle}>
                  ({demand.perfilDesenvolvedor === "Especialista" ? "x" : " "})
                  Especialista
                </p>
              </div>

              <div style={gridItemStyle}>
                <p style={fieldLabelStyle}>Complexidade da demanda:</p>
                <p style={fieldValueStyle}>
                  ({demand.complexidadeDemanda === "Baixa" ? "x" : " "}) Baixa
                </p>
                <p style={fieldValueStyle}>
                  ({demand.complexidadeDemanda === "Média" ? "x" : " "}) Média
                </p>
                <p style={fieldValueStyle}>
                  ({demand.complexidadeDemanda === "Intermediária" ? "x" : " "})
                  Intermediária
                </p>
                <p style={fieldValueStyle}>
                  ({demand.complexidadeDemanda === "Alta" ? "x" : " "}) Alta
                </p>
                <p style={fieldValueStyle}>
                  ({demand.complexidadeDemanda === "Especialista" ? "x" : " "})
                  Especialista
                </p>
              </div>
            </div>

            <p style={fieldLabelStyle}>Responsável Técnico:</p>
            <p style={fieldValueStyle}>{demand.responsavelTecnico}</p>

            <table style={infoTableStyle}>
              <tbody>
                <tr>
                  <td
                    style={{
                      ...tableCellHeaderStyle,
                      width: "35%",
                      textAlign: "right",
                      fontSize: "9px",
                    }}
                  >
                    Breve descrição das atividades:
                  </td>
                  <td
                    style={{
                      ...tableCellStyle,
                      width: "65%",
                      borderRight: "none",
                    }}
                  >
                    {demand.breveDescricao}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      ...tableCellHeaderStyle,
                      width: "35%",
                      textAlign: "right",
                      fontSize: "9px",
                    }}
                  >
                    Ferramentas e Tecnologias utilizadas:
                  </td>
                  <td
                    style={{
                      ...tableCellStyle,
                      width: "65%",
                      borderRight: "none",
                    }}
                  >
                    {demand.ferramentasTecnologias}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      ...tableCellHeaderStyle,
                      width: "35%",
                      textAlign: "right",
                      fontSize: "9px",
                    }}
                  >
                    Ambiente dsv:
                  </td>
                  <td
                    style={{
                      ...tableCellStyle,
                      width: "65%",
                      borderRight: "none",
                    }}
                  >
                    {demand.ambienteDSV}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      ...tableCellHeaderStyle,
                      width: "35%",
                      textAlign: "right",
                      fontSize: "9px",
                    }}
                  >
                    Repositório com as implementações:
                  </td>
                  <td
                    style={{
                      ...tableCellStyle,
                      width: "65%",
                      borderRight: "none",
                    }}
                  >
                    {demand.repositorioImplementacoes}
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      ...tableCellHeaderStyle,
                      width: "35%",
                      textAlign: "right",
                      fontSize: "9px",
                      borderBottom: "none",
                    }}
                  >
                    Nome da Funcionalidade/Tela:
                  </td>
                  <td
                    style={{
                      ...tableCellStyle,
                      width: "65%",
                      borderRight: "none",
                      borderBottom: "none",
                    }}
                  >
                    {demand.nomeFuncionalidadeTela}
                  </td>
                </tr>
              </tbody>
            </table>

            <p style={fieldLabelStyle}>
              Evidências da Configuração e/ou Desenvolvimento:
            </p>
            {demand.evidencias.map((evidencia, evidIdx) => (
              <div
                key={evidencia.id}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <p style={fieldValueStyle}>Evidência {evidIdx + 1}:</p>
                {evidencia.imagens.map((imagem, imgIdx) => (
                  <div
                    key={imgIdx}
                    style={{
                      textAlign: "center",
                      marginTop: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <img
                      src={imagem}
                      alt="Evidência"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "400px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ))}
                {evidencia.descricao && (
                  <p style={fieldValueStyle}>
                    Descrição: {evidencia.descricao}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Página de Aprovação */}
      <div style={{ ...pageStyle, pageBreakBefore: "always" }}>
        <div style={{ marginTop: "40px" }}>
          <p
            style={{ fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}
          >
            APROVAÇÃO
          </p>

          <div style={approvalCardStyle}>
            <div style={approvalHeaderStyle}>
              <p>AUTORIZADO POR:</p>
            </div>
            <div style={approvalSubHeaderStyle}>
              <p>Fiscal do Contrato</p>
            </div>
            <div style={approvalContentStyle}>
              <p>{generalData.fiscalContrato}</p>
            </div>
          </div>

          <div style={approvalCardStyle}>
            <div style={approvalHeaderStyle}>
              <p>AUTORIZADO POR:</p>
            </div>
            <div style={approvalSubHeaderStyle}>
              <p>Responsável Técnico</p>
            </div>
            <div style={approvalContentStyle}>
              <p>{generalData.responsavelTecnico}</p>
            </div>
          </div>

          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              marginTop: "20px",
              marginBottom: 0,
            }}
          >
            Cliente,
          </p>

          <div style={approvalCardStyle}>
            <div style={approvalHeaderStyle}>
              <p>CONTRATADA: IBROWSE</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  width: "50%",
                  borderRight: "2px solid #000",
                  padding: "40px",
                }}
              >
                <div
                  style={{
                    borderTop: "2px solid #000",
                    paddingTop: "10px",
                    marginTop: "60px",
                  }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {generalData.prepostoGerente}
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "9px",
                      marginTop: "4px",
                    }}
                  >
                    Preposto/Gerente de Projetos
                  </p>
                </div>
              </div>
              <div style={{ width: "50%", padding: "40px" }}>
                <div
                  style={{
                    borderTop: "2px solid #000",
                    paddingTop: "10px",
                    marginTop: "60px",
                  }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {generalData.nomeUsuario}
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "9px",
                      marginTop: "4px",
                    }}
                  >
                    Desenvolvedor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            margin: 18mm;
            size: A4;
          }
          div[style*="page-break-before"],
          div[style*="page-break-after"] {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}

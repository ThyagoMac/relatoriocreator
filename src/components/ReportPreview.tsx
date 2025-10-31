import type { CSSProperties } from "react";
import type { Report } from "../types/report";

interface ReportPreviewProps {
  report: Report;
}

const wrapperStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  color: "#1f2937",
  fontFamily: "'Segoe UI', Arial, sans-serif",
  lineHeight: 1.6,
};

const pageStyle: CSSProperties = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "48px 64px",
};

const coverTitleStyle: CSSProperties = {
  fontSize: "40px",
  fontWeight: 700,
  color: "#0f172a",
  textAlign: "center",
  marginBottom: "24px",
};

const coverSubtitleStyle: CSSProperties = {
  fontSize: "20px",
  color: "#475569",
  textAlign: "center",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "22px",
  fontWeight: 700,
  color: "#0f172a",
  marginBottom: "20px",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const infoTableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "12px",
};

const infoLabelCellStyle: CSSProperties = {
  width: "28%",
  backgroundColor: "#f8fafc",
  border: "1px solid #cbd5f5",
  padding: "10px 14px",
  fontWeight: 600,
};

const infoValueCellStyle: CSSProperties = {
  border: "1px solid #cbd5f5",
  padding: "10px 14px",
  textAlign: "justify",
};

const highlightBoxStyle: CSSProperties = {
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
  padding: "16px",
  backgroundColor: "#fefce8",
  marginTop: "16px",
};

const demandHeaderStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "2px solid #0ea5e9",
  paddingBottom: "12px",
  marginBottom: "20px",
};

const demandTitleStyle: CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  color: "#0ea5e9",
  letterSpacing: "0.08em",
};

const demandMetaStyle: CSSProperties = {
  fontSize: "14px",
  color: "#64748b",
  textAlign: "right",
};

const listStyle: CSSProperties = {
  margin: "8px 0 0 18px",
  padding: 0,
};

const listItemStyle: CSSProperties = {
  marginBottom: "6px",
};

const approvalCardStyle: CSSProperties = {
  border: "2px solid #0f172a",
  borderRadius: "6px",
  textAlign: "center",
  marginBottom: "32px",
};

const approvalHeaderStyle: CSSProperties = {
  backgroundColor: "#fde68a",
  borderBottom: "2px solid #0f172a",
  padding: "12px",
  fontWeight: 700,
};

const approvalBodyStyle: CSSProperties = {
  borderBottom: "2px solid #0f172a",
  padding: "12px",
  fontSize: "14px",
  fontWeight: 600,
};

const signatureBlockStyle: CSSProperties = {
  padding: "32px 16px",
};

const signatureNameStyle: CSSProperties = {
  borderTop: "2px solid #0f172a",
  paddingTop: "12px",
  fontWeight: 700,
  fontSize: "16px",
};

export function ReportPreview({ report }: ReportPreviewProps) {
  const { generalData, demands } = report;

  const renderInfoRow = (label: string, value?: string) => {
    if (!value) {
      return null;
    }

    return (
      <tr>
        <td style={infoLabelCellStyle}>{label}</td>
        <td style={infoValueCellStyle}>{value}</td>
      </tr>
    );
  };

  return (
    <div id="report-preview" style={wrapperStyle}>
      <div
        style={{
          ...pageStyle,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pageBreakAfter: "always",
        }}
      >
        <div>
          <h1 style={coverTitleStyle}>{generalData.titulo}</h1>

          {generalData.imagemCapa && (
            <div style={{ textAlign: "center", margin: "24px 0" }}>
              <img
                src={generalData.imagemCapa}
                alt="Imagem de capa"
                style={{ width: "220px", height: "auto", objectFit: "contain" }}
              />
            </div>
          )}

          <div style={{ marginTop: "40px" }}>
            <p style={coverSubtitleStyle}>{generalData.subtitulo}</p>
            {generalData.logoEmpresa && (
              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <img
                  src={generalData.logoEmpresa}
                  alt="Logotipo da empresa"
                  style={{ maxHeight: "70px", width: "auto", objectFit: "contain" }}
                />
              </div>
            )}
          </div>

          <div style={highlightBoxStyle}>
            <p style={{ fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
              Objetivo deste artefato
            </p>
            <p>{generalData.objetivoArtefato}</p>
          </div>
        </div>

        <div style={{ marginTop: "48px" }}>
          <table style={infoTableStyle}>
            <tbody>
              {renderInfoRow("Número do contrato", generalData.numeroContrato)}
              {renderInfoRow("Número da OS", generalData.numeroOS)}
              {renderInfoRow("Detalhamento da OS", generalData.detalhamentoOS)}
              {renderInfoRow("Objetivo da ERS", generalData.objetivoERS)}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "72px" }}>
          <table style={infoTableStyle}>
            <tbody>
              <tr>
                <td style={{ ...infoLabelCellStyle, textAlign: "center" }}>Data</td>
                <td style={{ ...infoLabelCellStyle, textAlign: "center" }}>Autor (e-mail)</td>
                <td style={{ ...infoLabelCellStyle, textAlign: "center" }}>Descrição</td>
              </tr>
              <tr>
                <td style={{ ...infoValueCellStyle, textAlign: "center" }}>{generalData.data}</td>
                <td style={{ ...infoValueCellStyle, textAlign: "center" }}>{generalData.autorEmail}</td>
                <td style={infoValueCellStyle}>{generalData.descricao}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        style={{
          ...pageStyle,
          pageBreakAfter: demands.length > 0 ? "always" : "auto",
        }}
      >
        <h2 style={sectionTitleStyle}>Visão Geral do Projeto</h2>
        <table style={infoTableStyle}>
          <tbody>
            {renderInfoRow("Responsável Técnico", generalData.responsavelTecnico)}
            {renderInfoRow("Fiscal do Contrato", generalData.fiscalContrato)}
            {renderInfoRow("Preposto/Gerente", generalData.prepostoGerente)}
            {renderInfoRow("Desenvolvedor", generalData.nomeUsuario)}
          </tbody>
        </table>

        <div style={highlightBoxStyle}>
          <p style={{ fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
            Resumo executivo
          </p>
          <p style={{ textAlign: "justify" }}>{generalData.descricao}</p>
        </div>
      </div>

      {demands.length > 0 && (
        <div>
          {demands.map((demand, index) => (
            <div
              key={demand.id}
              style={{
                ...pageStyle,
                pageBreakBefore: index === 0 ? "always" : "always",
              }}
            >
              <div style={demandHeaderStyle}>
                <h3 style={demandTitleStyle}>
                  DEMANDA {String(index + 1).padStart(2, "0")}
                </h3>
                <div style={demandMetaStyle}>
                  <div>{demand.responsavelTecnico}</div>
                  <div>{demand.nomeFuncionalidadeTela}</div>
                </div>
              </div>

              <table style={infoTableStyle}>
                <tbody>
                  {renderInfoRow("Prioridade", demand.nivelPrioridade)}
                  {renderInfoRow("Tipo de demanda", demand.tipoDemanda)}
                  {renderInfoRow("Solicitação via", demand.demandaSolicitadaVia)}
                  {renderInfoRow("Perfil do desenvolvedor", demand.perfilDesenvolvedor)}
                  {renderInfoRow("Complexidade", demand.complexidadeDemanda)}
                  {renderInfoRow("Ambiente DSV", demand.ambienteDSV)}
                  {renderInfoRow("Ferramentas/Tecnologias", demand.ferramentasTecnologias)}
                  {renderInfoRow(
                    "Repositório",
                    demand.repositorioImplementacoes
                  )}
                </tbody>
              </table>

              {demand.atividadesRealizadas.length > 0 && (
                <div style={{ marginTop: "28px" }}>
                  <p style={{ fontWeight: 700, marginBottom: "10px", color: "#0f172a" }}>
                    Atividades realizadas
                  </p>
                  <ul style={listStyle}>
                    {demand.atividadesRealizadas.map((activity, idx) => (
                      <li key={idx} style={listItemStyle}>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {demand.breveDescricao && (
                <div style={{ ...highlightBoxStyle, marginTop: "28px" }}>
                  <p style={{ fontWeight: 700, marginBottom: "10px", color: "#b45309" }}>
                    Resumo das entregas
                  </p>
                  <p>{demand.breveDescricao}</p>
                </div>
              )}

              {demand.evidencias && demand.evidencias.length > 0 ? (
                <div style={{ marginTop: "28px" }}>
                  <p style={{ fontWeight: 700, marginBottom: "10px", color: "#0f172a" }}>
                    Evidências
                  </p>
                  {demand.evidencias.map((evidence) => (
                    <div key={evidence.id} style={{ marginBottom: "24px" }}>
                      {evidence.imagens &&
                        evidence.imagens.map((imageSrc, imgIndex) => (
                          <div
                            key={`${evidence.id}-img-${imgIndex}`}
                            style={{ border: "1px solid #e2e8f0", marginBottom: "12px" }}
                          >
                            <img
                              src={imageSrc}
                              alt="Evidência"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        ))}
                      {evidence.descricao && (
                        <p style={{ textAlign: "justify" }}>{evidence.descricao}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                (demand.evidenciaImagem || demand.evidenciaTexto) && (
                  <div style={{ marginTop: "28px" }}>
                    <p style={{ fontWeight: 700, marginBottom: "10px", color: "#0f172a" }}>
                      Evidências
                    </p>
                    {demand.evidenciaImagem && (
                      <div style={{ border: "1px solid #e2e8f0", marginBottom: "12px" }}>
                        <img
                          src={demand.evidenciaImagem}
                          alt="Evidência"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    )}
                    {demand.evidenciaTexto && (
                      <p style={{ textAlign: "justify" }}>{demand.evidenciaTexto}</p>
                    )}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          ...pageStyle,
          pageBreakBefore: "always",
        }}
      >
        <h2 style={sectionTitleStyle}>Aprovação</h2>

        <div style={approvalCardStyle}>
          <div style={approvalHeaderStyle}>AUTORIZADO POR</div>
          <div style={approvalBodyStyle}>Fiscal do Contrato</div>
          <div style={signatureBlockStyle}>
            <p style={signatureNameStyle}>{generalData.fiscalContrato}</p>
          </div>
        </div>

        <div style={approvalCardStyle}>
          <div style={approvalHeaderStyle}>AUTORIZADO POR</div>
          <div style={approvalBodyStyle}>Responsável Técnico</div>
          <div style={signatureBlockStyle}>
            <p style={signatureNameStyle}>{generalData.responsavelTecnico}</p>
          </div>
        </div>

        <div style={approvalCardStyle}>
          <div style={{ ...approvalHeaderStyle, backgroundColor: "#fcd34d" }}>
            CONTRATADA: IBROWSE
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              borderBottom: "2px solid #0f172a",
            }}
          >
            <div
              style={{
                flex: "1 1 50%",
                minWidth: "240px",
                borderRight: "2px solid #0f172a",
                padding: "24px 16px 8px",
              }}
            >
              <div style={{ height: "120px" }} />
              <div style={signatureNameStyle}>
                {generalData.prepostoGerente}
              </div>
              <p style={{ fontSize: "12px", marginTop: "6px" }}>
                Preposto/Gerente de Projetos
              </p>
            </div>
            <div
              style={{ flex: "1 1 50%", minWidth: "240px", padding: "24px 16px 8px" }}
            >
              <div style={{ height: "120px" }} />
              <div style={signatureNameStyle}>{generalData.nomeUsuario}</div>
              <p style={{ fontSize: "12px", marginTop: "6px" }}>Desenvolvedor</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            margin: 18mm;
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

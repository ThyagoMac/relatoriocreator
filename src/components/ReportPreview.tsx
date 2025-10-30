import type { Report } from '../types/report';

interface ReportPreviewProps {
  report: Report;
}

export function ReportPreview({ report }: ReportPreviewProps) {
  const { generalData, demands } = report;

  return (
    <div className="bg-white" id="report-preview">
      {/* Capa */}
      <div className="min-h-screen p-8 flex flex-col items-center justify-center border-b-2 border-gray-300">
        {generalData.logoEmpresa && (
          <div className="mb-8">
            <img
              src={generalData.logoEmpresa}
              alt="Logo da empresa"
              className="h-24 w-auto object-contain"
            />
          </div>
        )}
        {generalData.imagemCapa && (
          <div className="mb-8">
            <img
              src={generalData.imagemCapa}
              alt="Capa"
              className="max-w-2xl w-full h-auto object-contain"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold text-center mb-4">{generalData.titulo}</h1>
        <h2 className="text-2xl text-center mb-8">{generalData.subtitulo}</h2>
        <div className="mt-16 space-y-2 text-center">
          <p>
            <strong>Autor:</strong> {generalData.nomeUsuario} ({generalData.autorEmail})
          </p>
          <p>
            <strong>Data:</strong> {generalData.data}
          </p>
        </div>
      </div>

      {/* Dados Gerais */}
      <div className="p-8 space-y-6">
        {generalData.logoEmpresa && (
          <div className="flex justify-center mb-4">
            <img
              src={generalData.logoEmpresa}
              alt="Logo da empresa"
              className="h-16 w-auto"
            />
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Informações Gerais</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Nome do Usuário:</p>
              <p>{generalData.nomeUsuario}</p>
            </div>
            <div>
              <p className="font-semibold">Preposto/Gerente de Projetos:</p>
              <p>{generalData.prepostoGerente}</p>
            </div>
            <div>
              <p className="font-semibold">Responsável Técnico:</p>
              <p>{generalData.responsavelTecnico}</p>
            </div>
            <div>
              <p className="font-semibold">Fiscal do Contrato:</p>
              <p>{generalData.fiscalContrato}</p>
            </div>
            <div>
              <p className="font-semibold">Nº do Contrato:</p>
              <p>{generalData.numeroContrato}</p>
            </div>
            <div>
              <p className="font-semibold">Nº da OS:</p>
              <p>{generalData.numeroOS}</p>
            </div>
            <div className="col-span-2">
              <p className="font-semibold">Descrição:</p>
              <p>{generalData.descricao}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Objetivo deste artefato</h3>
          <p className="text-justify">{generalData.objetivoArtefato}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Detalhamento da OS</h3>
          <p className="text-justify">{generalData.detalhamentoOS}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold">Objetivo(s) desta ERS</h3>
          <p className="text-justify">{generalData.objetivoERS}</p>
        </div>
      </div>

      {/* Demandas */}
      {demands.length > 0 && (
        <div className="p-8 space-y-8">
          <div className="h-px bg-gray-300" />
          <h2 className="text-2xl font-bold">Demandas Desenvolvidas</h2>

          {demands.map((demand, index) => (
            <div key={demand.id} className="space-y-4 page-break-inside-avoid">
              <div className="border-t-2 border-gray-400 pt-4">
                <h3 className="text-xl font-bold mb-4">
                  Demanda {index + 1}: {demand.titulo}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold">Nível de prioridade:</p>
                  <p>{demand.nivelPrioridade}</p>
                </div>
                <div>
                  <p className="font-semibold">Tipo da demanda:</p>
                  <p>{demand.tipoDemanda}</p>
                </div>
                <div>
                  <p className="font-semibold">Demanda solicitada via:</p>
                  <p>{demand.demandaSolicitadaVia}</p>
                </div>
                <div>
                  <p className="font-semibold">Responsável Técnico:</p>
                  <p>{demand.responsavelTecnico}</p>
                </div>
                <div>
                  <p className="font-semibold">Perfil do desenvolvedor:</p>
                  <p>{demand.perfilDesenvolvedor}</p>
                </div>
                <div>
                  <p className="font-semibold">Complexidade da demanda:</p>
                  <p>{demand.complexidadeDemanda}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold">Atividades realizadas:</p>
                <ul className="list-disc list-inside ml-4">
                  {demand.atividadesRealizadas.map((activity, idx) => (
                    <li key={idx}>( x ) {activity}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold">Breve descrição das atividades:</p>
                <p className="text-justify mt-2">{demand.breveDescricao}</p>
              </div>

              <div>
                <p className="font-semibold">Ferramentas e Tecnologias utilizadas:</p>
                <p className="mt-2">{demand.ferramentasTecnologias}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Ambiente dsv:</p>
                  <p>{demand.ambienteDSV}</p>
                </div>
                <div>
                  <p className="font-semibold">Repositório com as implementações:</p>
                  <p>{demand.repositorioImplementacoes}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold">Nome da Funcionalidade/Tela:</p>
                <p>{demand.nomeFuncionalidadeTela}</p>
              </div>

              <div>
                <p className="font-semibold">Evidência da Configuração e/ou Desenvolvimento:</p>
                {demand.evidenciaImagem && (
                  <div className="mt-4 mb-4">
                    <img
                      src={demand.evidenciaImagem}
                      alt="Evidência"
                      className="max-w-full h-auto border border-gray-300 rounded"
                    />
                  </div>
                )}
                <p className="text-justify mt-2">{demand.evidenciaTexto}</p>
              </div>

              {index < demands.length - 1 && (
                <div className="h-px bg-gray-300 my-8" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Rodapé com logo em todas as páginas */}
      <style>{`
        @media print {
          @page {
            margin: 2cm;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}

import { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { GeneralDataForm } from "./components/GeneralDataForm";
import { DemandList } from "./components/DemandList";
import { ReportExport } from "./components/ReportExport";
import type { GeneralData, Demand, Report } from "./types/report";
import {
  loadGeneralData,
  loadDemands,
  getDefaultGeneralData,
} from "./utils/storage";

function App() {
  const [generalData, setGeneralData] = useState<GeneralData>(
    getDefaultGeneralData()
  );
  const [demands, setDemands] = useState<Demand[]>([]);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const loadData = async () => {
      const storedGeneralData = await loadGeneralData();
      const storedDemands = await loadDemands();
      if (storedGeneralData) {
        setGeneralData(storedGeneralData);
      }
      if (storedDemands.length > 0) {
        setDemands(storedDemands);
      }
    };
    loadData();
  }, []);

  const handleGeneralDataSave = (data: GeneralData) => {
    setGeneralData(data);
    setActiveTab("demands");
  };

  const handleDemandsChange = (updatedDemands: Demand[]) => {
    setDemands(updatedDemands);
  };

  const report: Report = {
    generalData,
    demands,
  };

  const isGeneralDataComplete = () => {
    return (
      generalData.nomeUsuario &&
      generalData.prepostoGerente &&
      generalData.responsavelTecnico &&
      generalData.fiscalContrato &&
      generalData.titulo &&
      generalData.subtitulo &&
      generalData.objetivoArtefato &&
      generalData.numeroContrato &&
      generalData.numeroOS &&
      generalData.detalhamentoOS &&
      generalData.objetivoERS &&
      generalData.data &&
      generalData.autorEmail &&
      generalData.descricao
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Gerador de Relatório Técnico
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Preencha os dados gerais, adicione demandas e exporte seu relatório
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <Tabs.List className="flex space-x-1 border-b border-gray-200">
            <Tabs.Trigger
              value="general"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
            >
              1. Dados Gerais
            </Tabs.Trigger>
            <Tabs.Trigger
              value="demands"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isGeneralDataComplete()}
            >
              2. Demandas
            </Tabs.Trigger>
            <Tabs.Trigger
              value="preview"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isGeneralDataComplete() || demands.length === 0}
            >
              3. Preview e Exportação
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="general" className="mt-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">
                Dados Gerais do Relatório
              </h2>
              <GeneralDataForm onSave={handleGeneralDataSave} />
            </div>
          </Tabs.Content>

          <Tabs.Content value="demands" className="mt-6">
            <div className="bg-white rounded-lg shadow p-6">
              <DemandList
                demands={demands}
                onDemandsChange={handleDemandsChange}
                defaultResponsavelTecnico={generalData.responsavelTecnico}
                onNavigateToPreview={() => setActiveTab("preview")}
              />
            </div>
          </Tabs.Content>

          <Tabs.Content value="preview" className="mt-6">
            <div className="bg-white rounded-lg shadow p-6">
              <ReportExport report={report} />
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </main>
    </div>
  );
}

export default App;

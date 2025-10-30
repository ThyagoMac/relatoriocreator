import { useState } from 'react';
import type { Demand, ActivityType, DeveloperLevel } from '../types/report';
import { Button } from './ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/Dialog';
import { DemandForm } from './DemandForm';
import { saveDemands } from '../utils/storage';

interface DemandListProps {
  demands: Demand[];
  onDemandsChange: (demands: Demand[]) => void;
  defaultResponsavelTecnico?: string;
}

export function DemandList({ demands, onDemandsChange, defaultResponsavelTecnico }: DemandListProps) {
  const [editingDemand, setEditingDemand] = useState<Demand | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddDemand = () => {
    setEditingDemand(null);
    setIsDialogOpen(true);
  };

  const handleEditDemand = (demand: Demand) => {
    setEditingDemand(demand);
    setIsDialogOpen(true);
  };

  const handleDeleteDemand = (demandId: string) => {
    if (confirm('Tem certeza que deseja remover esta demanda?')) {
      const updatedDemands = demands.filter((d) => d.id !== demandId);
      saveDemands(updatedDemands);
      onDemandsChange(updatedDemands);
    }
  };

  const handleSaveDemand = (demand: Demand) => {
    let updatedDemands: Demand[];
    if (editingDemand) {
      updatedDemands = demands.map((d) => (d.id === demand.id ? demand : d));
    } else {
      updatedDemands = [...demands, demand];
    }
    saveDemands(updatedDemands);
    onDemandsChange(updatedDemands);
    setIsDialogOpen(false);
    setEditingDemand(null);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setEditingDemand(null);
  };

  // Pega os valores da última demanda (se houver) para usar como padrão
  const getLastDemandActivities = (): ActivityType[] => {
    if (demands.length === 0) return [];
    const lastDemand = demands[demands.length - 1];
    return lastDemand.atividadesRealizadas || [];
  };

  const getLastDemandFerramentasTecnologias = (): string => {
    if (demands.length === 0) return '';
    const lastDemand = demands[demands.length - 1];
    return lastDemand.ferramentasTecnologias || '';
  };

  const getLastDemandAmbienteDSV = (): string => {
    if (demands.length === 0) return '';
    const lastDemand = demands[demands.length - 1];
    return lastDemand.ambienteDSV || '';
  };

  const getLastDemandRepositorioImplementacoes = (): string => {
    if (demands.length === 0) return '';
    const lastDemand = demands[demands.length - 1];
    return lastDemand.repositorioImplementacoes || '';
  };

  const getLastDemandPerfilDesenvolvedor = (): DeveloperLevel | undefined => {
    if (demands.length === 0) return undefined;
    const lastDemand = demands[demands.length - 1];
    return lastDemand.perfilDesenvolvedor;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Demandas</h2>
        <Button onClick={handleAddDemand}>+ Adicionar Demanda</Button>
      </div>

      {demands.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>Nenhuma demanda adicionada ainda.</p>
          <p className="mt-2">Clique em "Adicionar Demanda" para começar.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {demands.map((demand) => (
            <div
              key={demand.id}
              className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{demand.titulo}</h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Prioridade:</span> {demand.nivelPrioridade}
                    </p>
                    <p>
                      <span className="font-medium">Tipo:</span> {demand.tipoDemanda}
                    </p>
                    <p>
                      <span className="font-medium">Solicitada via:</span>{' '}
                      {demand.demandaSolicitadaVia}
                    </p>
                    <p>
                      <span className="font-medium">Responsável Técnico:</span>{' '}
                      {demand.responsavelTecnico}
                    </p>
                    <p>
                      <span className="font-medium">Perfil do desenvolvedor:</span>{' '}
                      {demand.perfilDesenvolvedor}
                    </p>
                    <p>
                      <span className="font-medium">Complexidade:</span> {demand.complexidadeDemanda}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditDemand(demand)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteDemand(demand.id)}
                  >
                    Remover
                  </Button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm">
                  <span className="font-medium">Breve descrição:</span> {demand.breveDescricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingDemand ? 'Editar Demanda' : 'Nova Demanda'}
            </DialogTitle>
          </DialogHeader>
          <DemandForm
            initialData={editingDemand || undefined}
            onSubmit={handleSaveDemand}
            onCancel={handleCancel}
            defaultResponsavelTecnico={defaultResponsavelTecnico}
            defaultAtividadesRealizadas={getLastDemandActivities()}
            defaultFerramentasTecnologias={getLastDemandFerramentasTecnologias()}
            defaultAmbienteDSV={getLastDemandAmbienteDSV()}
            defaultRepositorioImplementacoes={getLastDemandRepositorioImplementacoes()}
            defaultPerfilDesenvolvedor={getLastDemandPerfilDesenvolvedor()}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

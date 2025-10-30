import { useState } from "react";
import type { Demand, ActivityType, DeveloperLevel } from "../types/report";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/Dialog";
import { DemandForm } from "./DemandForm";
import { saveDemands } from "../utils/storage";

interface DemandListProps {
  demands: Demand[];
  onDemandsChange: (demands: Demand[]) => void;
  defaultResponsavelTecnico?: string;
  onNavigateToPreview?: () => void;
}

export function DemandList({
  demands,
  onDemandsChange,
  defaultResponsavelTecnico,
  onNavigateToPreview,
}: DemandListProps) {
  const [editingDemand, setEditingDemand] = useState<Demand | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [demandToDelete, setDemandToDelete] = useState<Demand | null>(null);

  const handleAddDemand = () => {
    setEditingDemand(null);
    setIsDialogOpen(true);
  };

  const handleEditDemand = (demand: Demand) => {
    setEditingDemand(demand);
    setIsDialogOpen(true);
  };

  const handleDeleteDemand = (demandId: string) => {
    const demand = demands.find((d) => d.id === demandId);
    if (demand) {
      setDemandToDelete(demand);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDeleteDemand = () => {
    if (demandToDelete) {
      const updatedDemands = demands.filter((d) => d.id !== demandToDelete.id);
      saveDemands(updatedDemands);
      onDemandsChange(updatedDemands);
      setIsDeleteDialogOpen(false);
      setDemandToDelete(null);
    }
  };

  const cancelDeleteDemand = () => {
    setIsDeleteDialogOpen(false);
    setDemandToDelete(null);
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
    if (demands.length === 0) return "";
    const lastDemand = demands[demands.length - 1];
    return lastDemand.ferramentasTecnologias || "";
  };

  const getLastDemandAmbienteDSV = (): string => {
    if (demands.length === 0) return "";
    const lastDemand = demands[demands.length - 1];
    return lastDemand.ambienteDSV || "";
  };

  const getLastDemandRepositorioImplementacoes = (): string => {
    if (demands.length === 0) return "";
    const lastDemand = demands[demands.length - 1];
    return lastDemand.repositorioImplementacoes || "";
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
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddDemand}>
            + Adicionar Demanda
          </Button>
          {onNavigateToPreview && (
            <Button
              onClick={onNavigateToPreview}
              disabled={demands.length === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Visualizar
            </Button>
          )}
        </div>
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
                      <span className="font-medium">Prioridade:</span>{" "}
                      {demand.nivelPrioridade}
                    </p>
                    <p>
                      <span className="font-medium">Tipo:</span>{" "}
                      {demand.tipoDemanda}
                    </p>
                    <p>
                      <span className="font-medium">Solicitada via:</span>{" "}
                      {demand.demandaSolicitadaVia}
                    </p>
                    <p>
                      <span className="font-medium">Responsável Técnico:</span>{" "}
                      {demand.responsavelTecnico}
                    </p>
                    <p>
                      <span className="font-medium">
                        Perfil do desenvolvedor:
                      </span>{" "}
                      {demand.perfilDesenvolvedor}
                    </p>
                    <p>
                      <span className="font-medium">Complexidade:</span>{" "}
                      {demand.complexidadeDemanda}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditDemand(demand)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteDemand(demand.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Remover
                  </Button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm">
                  <span className="font-medium">Breve descrição:</span>{" "}
                  {demand.breveDescricao}
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
              {editingDemand ? "Editar Demanda" : "Nova Demanda"}
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

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Remoção</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover a demanda{" "}
              <strong>"{demandToDelete?.titulo}"</strong>? Esta ação não pode
              ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDeleteDemand}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDeleteDemand}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

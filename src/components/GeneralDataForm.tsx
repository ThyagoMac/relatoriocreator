import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  generalDataSchema,
  type GeneralDataFormData,
} from "../schemas/generalDataSchema";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Label } from "./ui/Label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import {
  loadGeneralData,
  saveGeneralData,
  getDefaultGeneralData,
  imageToBase64,
  clearAllDatabase,
} from "../utils/storage";
import type { GeneralData } from "../types/report";
import { formatCurrentDate } from "../utils/date";

interface GeneralDataFormProps {
  onSave: (data: GeneralData) => void;
}

export function GeneralDataForm({ onSave }: GeneralDataFormProps) {
  const [isClearing, setIsClearing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<GeneralDataFormData>({
    resolver: zodResolver(generalDataSchema),
    defaultValues: getDefaultGeneralData(),
  });

  const logoEmpresa = watch("logoEmpresa");
  const imagemCapa = watch("imagemCapa");

  useEffect(() => {
    const loadData = async () => {
      const stored = await loadGeneralData();
      if (stored) {
        Object.entries(stored).forEach(([key, value]) => {
          // Não carrega a data do localStorage, sempre usa a data de hoje
          if (key !== "data") {
            setValue(key as keyof GeneralDataFormData, value as any);
          }
        });
      }
      // Sempre define a data de hoje, independente do que está salvo
      setValue("data", formatCurrentDate());
    };
    loadData();
  }, [setValue]);

  const handleImageUpload = async (
    file: File | null,
    field: "logoEmpresa" | "imagemCapa"
  ) => {
    if (file) {
      try {
        const base64 = await imageToBase64(file);
        setValue(field, base64);
      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
      }
    } else {
      setValue(field, null);
    }
  };

  const onSubmit = async (data: GeneralDataFormData) => {
    const generalData: GeneralData = {
      ...data,
      logoEmpresa: data.logoEmpresa || null,
      imagemCapa: data.imagemCapa || null,
    };
    await saveGeneralData(generalData);
    onSave(generalData);
  };

  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmClearDatabase = async () => {
    setIsClearing(true);

    try {
      await clearAllDatabase();

      // Reseta o formulário para os valores padrão
      reset(getDefaultGeneralData());

      closeConfirmModal();

      // Recarrega a página para garantir que tudo seja resetado
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Erro ao limpar banco de dados:", error);
      alert("❌ Erro ao limpar o banco de dados. Tente novamente.");
      setIsClearing(false);
      closeConfirmModal();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <Label htmlFor="logoEmpresa">Logo da Empresa *</Label>
          <div className="mt-2">
            <Input
              id="logoEmpresa"
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageUpload(e.target.files?.[0] || null, "logoEmpresa")
              }
              className="cursor-pointer"
            />
            {logoEmpresa && (
              <div className="mt-4">
                <img
                  src={logoEmpresa}
                  alt="Logo da empresa"
                  className="h-24 w-auto object-contain border border-gray-300 rounded"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="nomeUsuario">Nome do Usuário *</Label>
          <Input
            id="nomeUsuario"
            {...register("nomeUsuario")}
            className={errors.nomeUsuario ? "border-red-500" : ""}
          />
          {errors.nomeUsuario && (
            <p className="mt-1 text-sm text-red-500">
              {errors.nomeUsuario.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="prepostoGerente">
            Preposto/Gerente de Projetos *
          </Label>
          <Input
            id="prepostoGerente"
            {...register("prepostoGerente")}
            className={errors.prepostoGerente ? "border-red-500" : ""}
          />
          {errors.prepostoGerente && (
            <p className="mt-1 text-sm text-red-500">
              {errors.prepostoGerente.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="responsavelTecnico">Responsável Técnico *</Label>
          <Input
            id="responsavelTecnico"
            {...register("responsavelTecnico")}
            className={errors.responsavelTecnico ? "border-red-500" : ""}
          />
          {errors.responsavelTecnico && (
            <p className="mt-1 text-sm text-red-500">
              {errors.responsavelTecnico.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="fiscalContrato">Fiscal do Contrato *</Label>
          <Input
            id="fiscalContrato"
            {...register("fiscalContrato")}
            className={errors.fiscalContrato ? "border-red-500" : ""}
          />
          {errors.fiscalContrato && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fiscalContrato.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="titulo">Título *</Label>
          <Input
            id="titulo"
            {...register("titulo")}
            className={errors.titulo ? "border-red-500" : ""}
          />
          {errors.titulo && (
            <p className="mt-1 text-sm text-red-500">{errors.titulo.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="imagemCapa">Imagem para a Capa *</Label>
          <div className="mt-2">
            <Input
              id="imagemCapa"
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageUpload(e.target.files?.[0] || null, "imagemCapa")
              }
              className="cursor-pointer"
            />
            {imagemCapa && (
              <div className="mt-4">
                <img
                  src={imagemCapa}
                  alt="Imagem da capa"
                  className="h-48 w-auto object-contain border border-gray-300 rounded"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="subtitulo">Sub-título *</Label>
          <Input
            id="subtitulo"
            {...register("subtitulo")}
            className={errors.subtitulo ? "border-red-500" : ""}
          />
          {errors.subtitulo && (
            <p className="mt-1 text-sm text-red-500">
              {errors.subtitulo.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="objetivoArtefato">Objetivo deste artefato *</Label>
          <Textarea
            id="objetivoArtefato"
            {...register("objetivoArtefato")}
            rows={4}
            className={errors.objetivoArtefato ? "border-red-500" : ""}
          />
          {errors.objetivoArtefato && (
            <p className="mt-1 text-sm text-red-500">
              {errors.objetivoArtefato.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="numeroContrato">Nº do Contrato *</Label>
          <Input
            id="numeroContrato"
            {...register("numeroContrato")}
            className={errors.numeroContrato ? "border-red-500" : ""}
          />
          {errors.numeroContrato && (
            <p className="mt-1 text-sm text-red-500">
              {errors.numeroContrato.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="numeroOS">Nº da OS *</Label>
          <Input
            id="numeroOS"
            {...register("numeroOS")}
            className={errors.numeroOS ? "border-red-500" : ""}
          />
          {errors.numeroOS && (
            <p className="mt-1 text-sm text-red-500">
              {errors.numeroOS.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="detalhamentoOS">Detalhamento da OS *</Label>
          <Textarea
            id="detalhamentoOS"
            {...register("detalhamentoOS")}
            rows={4}
            className={errors.detalhamentoOS ? "border-red-500" : ""}
            placeholder="Descreva o detalhamento da Ordem de Serviço"
          />
          {errors.detalhamentoOS && (
            <p className="mt-1 text-sm text-red-500">
              {errors.detalhamentoOS.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="objetivoERS">
            O(s) objetivo(s) desta ERS é (são) *
          </Label>
          <Textarea
            id="objetivoERS"
            {...register("objetivoERS")}
            rows={3}
            className={errors.objetivoERS ? "border-red-500" : ""}
          />
          {errors.objetivoERS && (
            <p className="mt-1 text-sm text-red-500">
              {errors.objetivoERS.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="data">Data *</Label>
          <Input
            id="data"
            {...register("data")}
            placeholder="dd/mm/aaaa"
            className={errors.data ? "border-red-500" : ""}
          />
          <div className="mt-2 flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-blue-800">
              <strong>Aviso:</strong> Este campo está preenchido automaticamente
              com a data de hoje ({formatCurrentDate()}).
            </div>
          </div>
          {errors.data && (
            <p className="mt-1 text-sm text-red-500">{errors.data.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="autorEmail">Autor (e-mail) *</Label>
          <Input
            id="autorEmail"
            type="email"
            {...register("autorEmail")}
            className={errors.autorEmail ? "border-red-500" : ""}
          />
          {errors.autorEmail && (
            <p className="mt-1 text-sm text-red-500">
              {errors.autorEmail.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="descricao">Descrição *</Label>
          <Input
            id="descricao"
            {...register("descricao")}
            className={errors.descricao ? "border-red-500" : ""}
          />
          {errors.descricao && (
            <p className="mt-1 text-sm text-red-500">
              {errors.descricao.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="destructive"
          onClick={openConfirmModal}
          disabled={isClearing}
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
          {isClearing ? "Limpando..." : "Limpar Banco de Dados"}
        </Button>

        <Button type="submit">
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
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          Salvar Dados Gerais
        </Button>
      </div>

      {/* Modal de Confirmação */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Atenção: Ação Irreversível!
            </DialogTitle>
            <DialogDescription className="pt-4 space-y-3">
              <p className="text-base text-gray-700">
                Esta ação irá{" "}
                <strong className="text-red-600">APAGAR PERMANENTEMENTE</strong>{" "}
                todos os dados do banco de dados, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                <li>Todos os Dados Gerais do Relatório</li>
                <li>TODAS as Demandas cadastradas</li>
                <li>Todas as imagens e evidências</li>
              </ul>
              <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-4">
                <p className="text-sm text-red-800 font-semibold">
                  ⚠️ Esta ação NÃO pode ser desfeita!
                </p>
              </div>
              <p className="text-base text-gray-700 mt-4">
                Tem certeza que deseja continuar?
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={closeConfirmModal}
              disabled={isClearing}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmClearDatabase}
              disabled={isClearing}
            >
              {isClearing ? (
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
                  Limpando...
                </>
              ) : (
                "Sim, Limpar Banco de Dados"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}

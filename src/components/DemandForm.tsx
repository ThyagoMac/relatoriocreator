import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { demandSchema, type DemandFormData } from "../schemas/demandSchema";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Label } from "./ui/Label";
import { Checkbox } from "./ui/Checkbox";
import type {
  PriorityLevel,
  DemandType,
  DemandSource,
  ActivityType,
  DeveloperLevel,
  ComplexityLevel,
  Demand,
  Evidence,
} from "../types/report";
import { imageToBase64 } from "../utils/storage";

interface DemandFormProps {
  initialData?: Demand;
  onSubmit: (data: Demand) => void;
  onCancel: () => void;
  defaultResponsavelTecnico?: string;
  defaultAtividadesRealizadas?: ActivityType[];
  defaultFerramentasTecnologias?: string;
  defaultAmbienteDSV?: string;
  defaultRepositorioImplementacoes?: string;
  defaultPerfilDesenvolvedor?: DeveloperLevel;
}

const PRIORITY_LEVELS: PriorityLevel[] = ["Urgente", "Alta", "Média", "Baixa"];
const DEMAND_TYPES: DemandType[] = [
  "Configuração",
  "Nova demanda",
  "Sustentação",
  "Garantia",
];
const DEMAND_SOURCES: DemandSource[] = [
  "Levantamento de Requisitos",
  "Inspeção de Sistemas",
  "E-mail",
];
const ACTIVITIES: ActivityType[] = [
  "Definir arquitetura",
  "Montar ambiente arquitetural",
  "Modelar BD/Configurar BD/ Intervenção no BD",
  "Configurar sistemas e/ou ambiente",
  "Elaborar Relatório",
  "Desenvolver back-end",
  "Desenvolver front-end",
  "Integrar sistemas",
  "Desenvolver serviço",
  "Desenvolver rotina",
  "Teste caixa branca (manual)",
  "Teste caixa preta (unitário)",
  "Criar massa de teste",
  "Merge de versões",
  "Consultas ao Sistema",
];
const DEVELOPER_LEVELS: DeveloperLevel[] = [
  "Trainee",
  "Júnior",
  "Pleno",
  "Sênior",
  "Especialista",
];
const COMPLEXITY_LEVELS: ComplexityLevel[] = [
  "Baixa",
  "Média",
  "Intermediária",
  "Alta",
  "Especialista",
];

export function DemandForm({
  initialData,
  onSubmit,
  onCancel,
  defaultResponsavelTecnico,
  defaultAtividadesRealizadas,
  defaultFerramentasTecnologias,
  defaultAmbienteDSV,
  defaultRepositorioImplementacoes,
  defaultPerfilDesenvolvedor,
}: DemandFormProps) {
  // Calcula os valores padrão com useMemo para evitar recálculos desnecessários
  const formDefaultValues = useMemo((): DemandFormData => {
    if (initialData) {
      // Migra dados antigos para o novo formato se necessário
      if (initialData.evidencias && initialData.evidencias.length > 0) {
        return initialData;
      }
      // Se tem dados antigos, migra para o novo formato
      if (initialData.evidenciaImagem || initialData.evidenciaTexto) {
        return {
          ...initialData,
          evidencias: [
            {
              id: crypto.randomUUID(),
              imagens: initialData.evidenciaImagem
                ? [initialData.evidenciaImagem]
                : [],
              descricao: initialData.evidenciaTexto || "",
            },
          ],
        };
      }
      return {
        ...initialData,
        evidencias: [
          {
            id: crypto.randomUUID(),
            imagens: [],
            descricao: "",
          },
        ],
      };
    }
    return {
      id: crypto.randomUUID(),
      titulo: "",
      nivelPrioridade: "Urgente" as PriorityLevel,
      tipoDemanda: "Nova demanda" as DemandType,
      demandaSolicitadaVia: "Inspeção de Sistemas" as DemandSource,
      responsavelTecnico: defaultResponsavelTecnico || "",
      atividadesRealizadas:
        defaultAtividadesRealizadas && defaultAtividadesRealizadas.length > 0
          ? defaultAtividadesRealizadas
          : (["Elaborar Relatório", "Desenvolver front-end"] as ActivityType[]),
      breveDescricao: "",
      ferramentasTecnologias: defaultFerramentasTecnologias || "",
      ambienteDSV: defaultAmbienteDSV || "",
      repositorioImplementacoes: defaultRepositorioImplementacoes || "",
      nomeFuncionalidadeTela: "",
      perfilDesenvolvedor: (defaultPerfilDesenvolvedor ||
        "Pleno") as DeveloperLevel,
      complexidadeDemanda: "Baixa" as ComplexityLevel,
      evidencias: [
        {
          id: crypto.randomUUID(),
          imagens: [],
          descricao: "",
        },
      ],
    };
  }, [
    initialData,
    defaultResponsavelTecnico,
    defaultAtividadesRealizadas,
    defaultFerramentasTecnologias,
    defaultAmbienteDSV,
    defaultRepositorioImplementacoes,
    defaultPerfilDesenvolvedor,
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    getValues,
  } = useForm<DemandFormData>({
    resolver: zodResolver(demandSchema),
    defaultValues: formDefaultValues,
  });

  // Reseta o formulário quando os valores padrão mudarem
  useEffect(() => {
    reset(formDefaultValues);
  }, [formDefaultValues, reset]);

  const atividadesRealizadas = watch("atividadesRealizadas") || [];
  const evidencias = watch("evidencias") || [];

  const handleActivityToggle = (activity: ActivityType) => {
    const current = atividadesRealizadas;
    if (current.includes(activity)) {
      setValue(
        "atividadesRealizadas",
        current.filter((a) => a !== activity)
      );
    } else {
      setValue("atividadesRealizadas", [...current, activity]);
    }
  };

  const addEvidence = () => {
    const currentEvidencias = getValues("evidencias") || [];
    const newEvidence: Evidence = {
      id: crypto.randomUUID(),
      imagens: [],
      descricao: "",
    };
    setValue("evidencias", [...currentEvidencias, newEvidence]);
  };

  const removeEvidence = (evidenceId: string) => {
    const currentEvidencias = getValues("evidencias") || [];
    setValue(
      "evidencias",
      currentEvidencias.filter((e) => e.id !== evidenceId)
    );
  };

  const handleMultipleImagesUpload = async (
    files: File[],
    evidenceId: string
  ) => {
    if (files.length === 0) return;

    try {
      const base64Promises = files.map((file) => imageToBase64(file));
      const base64Images = await Promise.all(base64Promises);

      const currentEvidencias = getValues("evidencias") || [];
      const evidenceIndex = currentEvidencias.findIndex(
        (e) => e.id === evidenceId
      );

      if (evidenceIndex !== -1) {
        const updatedEvidencias = [...currentEvidencias];
        updatedEvidencias[evidenceIndex] = {
          ...updatedEvidencias[evidenceIndex],
          imagens: [
            ...updatedEvidencias[evidenceIndex].imagens,
            ...base64Images,
          ],
        };
        setValue("evidencias", updatedEvidencias);
      }
    } catch (error) {
      console.error("Erro ao fazer upload das imagens:", error);
    }
  };

  const removeImage = (evidenceId: string, imageIndex: number) => {
    const currentEvidencias = getValues("evidencias") || [];
    const evidenceIndex = currentEvidencias.findIndex(
      (e) => e.id === evidenceId
    );

    if (evidenceIndex !== -1) {
      const updatedEvidencias = [...currentEvidencias];
      updatedEvidencias[evidenceIndex] = {
        ...updatedEvidencias[evidenceIndex],
        imagens: updatedEvidencias[evidenceIndex].imagens.filter(
          (_, idx) => idx !== imageIndex
        ),
      };
      setValue("evidencias", updatedEvidencias);
    }
  };

  const updateEvidenceDescription = (evidenceId: string, descricao: string) => {
    const currentEvidencias = getValues("evidencias") || [];
    const evidenceIndex = currentEvidencias.findIndex(
      (e) => e.id === evidenceId
    );

    if (evidenceIndex !== -1) {
      const updatedEvidencias = [...currentEvidencias];
      updatedEvidencias[evidenceIndex] = {
        ...updatedEvidencias[evidenceIndex],
        descricao,
      };
      setValue("evidencias", updatedEvidencias);
    }
  };

  const onFormSubmit = (data: DemandFormData) => {
    const demand: Demand = {
      ...data,
      evidencias: data.evidencias || [],
    };
    onSubmit(demand);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
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
        <Label>Nível de prioridade *</Label>
        <div className="mt-2 space-y-2">
          {PRIORITY_LEVELS.map((level) => (
            <label key={level} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={watch("nivelPrioridade") === level}
                onChange={() => setValue("nivelPrioridade", level)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span>
                ( {watch("nivelPrioridade") === level ? "x" : " "} ) {level}
              </span>
            </label>
          ))}
        </div>
        {errors.nivelPrioridade && (
          <p className="mt-1 text-sm text-red-500">
            {errors.nivelPrioridade.message}
          </p>
        )}
      </div>

      <div>
        <Label>Tipo da demanda *</Label>
        <div className="mt-2 space-y-2">
          {DEMAND_TYPES.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={watch("tipoDemanda") === type}
                onChange={() => setValue("tipoDemanda", type)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span>
                ( {watch("tipoDemanda") === type ? "x" : " "} ) {type}
              </span>
            </label>
          ))}
        </div>
        {errors.tipoDemanda && (
          <p className="mt-1 text-sm text-red-500">
            {errors.tipoDemanda.message}
          </p>
        )}
      </div>

      <div>
        <Label>Demanda solicitada via *</Label>
        <div className="mt-2 space-y-2">
          {DEMAND_SOURCES.map((source) => (
            <label key={source} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={watch("demandaSolicitadaVia") === source}
                onChange={() => setValue("demandaSolicitadaVia", source)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span>
                ( {watch("demandaSolicitadaVia") === source ? "x" : " "} ){" "}
                {source}
              </span>
            </label>
          ))}
        </div>
        {errors.demandaSolicitadaVia && (
          <p className="mt-1 text-sm text-red-500">
            {errors.demandaSolicitadaVia.message}
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
        <Label>Atividades realizadas *</Label>
        <div className="mt-2 space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded p-4">
          {ACTIVITIES.map((activity) => (
            <label key={activity} className="flex items-center space-x-2">
              <Checkbox
                checked={atividadesRealizadas.includes(activity)}
                onChange={() => handleActivityToggle(activity)}
              />
              <span>
                ( {atividadesRealizadas.includes(activity) ? "x" : " "} ){" "}
                {activity}
              </span>
            </label>
          ))}
        </div>
        {errors.atividadesRealizadas && (
          <p className="mt-1 text-sm text-red-500">
            {errors.atividadesRealizadas.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="breveDescricao">Breve descrição das atividades *</Label>
        <Textarea
          id="breveDescricao"
          {...register("breveDescricao")}
          rows={4}
          className={errors.breveDescricao ? "border-red-500" : ""}
        />
        {errors.breveDescricao && (
          <p className="mt-1 text-sm text-red-500">
            {errors.breveDescricao.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="ferramentasTecnologias">
          Ferramentas e Tecnologias utilizadas *
        </Label>
        <Input
          id="ferramentasTecnologias"
          {...register("ferramentasTecnologias")}
          className={errors.ferramentasTecnologias ? "border-red-500" : ""}
        />
        {errors.ferramentasTecnologias && (
          <p className="mt-1 text-sm text-red-500">
            {errors.ferramentasTecnologias.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="ambienteDSV">Ambiente dsv *</Label>
        <Input
          id="ambienteDSV"
          {...register("ambienteDSV")}
          className={errors.ambienteDSV ? "border-red-500" : ""}
        />
        {errors.ambienteDSV && (
          <p className="mt-1 text-sm text-red-500">
            {errors.ambienteDSV.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="repositorioImplementacoes">
          Repositório com as implementações *
        </Label>
        <Input
          id="repositorioImplementacoes"
          {...register("repositorioImplementacoes")}
          className={errors.repositorioImplementacoes ? "border-red-500" : ""}
        />
        {errors.repositorioImplementacoes && (
          <p className="mt-1 text-sm text-red-500">
            {errors.repositorioImplementacoes.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="nomeFuncionalidadeTela">
          Nome da Funcionalidade/Tela *
        </Label>
        <Input
          id="nomeFuncionalidadeTela"
          {...register("nomeFuncionalidadeTela")}
          className={errors.nomeFuncionalidadeTela ? "border-red-500" : ""}
        />
        {errors.nomeFuncionalidadeTela && (
          <p className="mt-1 text-sm text-red-500">
            {errors.nomeFuncionalidadeTela.message}
          </p>
        )}
      </div>

      <div>
        <Label>Perfil do desenvolvedor *</Label>
        <div className="mt-2 space-y-2">
          {DEVELOPER_LEVELS.map((level) => (
            <label key={level} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={watch("perfilDesenvolvedor") === level}
                onChange={() => setValue("perfilDesenvolvedor", level)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span>
                ( {watch("perfilDesenvolvedor") === level ? "x" : " "} ) {level}
              </span>
            </label>
          ))}
        </div>
        {errors.perfilDesenvolvedor && (
          <p className="mt-1 text-sm text-red-500">
            {errors.perfilDesenvolvedor.message}
          </p>
        )}
      </div>

      <div>
        <Label>Complexidade da demanda *</Label>
        <div className="mt-2 space-y-2">
          {COMPLEXITY_LEVELS.map((level) => (
            <label key={level} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={watch("complexidadeDemanda") === level}
                onChange={() => setValue("complexidadeDemanda", level)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span>
                ( {watch("complexidadeDemanda") === level ? "x" : " "} ) {level}
              </span>
            </label>
          ))}
        </div>
        {errors.complexidadeDemanda && (
          <p className="mt-1 text-sm text-red-500">
            {errors.complexidadeDemanda.message}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <Label>Evidências da Configuração e/ou Desenvolvimento *</Label>
          <Button
            type="button"
            variant="outline"
            onClick={addEvidence}
            className="text-sm"
          >
            + Adicionar Evidência
          </Button>
        </div>

        {evidencias.length === 0 && (
          <p className="text-sm text-gray-500 mb-4">
            Nenhuma evidência adicionada. Clique em "Adicionar Evidência" para
            começar.
          </p>
        )}

        <div className="space-y-6">
          {evidencias.map((evidence, evidenceIndex) => (
            <div
              key={evidence.id}
              className="border border-gray-300 rounded-lg p-4 space-y-4 bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700">
                  Evidência {evidenceIndex + 1}
                </h3>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeEvidence(evidence.id)}
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
                  Remover Evidência
                </Button>
              </div>

              <div>
                <Label>
                  Imagens{" "}
                  {evidence.imagens.length > 0 &&
                    `(${evidence.imagens.length})`}
                </Label>
                <div className="mt-2 space-y-2">
                  <div
                    onPaste={(e) => {
                      e.preventDefault();
                      const items = e.clipboardData.items;
                      const imageFiles: File[] = [];

                      for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        if (item.type.startsWith("image/")) {
                          const file = item.getAsFile();
                          if (file) {
                            imageFiles.push(file);
                          }
                        }
                      }

                      if (imageFiles.length > 0) {
                        handleMultipleImagesUpload(imageFiles, evidence.id);
                      }
                    }}
                    tabIndex={0}
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length > 0) {
                          handleMultipleImagesUpload(files, evidence.id);
                        }
                        // Limpa o input para permitir selecionar as mesmas imagens novamente
                        e.target.value = "";
                      }}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Arraste arquivos ou clique no campo acima para adicionar
                      imagem. <br /> Ou clicke{" "}
                      <span className="text-blue-500 font-bold">AQUI</span> para
                      selecionar e depois CTRL+V para colar imagens que estejam
                      salva na memoria do seu sistema operacional.
                    </p>
                  </div>

                  {evidence.imagens.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {evidence.imagens.map((imagem, imgIndex) => (
                        <div key={imgIndex} className="relative group">
                          <img
                            src={imagem}
                            alt={`Evidência ${evidenceIndex + 1} - Imagem ${
                              imgIndex + 1
                            }`}
                            className="w-full h-48 object-contain border border-gray-300 rounded bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(evidence.id, imgIndex)}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                            title="Remover imagem"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor={`evidencia-descricao-${evidence.id}`}>
                  Descrição da Evidência *
                </Label>
                <Textarea
                  id={`evidencia-descricao-${evidence.id}`}
                  value={evidence.descricao}
                  onChange={(e) =>
                    updateEvidenceDescription(evidence.id, e.target.value)
                  }
                  rows={4}
                  className="mt-2"
                />
                {errors.evidencias?.[evidenceIndex]?.descricao && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.evidencias[evidenceIndex]?.descricao?.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {errors.evidencias && typeof errors.evidencias.message === "string" && (
          <p className="mt-2 text-sm text-red-500">
            {errors.evidencias.message}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          Salvar Demanda
        </Button>
      </div>
    </form>
  );
}

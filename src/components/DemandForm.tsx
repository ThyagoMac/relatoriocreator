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
      return initialData;
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
      evidenciaImagem: null,
      evidenciaTexto: "",
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
  } = useForm<DemandFormData>({
    resolver: zodResolver(demandSchema),
    defaultValues: formDefaultValues,
  });

  // Reseta o formulário quando os valores padrão mudarem
  useEffect(() => {
    reset(formDefaultValues);
  }, [formDefaultValues, reset]);

  const atividadesRealizadas = watch("atividadesRealizadas") || [];
  const evidenciaImagem = watch("evidenciaImagem");

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

  const handleImageUpload = async (file: File | null) => {
    if (file) {
      try {
        const base64 = await imageToBase64(file);
        setValue("evidenciaImagem", base64);
      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
      }
    } else {
      setValue("evidenciaImagem", null);
    }
  };

  const onFormSubmit = (data: DemandFormData) => {
    const demand: Demand = {
      ...data,
      evidenciaImagem: data.evidenciaImagem || null,
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
        <Label htmlFor="evidenciaImagem">
          Evidência da Configuração e/ou Desenvolvimento (imagem)
        </Label>
        <div className="mt-2">
          <Input
            id="evidenciaImagem"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
            className="cursor-pointer"
          />
          {evidenciaImagem && (
            <div className="mt-4">
              <img
                src={evidenciaImagem}
                alt="Evidência"
                className="max-h-64 w-auto object-contain border border-gray-300 rounded"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="evidenciaTexto">
          Evidência da Configuração e/ou Desenvolvimento (texto) *
        </Label>
        <Textarea
          id="evidenciaTexto"
          {...register("evidenciaTexto")}
          rows={4}
          className={errors.evidenciaTexto ? "border-red-500" : ""}
        />
        {errors.evidenciaTexto && (
          <p className="mt-1 text-sm text-red-500">
            {errors.evidenciaTexto.message}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar Demanda</Button>
      </div>
    </form>
  );
}

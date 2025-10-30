import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generalDataSchema, type GeneralDataFormData } from '../schemas/generalDataSchema';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Label } from './ui/Label';
import { loadGeneralData, saveGeneralData, getDefaultGeneralData, imageToBase64 } from '../utils/storage';
import type { GeneralData } from '../types/report';

interface GeneralDataFormProps {
  onSave: (data: GeneralData) => void;
}

export function GeneralDataForm({ onSave }: GeneralDataFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<GeneralDataFormData>({
    resolver: zodResolver(generalDataSchema),
    defaultValues: (() => {
      const stored = loadGeneralData();
      return stored ? (stored as GeneralDataFormData) : getDefaultGeneralData();
    })(),
  });

  const logoEmpresa = watch('logoEmpresa');
  const imagemCapa = watch('imagemCapa');

  useEffect(() => {
    const stored = loadGeneralData();
    if (stored) {
      Object.entries(stored).forEach(([key, value]) => {
        setValue(key as keyof GeneralDataFormData, value as any);
      });
    }
  }, [setValue]);

  const handleImageUpload = async (
    file: File | null,
    field: 'logoEmpresa' | 'imagemCapa'
  ) => {
    if (file) {
      try {
        const base64 = await imageToBase64(file);
        setValue(field, base64);
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
      }
    } else {
      setValue(field, null);
    }
  };

  const onSubmit = (data: GeneralDataFormData) => {
    const generalData: GeneralData = {
      ...data,
      logoEmpresa: data.logoEmpresa || null,
      imagemCapa: data.imagemCapa || null,
    };
    saveGeneralData(generalData);
    onSave(generalData);
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
              onChange={(e) => handleImageUpload(e.target.files?.[0] || null, 'logoEmpresa')}
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
            {...register('nomeUsuario')}
            className={errors.nomeUsuario ? 'border-red-500' : ''}
          />
          {errors.nomeUsuario && (
            <p className="mt-1 text-sm text-red-500">{errors.nomeUsuario.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="prepostoGerente">Preposto/Gerente de Projetos *</Label>
          <Input
            id="prepostoGerente"
            {...register('prepostoGerente')}
            className={errors.prepostoGerente ? 'border-red-500' : ''}
          />
          {errors.prepostoGerente && (
            <p className="mt-1 text-sm text-red-500">{errors.prepostoGerente.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="responsavelTecnico">Responsável Técnico *</Label>
          <Input
            id="responsavelTecnico"
            {...register('responsavelTecnico')}
            className={errors.responsavelTecnico ? 'border-red-500' : ''}
          />
          {errors.responsavelTecnico && (
            <p className="mt-1 text-sm text-red-500">{errors.responsavelTecnico.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="fiscalContrato">Fiscal do Contrato *</Label>
          <Input
            id="fiscalContrato"
            {...register('fiscalContrato')}
            className={errors.fiscalContrato ? 'border-red-500' : ''}
          />
          {errors.fiscalContrato && (
            <p className="mt-1 text-sm text-red-500">{errors.fiscalContrato.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="titulo">Título *</Label>
          <Input
            id="titulo"
            {...register('titulo')}
            className={errors.titulo ? 'border-red-500' : ''}
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
              onChange={(e) => handleImageUpload(e.target.files?.[0] || null, 'imagemCapa')}
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
            {...register('subtitulo')}
            className={errors.subtitulo ? 'border-red-500' : ''}
          />
          {errors.subtitulo && (
            <p className="mt-1 text-sm text-red-500">{errors.subtitulo.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="objetivoArtefato">Objetivo deste artefato *</Label>
          <Textarea
            id="objetivoArtefato"
            {...register('objetivoArtefato')}
            rows={4}
            className={errors.objetivoArtefato ? 'border-red-500' : ''}
          />
          {errors.objetivoArtefato && (
            <p className="mt-1 text-sm text-red-500">{errors.objetivoArtefato.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="numeroContrato">Nº do Contrato *</Label>
          <Input
            id="numeroContrato"
            {...register('numeroContrato')}
            className={errors.numeroContrato ? 'border-red-500' : ''}
          />
          {errors.numeroContrato && (
            <p className="mt-1 text-sm text-red-500">{errors.numeroContrato.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="numeroOS">Nº da OS *</Label>
          <Input
            id="numeroOS"
            {...register('numeroOS')}
            className={errors.numeroOS ? 'border-red-500' : ''}
          />
          {errors.numeroOS && (
            <p className="mt-1 text-sm text-red-500">{errors.numeroOS.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="detalhamentoOS">Detalhamento da OS *</Label>
          <Textarea
            id="detalhamentoOS"
            {...register('detalhamentoOS')}
            rows={4}
            className={errors.detalhamentoOS ? 'border-red-500' : ''}
            placeholder="Demandas de novo projeto, sustentação e correções (garantia), realizadas durante a sprint."
          />
          {errors.detalhamentoOS && (
            <p className="mt-1 text-sm text-red-500">{errors.detalhamentoOS.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="objetivoERS">O(s) objetivo(s) desta ERS é (são) *</Label>
          <Textarea
            id="objetivoERS"
            {...register('objetivoERS')}
            rows={3}
            className={errors.objetivoERS ? 'border-red-500' : ''}
          />
          {errors.objetivoERS && (
            <p className="mt-1 text-sm text-red-500">{errors.objetivoERS.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="data">Data *</Label>
          <Input
            id="data"
            {...register('data')}
            placeholder="dd/mm/aaaa"
            className={errors.data ? 'border-red-500' : ''}
          />
          {errors.data && (
            <p className="mt-1 text-sm text-red-500">{errors.data.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="autorEmail">Autor (e-mail) *</Label>
          <Input
            id="autorEmail"
            type="email"
            {...register('autorEmail')}
            className={errors.autorEmail ? 'border-red-500' : ''}
          />
          {errors.autorEmail && (
            <p className="mt-1 text-sm text-red-500">{errors.autorEmail.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="descricao">Descrição *</Label>
          <Input
            id="descricao"
            {...register('descricao')}
            className={errors.descricao ? 'border-red-500' : ''}
          />
          {errors.descricao && (
            <p className="mt-1 text-sm text-red-500">{errors.descricao.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Salvar Dados Gerais</Button>
      </div>
    </form>
  );
}

import { useRef } from 'react';
import { Button } from './ui/Button';
import { ReportPreview } from './ReportPreview';
import type { Report } from '../types/report';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ReportExportProps {
  report: Report;
}

export function ReportExport({ report }: ReportExportProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  const exportToPDF = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`relatorio-tecnico-${new Date().getTime()}.pdf`);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar PDF. Tente novamente.');
    }
  };

  const exportToHTML = () => {
    if (!previewRef.current) return;

    const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório Técnico</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        @media print {
            @page {
                margin: 2cm;
            }
            .page-break-inside-avoid {
                page-break-inside: avoid;
            }
        }
        .separator {
            height: 1px;
            background-color: #d1d5db;
            margin: 2rem 0;
        }
        .border-top {
            border-top: 2px solid #9ca3af;
            padding-top: 1rem;
        }
        .grid {
            display: grid;
            gap: 1rem;
        }
        .grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
        }
        .space-y-4 > * + * {
            margin-top: 1rem;
        }
        .space-y-6 > * + * {
            margin-top: 1.5rem;
        }
        .space-y-8 > * + * {
            margin-top: 2rem;
        }
        .p-8 {
            padding: 2rem;
        }
        .min-h-screen {
            min-height: 100vh;
        }
        .flex {
            display: flex;
        }
        .flex-col {
            flex-direction: column;
        }
        .items-center {
            align-items: center;
        }
        .justify-center {
            justify-content: center;
        }
        .text-center {
            text-align: center;
        }
        .text-justify {
            text-align: justify;
        }
        .text-4xl {
            font-size: 2.25rem;
        }
        .text-2xl {
            font-size: 1.5rem;
        }
        .text-xl {
            font-size: 1.25rem;
        }
        .font-bold {
            font-weight: 700;
        }
        .font-semibold {
            font-weight: 600;
        }
        .mb-4 {
            margin-bottom: 1rem;
        }
        .mb-8 {
            margin-bottom: 2rem;
        }
        .mt-2 {
            margin-top: 0.5rem;
        }
        .mt-16 {
            margin-top: 4rem;
        }
        .max-w-2xl {
            max-width: 42rem;
        }
        .w-full {
            width: 100%;
        }
        .h-auto {
            height: auto;
        }
        .h-16 {
            height: 4rem;
        }
        .h-24 {
            height: 6rem;
        }
        .object-contain {
            object-fit: contain;
        }
        .border-b-2 {
            border-bottom-width: 2px;
        }
        .border-gray-300 {
            border-color: #d1d5db;
        }
        .border {
            border-width: 1px;
        }
        .rounded {
            border-radius: 0.25rem;
        }
        ul {
            list-style: disc;
            padding-left: 1.5rem;
        }
    </style>
</head>
<body>
    ${previewRef.current.innerHTML}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-tecnico-${new Date().getTime()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-4 mb-6">
        <Button onClick={exportToHTML} variant="outline">
          Exportar HTML
        </Button>
        <Button onClick={exportToPDF}>Exportar PDF</Button>
      </div>

      <div ref={previewRef} className="bg-white">
        <ReportPreview report={report} />
      </div>
    </div>
  );
}

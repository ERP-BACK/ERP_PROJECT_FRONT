"use client";

import { useState, useRef, useCallback, type DragEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
  X,
} from "lucide-react";
import { ImportErrorTable } from "./import-error-table";
import { ImportPreviewTable } from "./import-preview-table";
import {
  uploadPreview,
  type ImportPreviewResult,
} from "@/action/import/upload-preview.action";
import { downloadTemplate } from "@/action/import/download-template.action";
import { confirmImport } from "@/action/import/confirm-import.action";
import {
  pollJobStatus,
  type JobStatusResult,
} from "@/action/import/poll-job-status.action";

type Step = "upload" | "preview" | "processing" | "completed" | "failed";

const STEPS: { key: Step; label: string }[] = [
  { key: "upload", label: "Subir" },
  { key: "preview", label: "Revisar" },
  { key: "processing", label: "Procesar" },
];

interface ExcelImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleKey: string;
  title?: string;
  onSuccess?: () => void;
}

export function ExcelImportDialog({
  open,
  onOpenChange,
  moduleKey,
  title = "Importar Excel",
  onSuccess,
}: ExcelImportDialogProps) {
  const [step, setStep] = useState<Step>("upload");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<ImportPreviewResult | null>(null);
  const [jobResult, setJobResult] = useState<JobStatusResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setStep("upload");
    setLoading(false);
    setError(null);
    setPreview(null);
    setJobResult(null);
    setProgress(0);
    setSelectedFile(null);
    setIsDragging(false);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const handleClose = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        reset();
      }
      onOpenChange(isOpen);
    },
    [onOpenChange, reset],
  );

  const handleDownloadTemplate = async () => {
    try {
      setLoading(true);
      const base64 = await downloadTemplate(moduleKey);
      const byteArray = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const blob = new Blob([byteArray], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${moduleKey}-plantilla.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error descargando plantilla");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.name.endsWith(".xlsx")) {
      setError("Solo se aceptan archivos .xlsx");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("El archivo excede el limite de 10MB");
      return;
    }
    setError(null);
    setSelectedFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileUpload = async () => {
    const file = selectedFile || fileRef.current?.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadPreview(moduleKey, formData);
      setPreview(result);
      setStep("preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error procesando archivo");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!preview || preview.validRows.length === 0) return;

    try {
      setLoading(true);
      setError(null);
      const { jobId } = await confirmImport(moduleKey, preview.validRows);
      setStep("processing");
      setProgress(0);

      const poll = async () => {
        let attempts = 0;
        const maxAttempts = 120;
        while (attempts < maxAttempts) {
          await new Promise((r) => setTimeout(r, 1000));
          const status = await pollJobStatus(jobId);

          if (status.status === "processing") {
            setProgress(status.progress || 0);
          }

          if (status.status === "completed") {
            setJobResult(status);
            setStep("completed");
            setProgress(100);
            onSuccess?.();
            return;
          }

          if (status.status === "failed") {
            setJobResult(status);
            setStep("failed");
            return;
          }

          attempts++;
        }

        setError("Tiempo de espera agotado");
        setStep("failed");
      };

      poll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error confirmando importacion");
      setStep("failed");
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = STEPS.findIndex((s) => s.key === step);
  const resolvedStepIndex =
    step === "completed" || step === "failed" ? STEPS.length : currentStepIndex;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl gap-0 p-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <DialogHeader>
            <DialogTitle className="text-base">{title}</DialogTitle>
            <DialogDescription>
              {step === "upload" && "Sube un archivo Excel (.xlsx) para importar datos."}
              {step === "preview" && "Revisa los datos antes de confirmar."}
              {step === "processing" && "Procesando la importacion..."}
              {step === "completed" && "Importacion completada exitosamente."}
              {step === "failed" && "Ocurrio un error durante la importacion."}
            </DialogDescription>
          </DialogHeader>

          {/* Step indicator */}
          <div className="mt-4 flex items-center gap-1">
            {STEPS.map((s, i) => (
              <div key={s.key} className="flex flex-1 items-center gap-1">
                <div className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                    className={`h-1 w-full rounded-full transition-colors ${
                      i <= resolvedStepIndex
                        ? step === "failed" && i === STEPS.length - 1
                          ? "bg-destructive"
                          : "bg-primary"
                        : "bg-muted"
                    }`}
                  />
                  <span
                    className={`text-[11px] transition-colors ${
                      i <= resolvedStepIndex
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t" />

        {/* Content */}
        <div className="px-6 py-5">
          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-md bg-destructive/8 px-3 py-2.5 text-sm text-destructive">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Step: Upload */}
          {step === "upload" && (
            <div className="space-y-4">
              {/* Drop zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileRef.current?.click()}
                className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-6 py-10 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : selectedFile
                      ? "border-primary/40 bg-primary/3"
                      : "border-border hover:border-primary/40 hover:bg-muted/50"
                }`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".xlsx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />

                {selectedFile ? (
                  <>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileSpreadsheet className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(0)} KB
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                      className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                      <Upload className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                    <p className="text-sm font-medium">
                      Arrastra tu archivo aqui
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      o haz clic para seleccionar
                    </p>
                    <p className="mt-3 text-[11px] text-muted-foreground/60">
                      Solo .xlsx · Maximo 10MB
                    </p>
                  </>
                )}
              </div>

              {/* Template download */}
              <button
                type="button"
                onClick={handleDownloadTemplate}
                disabled={loading}
                className="flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors hover:bg-muted/50 disabled:opacity-50"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                  <Download className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Descargar plantilla</p>
                  <p className="text-xs text-muted-foreground">
                    Archivo .xlsx con el formato correcto
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* Step: Preview */}
          {step === "preview" && preview && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-normal">
                  {preview.totalRows} filas totales
                </Badge>
                <Badge
                  variant="default"
                  className="font-normal"
                >
                  {preview.validCount} validas
                </Badge>
                {preview.errorCount > 0 && (
                  <Badge variant="destructive" className="font-normal">
                    {preview.errorCount} con errores
                  </Badge>
                )}
              </div>

              {preview.validRows.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Vista previa
                  </p>
                  <ImportPreviewTable rows={preview.validRows} />
                </div>
              )}

              {preview.errors.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium text-destructive uppercase tracking-wide">
                    Errores ({preview.errors.length})
                  </p>
                  <ImportErrorTable errors={preview.errors} />
                </div>
              )}
            </div>
          )}

          {/* Step: Processing */}
          {step === "processing" && (
            <div className="flex flex-col items-center py-8">
              <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium">Procesando importacion</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {progress}% completado
              </p>
              <div className="mt-4 w-full max-w-xs">
                <Progress value={progress} className="h-1.5" />
              </div>
            </div>
          )}

          {/* Step: Completed */}
          {step === "completed" && jobResult?.result && (
            <div className="flex flex-col items-center py-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <p className="text-sm font-semibold">Importacion exitosa</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {jobResult.result.created} registros creados
                {jobResult.result.failed > 0 && (
                  <span className="text-destructive">
                    {" "}· {jobResult.result.failed} fallidos
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Step: Failed */}
          {step === "failed" && (
            <div className="flex flex-col items-center py-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
              <p className="text-sm font-semibold">Error en la importacion</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {jobResult?.error || error || "Error desconocido"}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-muted/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              {step === "preview" && (
                <Button variant="ghost" size="sm" onClick={reset}>
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Volver
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {step === "upload" && (
                <Button
                  size="sm"
                  onClick={handleFileUpload}
                  disabled={loading || !selectedFile}
                >
                  {loading && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                  Subir y previsualizar
                </Button>
              )}
              {step === "preview" && (
                <Button
                  size="sm"
                  onClick={handleConfirm}
                  disabled={loading || !preview || preview.validCount === 0}
                >
                  {loading && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                  Confirmar ({preview?.validCount || 0} filas)
                </Button>
              )}
              {(step === "completed" || step === "failed") && (
                <Button size="sm" variant="outline" onClick={() => handleClose(false)}>
                  Cerrar
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

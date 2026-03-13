"use server";

import { apiImportDownload } from "@/lib/api-upload";

export async function downloadTemplate(moduleKey: string, rute: string = 'api/import'): Promise<string> {
  const blob = await apiImportDownload(`/${rute}/${moduleKey}/template`);
  const arrayBuffer = await blob.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return base64;
}

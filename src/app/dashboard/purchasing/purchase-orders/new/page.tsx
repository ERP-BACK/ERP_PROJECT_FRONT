"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/hooks/use-toast";
import { OrderFormPage } from "@/shared/presentation/components/order-form";
import { purchaseOrderFormConfig } from "../presentation/forms/purchase-order-form.config";
import { searchProducts } from "@/app/dashboard/inventory/products/application/use-cases/product-search.action";
import { searchWarehouses } from "@/app/dashboard/inventory/warehouses/application/use-cases/warehouse-search.action";
import { searchUom } from "@/app/dashboard/masters/uom/application/use-cases/uom-search.action";
import { searchTaxCodes } from "@/app/dashboard/masters/tax-codes/application/use-cases/tax-code-search.action";
import * as actions from "../application/use-cases/purchase-order.actions";
import type { PurchaseOrder } from "../domain/entities/purchase-order.entity";
import type { OrderLine } from "@/shared/presentation/components/order-lines";

function mapToBackendLines(lines: OrderLine[]) {
  return lines.map((line) => {
    const payload: Record<string, any> = {
      description: line.description,
      quantity_ordered: line.quantity,
      uom_id: line.uom_id || "UND",
      unit_price: line.unit_price,
      discount_percent: line.discount_percent,
    };
    if (line.product_id) payload.product_id = line.product_id;
    if (line.tax_code_id) payload.tax_code_id = line.tax_code_id;
    if (line.warehouse_id) payload.destination_warehouse_id = line.warehouse_id;
    return payload;
  });
}

export default function NewPurchaseOrderPage() {
  const router = useRouter();
  const { toast } = useToast();

  const createMutation = useMutation({
    mutationFn: (data: Partial<PurchaseOrder>) => actions.create(data),
    onSuccess: () => {
      toast({ title: "Orden de compra creada exitosamente" });
      router.push("/dashboard/purchasing/purchase-orders");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Error al crear la orden de compra",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (
    formData: Record<string, unknown>,
    lines: OrderLine[],
  ) => {
    const { currency, ...restFormData } = formData;
    
    // Remove any undefined or empty values to prevent $undefined serialization issues
    const cleanFormData = Object.fromEntries(
      Object.entries(restFormData).filter(([_, v]) => v !== undefined && v !== "")
    );

    const dataWithLines = {
      ...cleanFormData,
      currency_id: currency,
      lines: mapToBackendLines(lines),
    };

    createMutation.mutate({ purchase_order: dataWithLines } as any);
  };

  return (
    <OrderFormPage
      title="Nueva Orden de Compra"
      subtitle="Crea una nueva orden de compra para un proveedor"
      backUrl="/dashboard/purchasing/purchase-orders"
      formConfig={purchaseOrderFormConfig}
      defaultValues={{
        order_date: new Date().toISOString().split("T")[0],
        status: "draft",
        source_type: "manual",
        exchange_rate: 1,
        shipping_amount: 0,
      }}
      onSubmit={handleSubmit}
      isLoading={createMutation.isPending}
      searchProducts={searchProducts}
      searchWarehouses={searchWarehouses}
      searchUom={searchUom}
      searchTaxCodes={searchTaxCodes}
      warehouseLabel="Almacén Destino"
      currency="COP"
    />
  );
}

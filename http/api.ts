import { Warehouse } from "@/types/type";
import { api } from "./client";

export const getProducts = async () => {
  const response = await api.get("/products");
  return await response.data;
};

export const createProduct = async (data: FormData) => {
  const response = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getWarehouses = async () => {
  const response = await api.get("/warehouses");
  return await response.data;
};

export const createWarehouse = async (data: Warehouse) => {
  const response = await api.post("/warehouses", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export interface Product {
  id?: number;
  name: string;
  image: string;
  price: string;
}

export interface Warehouse {
  id?: number;
  name: string;
  pincode: string;
}

export interface DeliveryPerson {
  id?: number;
  name: string;
  phone: string;
  warehouseId: number;
  orderId?: number;
}

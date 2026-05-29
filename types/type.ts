export interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
}

export interface Warehouse {
  name: string;
  pincode: string;
}

export interface DeliveryPerson {
  name: string;
  phone: string;
  warehouseId: number;
  orderId?: number;
}

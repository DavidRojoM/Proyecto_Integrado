export interface Destination {
  id: number;
  name: string;
  description: string;
}

export interface Transport {
  id: number;
  name: number;
  type: string;
  price: number;
  brand: string;
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  phone: string;
  nightPrice: number;
  image: string;
}

export interface Trip {
  id: string;
  from: Date;
  to: Date;
  destination?: Destination;
  transport?: Transport;
  hotel?: Hotel;
}

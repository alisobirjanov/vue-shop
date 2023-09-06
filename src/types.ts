
export interface Product {
  id: number;
  title: string;
  rating: number;
  price: number;
  description: string;
  thumbnail: string;
}

export interface User {
  id: number;
  username: string;
  token: string;
  image: string;
}

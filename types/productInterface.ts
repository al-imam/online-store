export interface Image {
  id: string;
  url: string;
}

interface Review {
  rating: string;
  comment: string;
  created: Date;
}

export default interface ProductInterface {
  _id: string;
  name: string;
  description: string;
  price: number;
  seller: string;
  stock: number;
  rating: number;
  category: string;
  images: Image[];
  reviews: Review[];
  created: string;
  updated: string;
  __v: number;
}

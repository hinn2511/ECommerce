import { Color } from "./color";
import { ProductPhoto } from "./productPhoto";

export interface Product {
    id: number;
    productCode: string;
    productName: string;
    material: string;
    height: number;
    length: number;
    width: number;
    weight: number;
    photoUrl: string;
    category: string;
    brand: string;
    collection: string;
    price: number;
    introduction: string;
    productPhotos: ProductPhoto[];
}


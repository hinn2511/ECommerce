import { ProductPhoto } from "./productPhoto";
import { Color } from "./color";

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
    area: string;
    brand: string;
    collection: string;
    price: number;
    introduction: string;
    productPhotos: ProductPhoto[];
    productColors: Color[];
}


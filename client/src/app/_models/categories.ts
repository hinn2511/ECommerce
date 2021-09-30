export interface SubCategory {
    id: number;
    subCategoryName: string;
    photoUrl: string;
}

export interface Category {
    id: number;
    categoryName: string;
    subCategories: SubCategory[];
    photoUrl: string;
}
export interface SubCategory {
    id: number;
    subCategoryName: string;
}

export interface Category {
    id: number;
    categoryName: string;
    subCategories: SubCategory[];
}
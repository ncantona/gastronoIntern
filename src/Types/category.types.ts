export interface CategoryResponse {
    id: number,
    name: string,
    position: number
};

export interface CategoryRequest {
    name: string,
    position: number
};

export interface UpdateCategoryRequest {
    name: string,
    position: number
};
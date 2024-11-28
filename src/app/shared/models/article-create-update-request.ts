export interface ArticleCreateUpdateRequest {
    id?: number;
    title: string;
    slug: string;
    content: string;

    coverPath: string;
    filePath: string;
    
    categoryId: number;
    creatorId: number;
}
export interface ArticleDetailsResponse{
    id: number;
    title: string;
    slug: string;
    content: string;
    coverPath: string;
    filePath: string;
    createdAt: string;
    updatedAt: string;
    categoryName: string;
    creatorName: string;
}
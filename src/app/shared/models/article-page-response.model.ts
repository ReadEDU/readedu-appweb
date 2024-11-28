import { ArticleDetailsResponse } from "./article-details-response.model";
import { PageableResponse } from "./pageable.response.model";

export type ArticlePageResponse = PageableResponse<ArticleDetailsResponse>;

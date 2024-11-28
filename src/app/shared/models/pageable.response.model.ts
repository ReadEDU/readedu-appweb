// pageable-response.model.ts "pageable": Unknown word.
export interface PageableResponse<T> {
    content: T[];
    pageable: PaginationDetails;            
    last: boolean;
    totalElements: number;
    totalPages: number;
    number: number;
    sort: Sort;
    size: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface PaginationDetails {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    unpaged: boolean;
    paged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;            
}
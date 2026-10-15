import { useState } from "react";

export const usePagination = (initialPage: number = 1, initialLimit: number = 10) => {
    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);

    const changePage = (newPage: number) => {
        setPage(newPage);
    }

    const changeLimit = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1); // Reset to first page when limit changes
    }

    return {
        page,limit,changePage,changeLimit
    }

}
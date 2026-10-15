import { Button } from "../ui/button";

interface PaginationProps {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, limit, total, onPageChange, onLimitChange }) => {

    const totalPages = Math.ceil(total / limit);


    return (
        <div
            style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
            }}
        >
            <Button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
                Previous
            </Button>
            <span>
                Page {page} of{" "}
                {totalPages || 1}
            </span>
            <Button 
                disabled={page >= totalPages}
                onClick={() =>
                    onPageChange(page + 1)
                }>
                Next
            </Button>
            <select
                value={limit}
                onChange={(event) =>
                    onLimitChange(
                        Number(event.target.value)
                    )
                }
            >
                <option value={5}>
                    5
                </option>

                <option value={10}>
                    10
                </option>

                <option value={20}>
                    20
                </option>
            </select>
        </div>
    )

}

export default Pagination;
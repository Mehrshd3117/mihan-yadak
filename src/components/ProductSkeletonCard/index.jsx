// components/ProductSkeletonCard.jsx
import { Skeleton } from "@mui/material";

const ProductSkeletonCard = () => {
    return (
        <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md">
            <div className="flex-1 p-5 flex items-center justify-center bg-orange-50 dark:bg-slate-900 h-52">
                <Skeleton variant="rectangular" width="100%" height={180} />
            </div>
            <div className="border-t border-orange-200 dark:border-slate-700 px-4 py-3">
                <Skeleton variant="text" width="80%" height={30} />
            </div>
        </div>
    );
};

export default ProductSkeletonCard;

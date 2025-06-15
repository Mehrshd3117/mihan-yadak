export default function SkeletonCard() {
    return (
      <div className="animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 shadow">
        <div className="w-full aspect-square bg-zinc-200 dark:bg-zinc-700 rounded-xl" />
        <div className="h-4 mt-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4 mx-auto" />
      </div>
    );
  }
  
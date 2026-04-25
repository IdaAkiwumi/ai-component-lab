function LoadingShimmer() {
  return (
    <div className="flex flex-col gap-4 w-full">

      {/* These blocks simulate a card loading in */}
      {/* The shimmer class comes from the animation we put in index.css */}
      <div className="h-4 bg-zinc-100 rounded-full w-3/4 shimmer" />
      <div className="h-4 bg-zinc-100 rounded-full w-1/2 shimmer" />

      <div className="h-32 bg-zinc-100 rounded-xl w-full shimmer mt-2" />

      <div className="h-4 bg-zinc-100 rounded-full w-5/6 shimmer" />
      <div className="h-4 bg-zinc-100 rounded-full w-2/3 shimmer" />
      <div className="h-4 bg-zinc-100 rounded-full w-3/4 shimmer" />

      <p className="text-xs text-zinc-400 text-center mt-4">
        Generating your component...
      </p>

    </div>
  )
}

export default LoadingShimmer
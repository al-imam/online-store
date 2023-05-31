export default function () {
  return (
    <div className="space-y-5 rounded-2xl  p-4 relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r  before:from-transparent before:via-slate-900/10 before:to-transparent isolate overflow-hidden  before:border-t before:border-slate-900/10">
      <div className="h-24 rounded-lg bg-slate-100/10 bg-gradient-to-r from-transparent via-slate-500/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
      <div className="space-y-3">
        <div className="h-3 w-3/5 rounded-lg bg-slate-900/10"></div>
        <div className="h-3 w-4/5 rounded-lg bg-slate-900/20"></div>
        <div className="h-3 w-2/5 rounded-lg bg-slate-900/20"></div>
      </div>
    </div>
  );
}

import { StrategyCard } from "@/features/playbooks";
import {
  getAllPlaybooks,
  getAllUsers,
  WhoToFollow,
  CreatorSidebar,
  platformStats,
} from "@/features/social";

export default function TrendingPage() {
  const playbooks = getAllPlaybooks();
  const users = getAllUsers();

  // Sort by verified wins first, then remix count
  const trending = [...playbooks].sort((a, b) => {
    const winsA = a.verifiedWins ?? 0;
    const winsB = b.verifiedWins ?? 0;
    if (winsB !== winsA) return winsB - winsA;
    return b.remixCount - a.remixCount;
  });

  return (
    <div className="flex">
      <div className="min-w-0 flex-1 border-x border-border">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-border bg-background/80 px-4 py-4 backdrop-blur-md sm:px-6">
          <h1 className="text-lg font-bold text-foreground">Trending</h1>
          <p className="text-xs text-foreground-ghost">
            Hottest playbooks right now
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6">
          {trending.map((pb, i) => (
            <StrategyCard key={pb.id} playbook={pb} index={i} />
          ))}
        </div>
      </div>

      {/* Right sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[320px] shrink-0 overflow-y-auto px-4 py-4 lg:block">
        <div className="flex flex-col gap-4">
          <WhoToFollow users={users} />
          <CreatorSidebar stats={platformStats} />
        </div>
      </aside>
    </div>
  );
}

import {
  WhoToFollow,
  TrendingPlaybooks,
  CreatorSidebar,
  ColabMatches,
  hubUsers,
  getAllPlaybooks,
  platformStats,
  colabProposals,
} from "@/features/social";
import { ColabFeed } from "./colab-feed";

export default function ColabsPage() {
  const currentUser = hubUsers[0];
  const allPlaybooks = getAllPlaybooks();
  const activeColabs = colabProposals.filter((c) => c.status === "active");

  return (
    <div className="flex">
      {/* Main content */}
      <div className="min-w-0 flex-1 border-x border-border">
        <ColabFeed proposals={colabProposals} users={hubUsers} currentUser={currentUser} />
      </div>

      {/* Right sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[320px] shrink-0 overflow-y-auto px-4 py-4 lg:block">
        <div className="flex flex-col gap-4">
          <ColabMatches users={hubUsers} currentUser={currentUser} activeColabs={activeColabs} />
          <WhoToFollow users={hubUsers} />
          <TrendingPlaybooks playbooks={allPlaybooks} />
          <CreatorSidebar stats={platformStats} />
        </div>
      </aside>
    </div>
  );
}

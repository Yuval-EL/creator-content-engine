// Vercel Git Connection Verified
import {
  SocialFeed,
  WhoToFollow,
  TrendingPlaybooks,
  CreatorSidebar,
  ColabMatches,
  hubUsers,
  feedEvents,
  feedPosts,
  platformStats,
  getAllPlaybooks,
  colabProposals,
} from "@/features/social";
import { FirstVisitTutorial } from "@/components/ui/first-visit-tutorial";

export default function Home() {
  const currentUser = hubUsers[0];
  const allPlaybooks = getAllPlaybooks();
  const activeColabs = colabProposals.filter((c) => c.status === "active");

  return (
    <div className="flex">
      {/* Welcome tutorial — auto-shows once for first-time visitors */}
      <FirstVisitTutorial />

      {/* Main feed column */}
      <div className="min-w-0 flex-1">
        <SocialFeed
          events={feedEvents}
          posts={feedPosts}
          currentUser={{
            name: currentUser.profile.name,
            avatarUrl: currentUser.profile.avatarUrl,
          }}
        />
      </div>

      {/* Right sidebar — hidden on small screens */}
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

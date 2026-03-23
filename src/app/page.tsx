import {
  HubHeader,
  SocialFeed,
  CreatorSidebar,
  hubUsers,
  feedEvents,
  platformStats,
} from "@/features/social";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-gutter py-8 md:py-12">
        <HubHeader users={hubUsers} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Feed — main column */}
          <div className="lg:col-span-2">
            <SocialFeed events={feedEvents} />
          </div>

          {/* Sidebar — leaderboard + stats */}
          <div>
            <CreatorSidebar users={hubUsers} stats={platformStats} />
          </div>
        </div>
      </div>
    </main>
  );
}

import { notFound } from "next/navigation";
import { ProfileHeader, ProfileTabs, CreationStreak, TechStack } from "@/features/identity";
import { StrategyCard } from "@/features/playbooks";
import {
  CredRing,
  MasterStack,
  DirectorNotes,
  CredLedger,
  VouchButton,
  WhoToFollow,
  TrendingPlaybooks,
  CreatorSidebar,
  ColabMatches,
  getUserByHandle,
  getAllUsers,
  getAllPlaybooks,
  platformStats,
  colabProposals,
} from "@/features/social";

export function generateStaticParams() {
  return getAllUsers().map((u) => ({
    handle: u.profile.handle.replace("@", ""),
  }));
}

export default async function CreatorProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const user = getUserByHandle(handle);
  if (!user) notFound();

  const allUsers = getAllUsers();
  const currentUser = allUsers[0]; // Lena as logged-in user
  const allPlaybooks = getAllPlaybooks();
  const activeColabs = colabProposals.filter((c) => c.status === "active");
  const vouchGate = {
    canVouch: false,
    currentScore: 35,
    requiredScore: 50,
    hasVouched: false,
  };

  const tabs = [
    { id: "playbooks", label: "Playbooks", count: user.playbooks.length },
    { id: "activity", label: "Activity" },
    { id: "about", label: "About" },
  ];

  return (
    <div className="flex">
      {/* Main profile column */}
      <div className="min-w-0 flex-1 border-x border-border">
        <ProfileHeader creator={user.profile} currentUser={currentUser.profile} />

        <ProfileTabs tabs={tabs}>
          {{
            /* ═══ PLAYBOOKS TAB ═══ */
            playbooks: (
              <div className="p-4 sm:p-6">
                {user.playbooks.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {user.playbooks.map((pb, i) => (
                      <StrategyCard key={pb.id} playbook={pb} index={i} />
                    ))}
                  </div>
                ) : (
                  <p className="py-12 text-center text-sm text-foreground-ghost">
                    No playbooks published yet.
                  </p>
                )}

                {/* Director's Notes on featured playbook */}
                {user.directorNotes.length > 0 && (
                  <div className="mt-8">
                    <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground-ghost">
                      Community Notes
                    </h3>
                    <DirectorNotes notes={user.directorNotes} />
                  </div>
                )}
              </div>
            ),

            /* ═══ ACTIVITY TAB ═══ */
            activity: (
              <div className="p-4 sm:p-6">
                <div className="flex flex-col gap-6">
                  <CreationStreak data={user.profile.streakData} />
                  <CredLedger transactions={user.transactions} />
                </div>
              </div>
            ),

            /* ═══ ABOUT TAB ═══ */
            about: (
              <div className="p-4 sm:p-6">
                <div className="flex flex-col gap-8">
                  {/* Cred Breakdown */}
                  <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                    <CredRing breakdown={user.cred} />
                    <VouchButton gate={vouchGate} targetName={user.profile.name} />
                  </div>

                  {/* Expertise */}
                  <MasterStack expertise={user.expertise} />

                  {/* Tech Stack */}
                  <TechStack items={user.profile.techStack} />
                </div>
              </div>
            ),
          }}
        </ProfileTabs>
      </div>

      {/* Right sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[320px] shrink-0 overflow-y-auto px-4 py-4 lg:block">
        <div className="flex flex-col gap-4">
          <ColabMatches users={allUsers} currentUser={currentUser} activeColabs={activeColabs} />
          <WhoToFollow users={allUsers} />
          <TrendingPlaybooks playbooks={allPlaybooks} />
          <CreatorSidebar stats={platformStats} />
        </div>
      </aside>
    </div>
  );
}

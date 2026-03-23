import { notFound } from "next/navigation";
import { HeroHeader, CreationStreak, TechStack } from "@/features/identity";
import { StrategyCard, ProjectBox } from "@/features/playbooks";
import {
  CredRing,
  MasterStack,
  DirectorNotes,
  CredLedger,
  VouchButton,
  HubHeader,
  getUserByHandle,
  getAllUsers,
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
  const featured = user.playbooks[0];
  const vouchGate = {
    canVouch: false,
    currentScore: 35,
    requiredScore: 50,
    hasVouched: false,
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-gutter py-8 md:py-12">
        <HubHeader users={allUsers} currentHandle={handle} />

        {/* ═══ IDENTITY ═══ */}
        <HeroHeader creator={user.profile} />

        {/* ═══ CREDIBILITY ═══ */}
        <section className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="flex flex-col items-center gap-6 lg:col-span-2">
            <CredRing breakdown={user.cred} />
            <VouchButton gate={vouchGate} targetName={user.profile.name} />
          </div>
          <div className="lg:col-span-3">
            <MasterStack expertise={user.expertise} />
          </div>
        </section>

        {/* ═══ ACTIVITY + LEDGER ═══ */}
        <section className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-8 lg:col-span-2">
            <CreationStreak data={user.profile.streakData} />
            <TechStack items={user.profile.techStack} />
          </div>
          <div>
            <CredLedger transactions={user.transactions} />
          </div>
        </section>

        {/* ═══ PLAYBOOKS ═══ */}
        {user.playbooks.length > 0 && (
          <section className="mt-20">
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-ghost">
                Published Playbooks
              </h2>
              <span className="text-sm text-foreground-sub">
                <span className="font-semibold text-foreground">
                  {user.playbooks.length}
                </span>{" "}
                playbook{user.playbooks.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {user.playbooks.map((pb, i) => (
                <StrategyCard key={pb.id} playbook={pb} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* ═══ FEATURED PROJECT BOX ═══ */}
        {featured && (
          <section className="mt-20">
            <div className="mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-ghost">
                Featured Playbook
              </h2>
            </div>
            <ProjectBox playbook={featured} />
            {user.directorNotes.length > 0 && (
              <div className="mt-8">
                <DirectorNotes notes={user.directorNotes} />
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

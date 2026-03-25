import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { WelcomeTutorial } from "@/components/ui/welcome-tutorial";

// Stub framer-motion: motion.* → plain HTML, AnimatePresence → fragment
vi.mock("framer-motion", () => {
  const handler: ProxyHandler<object> = {
    get(_target, prop: string) {
      return function MotionStub(props: Record<string, unknown>) {
        const {
          children,
          initial: _i,
          animate: _a,
          exit: _e,
          transition: _t,
          variants: _v,
          custom: _c,
          layoutId: _l,
          whileHover: _w,
          ...rest
        } = props;
        const Tag = prop as React.ElementType;
        return <Tag {...rest}>{children as React.ReactNode}</Tag>;
      };
    },
  };

  return {
    motion: new Proxy({}, handler),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    __esModule: true,
  };
});

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill: _f, priority: _p, unoptimized: _u, ...rest } = props;
    return <img {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

const STORAGE_KEY = "hub_tutorial_v2";

/** Click the Next button once */
function clickNext() {
  const btns = screen.getAllByText("Next");
  fireEvent.click(btns[0]);
}

/** Navigate to step n (0-indexed) */
function goToStep(n: number) {
  for (let i = 0; i < n; i++) clickNext();
}

/** Check text exists (tolerates duplicates from AnimatePresence mock) */
function exists(text: string | RegExp) {
  return screen.queryAllByText(text).length >= 1;
}

describe("WelcomeTutorial", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.style.overflow = "";
  });

  afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
  });

  // ─── PAGE MODE ─────────────────────────────────────
  describe("mode='page'", () => {
    it("renders even if localStorage key is set", () => {
      localStorage.setItem(STORAGE_KEY, "1");
      render(<WelcomeTutorial mode="page" />);
      expect(exists("Welcome to The Hub")).toBe(true);
    });

    it("shows step 1 of 9 with Skip and Next", () => {
      render(<WelcomeTutorial mode="page" />);
      expect(exists("1 / 9")).toBe(true);
      expect(exists("Skip tutorial")).toBe(true);
      expect(exists("Next")).toBe(true);
    });
  });

  // ─── AUTO MODE ─────────────────────────────────────
  describe("mode='auto'", () => {
    it("shows when no localStorage key", () => {
      render(<WelcomeTutorial mode="auto" />);
      expect(exists("Welcome to The Hub")).toBe(true);
    });

    it("hidden when localStorage key exists", () => {
      localStorage.setItem(STORAGE_KEY, "1");
      render(<WelcomeTutorial mode="auto" />);
      // queryAllByText returns empty array → not in DOM
      expect(screen.queryAllByText("Welcome to The Hub")).toHaveLength(0);
    });

    it("Skip writes localStorage", () => {
      render(<WelcomeTutorial mode="auto" />);
      const skipBtns = screen.getAllByText("Skip tutorial");
      fireEvent.click(skipBtns[0]);
      expect(localStorage.getItem(STORAGE_KEY)).toBe("1");
    });
  });

  // ─── NAVIGATION ────────────────────────────────────
  describe("navigation", () => {
    it("Next advances to step 2", () => {
      render(<WelcomeTutorial mode="page" />);
      clickNext();
      expect(exists("2 / 9")).toBe(true);
    });

    it("walks all 9 steps", () => {
      render(<WelcomeTutorial mode="page" />);
      expect(exists("1 / 9")).toBe(true);

      for (let i = 2; i <= 9; i++) {
        clickNext();
        expect(exists(`${i} / 9`)).toBe(true);
      }
    });

    it("last step shows Enter The Hub, hides Next", () => {
      render(<WelcomeTutorial mode="page" />);
      goToStep(8);
      expect(exists("Enter The Hub")).toBe(true);
      expect(screen.queryAllByText("Next")).toHaveLength(0);
    });

    it("Enter The Hub saves localStorage", () => {
      render(<WelcomeTutorial mode="auto" />);
      goToStep(8);
      const enterBtns = screen.getAllByText("Enter The Hub");
      fireEvent.click(enterBtns[0]);
      expect(localStorage.getItem(STORAGE_KEY)).toBe("1");
    });

    it("arrow keys navigate", () => {
      render(<WelcomeTutorial mode="page" />);
      expect(exists("1 / 9")).toBe(true);

      fireEvent.keyDown(window, { key: "ArrowRight" });
      expect(exists("2 / 9")).toBe(true);

      fireEvent.keyDown(window, { key: "ArrowRight" });
      expect(exists("3 / 9")).toBe(true);

      fireEvent.keyDown(window, { key: "ArrowLeft" });
      expect(exists("2 / 9")).toBe(true);
    });

    it("Escape dismisses and saves", () => {
      render(<WelcomeTutorial mode="auto" />);
      fireEvent.keyDown(window, { key: "Escape" });
      expect(localStorage.getItem(STORAGE_KEY)).toBe("1");
    });

    it("progress bar jumps to step 5", () => {
      render(<WelcomeTutorial mode="page" />);
      const segments = screen.getAllByRole("button", { name: /Go to step/ });
      expect(segments).toHaveLength(9);
      fireEvent.click(segments[4]);
      expect(exists("5 / 9")).toBe(true);
    });
  });

  // ─── FEATURE CONTENT PER STEP ─────────────────────
  describe("step content", () => {
    it("step 2 — Playbooks: chapters, toolkit, timeline, wins, director notes", () => {
      render(<WelcomeTutorial mode="page" />);
      goToStep(1);
      expect(exists("Chapters")).toBe(true);
      expect(exists("Toolkit")).toBe(true);
      expect(exists("Evolution Timeline")).toBe(true);
      expect(exists("Verified Wins")).toBe(true);
      expect(exists(/Director/)).toBe(true);
    });

    it("step 3 — Remixes: fork flow and attribution", () => {
      render(<WelcomeTutorial mode="page" />);
      goToStep(2);
      expect(exists("Remix it")).toBe(true);
      expect(exists("Original creator gets cred")).toBe(true);
      expect(exists("Your wins count too")).toBe(true);
      expect(exists("Full attribution chain")).toBe(true);
    });

    it("step 4 — Vouches: weight and gate", () => {
      render(<WelcomeTutorial mode="page" />);
      goToStep(3);
      expect(exists("Weight Matters")).toBe(true);
      expect(exists("Vouch Gate")).toBe(true);
    });

    it("step 5 — Identity: score, badges, streak, tech stack", () => {
      render(<WelcomeTutorial mode="page" />);
      goToStep(4);
      expect(exists("Authority Score")).toBe(true);
      expect(exists("Badges")).toBe(true);
      expect(exists("Creation Streak")).toBe(true);
      expect(exists("Tech Stack")).toBe(true);
    });

    it("step 6 — Cred: ledger + transparency", () => {
      render(<WelcomeTutorial mode="page" />);
      goToStep(5);
      expect(exists("Cred Ledger")).toBe(true);
      expect(exists(/Every point is traceable/)).toBe(true);
    });

    it("step 7 — User flow: 5-moment journey", () => {
      render(<WelcomeTutorial mode="page" />);
      goToStep(6);
      expect(exists("Discover")).toBe(true);
      expect(exists("Remix")).toBe(true);
      expect(exists("Win")).toBe(true);
      expect(exists("Get Vouched")).toBe(true);
      expect(exists("Level Up")).toBe(true);
    });

    it("step 8 — Navigation: all 5 destinations", () => {
      render(<WelcomeTutorial mode="page" />);
      goToStep(7);
      expect(exists("Feed")).toBe(true);
      expect(exists("Explore")).toBe(true);
      expect(exists("Leaderboard")).toBe(true);
      expect(exists("Trending")).toBe(true);
      expect(exists("Profile")).toBe(true);
    });

    it("step 9 — Finale: CTA + feature chips", () => {
      render(<WelcomeTutorial mode="page" />);
      goToStep(8);
      expect(exists("Enter The Hub")).toBe(true);
      expect(exists("Publish playbooks")).toBe(true);
      expect(exists("Remix strategies")).toBe(true);
      expect(exists("Vouch for creators")).toBe(true);
      expect(exists("Earn verified wins")).toBe(true);
      expect(exists("Build your cred")).toBe(true);
    });
  });

  // ─── VERSIONING ────────────────────────────────────
  describe("localStorage versioning", () => {
    it("old v1 key does NOT block v2 tutorial", () => {
      localStorage.setItem("hub_tutorial_completed", "1");
      render(<WelcomeTutorial mode="auto" />);
      expect(exists("Welcome to The Hub")).toBe(true);
    });

    it("v2 key blocks tutorial", () => {
      localStorage.setItem(STORAGE_KEY, "1");
      render(<WelcomeTutorial mode="auto" />);
      expect(screen.queryAllByText("Welcome to The Hub")).toHaveLength(0);
    });
  });
});

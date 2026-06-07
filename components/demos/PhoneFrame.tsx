import type { ReactNode } from "react";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-[260px] rounded-[2.5rem] border-[10px] border-ink bg-ink shadow-2xl">
      <div className="relative overflow-hidden rounded-[1.8rem] bg-white">
        <div className="absolute left-1/2 top-0 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-ink" />
        <div className="h-[480px] overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

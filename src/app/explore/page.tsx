import { Suspense } from "react";

import { ExplorePage } from "@/components/_core/landing-pages/explore";
import { Footer } from "@/components/_core/shared/footer";
import { ExploreNav } from "@/components/_core/shared/navbar/explore-nav";

export default function Explore() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white">
        <ExploreNav />
        <Suspense>
          <ExplorePage />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}

"use client";

import { TaskPostCard } from "@/components/shared/task-post-card";
import type { SitePost } from "@/lib/site-connector";
import type { TaskKey } from "@/lib/site-config";
import { buildPostUrl } from "@/lib/task-data";

interface UniqueGalleryGridProps {
  posts: Array<SitePost & { localOnly?: boolean; task?: TaskKey }>;
  task: TaskKey;
}

export function UniqueGalleryGrid({ posts, task }: UniqueGalleryGridProps) {
  if (!posts.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
        No posts yet for this section.
      </div>
    );
  }

  // Create a dynamic layout with different sized cards
  const galleryLayout = posts.map((post, index) => {
    const href = post.localOnly
      ? `/local/${post}/${post.slug}`
      : buildPostUrl(task, post.slug);
    
    // Determine card size based on position
    let cardSize = "normal";
    if (index === 0) cardSize = "featured"; // First card is large
    else if (index % 3 === 0) cardSize = "wide"; // Every 3rd card is wide
    else if (index % 5 === 0) cardSize = "tall"; // Every 5th card is tall

    return { post, href, cardSize, index };
  });

  return (
    <div className="w-full">
      {/* Featured first post */}
      {galleryLayout[0] && (
        <div className="mb-8">
          <TaskPostCard
            post={galleryLayout[0].post}
            href={galleryLayout[0].href}
            taskKey={task}
            compact={false}
          />
        </div>
      )}

      {/* Dynamic grid layout */}
      <div className="grid gap-6 auto-rows-[200px] sm:auto-rows-[250px] lg:auto-rows-[300px]">
        {galleryLayout.slice(1).map((item) => {
          const { post, href, cardSize } = item;
          
          // Define grid span based on card size
          const gridClass = {
            normal: "col-span-1 row-span-1",
            wide: "col-span-2 row-span-1 sm:col-span-1 lg:col-span-2",
            tall: "col-span-1 row-span-2",
          }[cardSize];

          return (
            <div
              key={post.id}
              className={gridClass}
            >
              <TaskPostCard
                post={post}
                href={href}
                taskKey={task}
                compact={cardSize !== "featured"}
              />
            </div>
          );
        })}
      </div>

      {/* Masonry-style alternative layout for mobile */}
      <div className="sm:hidden mt-6">
        <div className="columns-2 gap-4 space-y-4">
          {galleryLayout.slice(1).map((item) => (
            <div key={item.post.id} className="break-inside-avoid">
              <TaskPostCard
                post={item.post}
                href={item.href}
                taskKey={task}
                compact={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

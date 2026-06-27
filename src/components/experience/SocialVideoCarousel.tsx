"use client";

import {
  FacebookReelEmbed,
  FacebookReelPosterCard,
  FacebookSDK,
  FacebookVideoEmbed,
  SocialEmbedCard,
  TikTokEmbed,
} from "@/components/SocialEmbed";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CONTENT_FACEBOOK_VIDEOS = [
  "https://www.facebook.com/61558071171326/videos/hi%E1%BB%87u-may-t%C3%A2n-th%E1%BB%9Di-hereolong-xin-ch%C3%A0o-kh%C3%B4ng-kh%C3%AD-ti%E1%BB%87m-m%E1%BA%A5y-h%C3%B4m-nay-r%E1%BB%99n-r%C3%A0ng-h%C6%A1n-h%C6%A1n/1378822650395144/",
  "https://www.facebook.com/61558071171326/videos/h%C3%A0nh-tr%C3%ACnh-c%E1%BB%A9-th%E1%BB%A9c-u%E1%BB%91ng-tinh-t%E1%BA%BF-h%E1%BA%B9n-b%E1%BA%A1n-th%C6%B0%C6%A1ng-22012026-hereolong-theuhoade/1179681014318288/",
] as const;

const CONTENT_TIKTOK_VIDEO_IDS = [
  "7592624640783142162",
  "7593012098708425992",
  "7594820249380211986",
  "7597053612803493128",
  "7597784576974425351",
  "7602254328283368712",
] as const;

const slideBasis =
  "basis-[min(260px,calc(100vw-2.75rem))] pl-0 sm:basis-[min(300px,calc(100vw-4.5rem))]";

const carouselNavClassName =
  "size-9 min-h-9 min-w-9 border-[var(--color-hairline)] bg-[var(--color-white)] text-[var(--color-primary-ink)] hover:bg-[var(--color-surface-soft)] disabled:opacity-40 sm:size-11 sm:min-h-11 sm:min-w-11";

function isFacebookReel(href: string) {
  return /facebook\.com\/reel\//i.test(href);
}

export type FacebookReelItem = {
  href: string;
  posterSrc?: string;
  posterAlt?: string;
  /** Bỏ iframe, chỉ hiện poster + link (khi Meta chặn nhúng). */
  posterOnly?: boolean;
};

type SocialVideoCarouselProps = {
  facebookVideos?: readonly string[];
  facebookReels?: readonly FacebookReelItem[];
  tiktokVideoIds?: readonly string[];
};

export function SocialVideoCarousel({
  facebookVideos = CONTENT_FACEBOOK_VIDEOS,
  facebookReels,
  tiktokVideoIds = CONTENT_TIKTOK_VIDEO_IDS,
}: SocialVideoCarouselProps) {
  return (
    <div className="relative px-3 sm:px-10 md:px-14 lg:px-16">
      <FacebookSDK />

      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-0 gap-4 sm:gap-5">
          {facebookReels?.map((reel, index) => (
            <CarouselItem key={reel.href} className={slideBasis}>
              <SocialEmbedCard>
                {reel.posterOnly && reel.posterSrc ? (
                  <FacebookReelPosterCard
                    href={reel.href}
                    posterSrc={reel.posterSrc}
                    posterAlt={
                      reel.posterAlt ?? "Facebook Reel — Titan Agency"
                    }
                    eager={index === 0}
                  />
                ) : (
                  <FacebookReelEmbed
                    href={reel.href}
                    fillCard
                    eager={index === 0}
                  />
                )}
              </SocialEmbedCard>
            </CarouselItem>
          ))}

          {facebookVideos.map((href, index) => (
            <CarouselItem key={href} className={slideBasis}>
              <SocialEmbedCard>
                {isFacebookReel(href) ? (
                  <FacebookReelEmbed
                    href={href}
                    fillCard
                    eager={index === 0}
                  />
                ) : (
                  <FacebookVideoEmbed
                    href={href}
                    skipSdk
                    fillCard
                    eager={index === 0}
                    fluid
                  />
                )}
              </SocialEmbedCard>
            </CarouselItem>
          ))}

          {tiktokVideoIds.map((videoId) => (
            <CarouselItem key={videoId} className={slideBasis}>
              <SocialEmbedCard>
                <TikTokEmbed videoId={videoId} fillCard />
              </SocialEmbedCard>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className={`left-0 sm:left-1 md:left-2 ${carouselNavClassName}`}
        />
        <CarouselNext
          className={`right-0 sm:right-1 md:right-2 ${carouselNavClassName}`}
        />
      </Carousel>
    </div>
  );
}

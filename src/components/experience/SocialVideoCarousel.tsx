"use client";

import {
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

const FACEBOOK_VIDEOS = [
  "https://www.facebook.com/61558071171326/videos/hi%E1%BB%87u-may-t%C3%A2n-th%E1%BB%9Di-hereolong-xin-ch%C3%A0o-kh%C3%B4ng-kh%C3%AD-ti%E1%BB%87m-m%E1%BA%A5y-h%C3%B4m-nay-r%E1%BB%99n-r%C3%A0ng-h%C6%A1n-h%C6%A1n/1378822650395144/",
  "https://www.facebook.com/61558071171326/videos/h%C3%A0nh-tr%C3%ACnh-c%E1%BB%A7a-th%E1%BB%A9-th%E1%BB%A9c-u%E1%BB%91ng-tinh-t%E1%BA%BF-h%E1%BA%B9n-b%E1%BA%A1n-th%C6%B0%C6%A1ng-22012026-hereolong-theuhoade/1179681014318288/",
] as const;

const TIKTOK_VIDEO_IDS = [
  "7592624640783142162",
  "7593012098708425992",
  "7594820249380211986",
  "7597053612803493128",
  "7597784576974425351",
  "7602254328283368712",
] as const;

const slideBasis =
  "basis-[min(300px,calc(100vw-4.5rem))] pl-0";

export function SocialVideoCarousel() {
  return (
    <div className="relative px-8 sm:px-10 md:px-14 lg:px-16">
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
          {FACEBOOK_VIDEOS.map((href) => (
            <CarouselItem key={href} className={slideBasis}>
              <SocialEmbedCard>
                <FacebookVideoEmbed
                  href={href}
                  skipSdk
                  fillCard
                  eager
                  fluid
                />
              </SocialEmbedCard>
            </CarouselItem>
          ))}

          {TIKTOK_VIDEO_IDS.map((videoId) => (
            <CarouselItem key={videoId} className={slideBasis}>
              <SocialEmbedCard>
                <TikTokEmbed videoId={videoId} fillCard eager />
              </SocialEmbedCard>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 size-8 border-[var(--color-hairline)] bg-[var(--color-white)] text-[var(--color-primary)] hover:bg-[var(--color-surface-soft)] disabled:opacity-40 sm:left-1 sm:size-9 md:left-2 md:size-10" />
        <CarouselNext className="right-0 size-8 border-[var(--color-hairline)] bg-[var(--color-white)] text-[var(--color-primary)] hover:bg-[var(--color-surface-soft)] disabled:opacity-40 sm:right-1 sm:size-9 md:right-2 md:size-10" />
      </Carousel>
    </div>
  );
}

import {
  FEATURED_CHANNELS,
  SATELLITE_CHANNEL,
} from "@/components/experience/highlight/highlight-data";
import {
  HighlightFeaturedCard,
  HighlightSatelliteCard,
} from "@/components/experience/highlight/HighlightCards";

export function HighlightSection() {
  return (
    <section className="bg-[var(--color-canvas)] pb-10 pt-2 sm:pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          {FEATURED_CHANNELS.map((channel) => (
            <HighlightFeaturedCard key={channel.id} channel={channel} />
          ))}
        </div>

        <div className="mt-5 sm:mt-6">
          <HighlightSatelliteCard channel={SATELLITE_CHANNEL} />
        </div>
      </div>
    </section>
  );
}

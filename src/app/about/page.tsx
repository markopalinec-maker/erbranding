import { Award, SiteSettings } from '@/types';
import { client } from '@/sanity/lib/client';
import { awardsQuery, siteSettingsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

export const revalidate = 60;

export default async function AboutPage() {
  let awards: Award[] = [];
  let siteSettings: SiteSettings | null = null;

  try {
    const [awardsData, settingsData] = await Promise.all([
      client.fetch<Award[]>(awardsQuery),
      client.fetch<SiteSettings>(siteSettingsQuery),
    ]);
    awards = awardsData;
    siteSettings = settingsData;
  } catch (error) {
    console.error('Error fetching about page data:', error);
  }

  return (
    <main className="bg-black min-h-screen text-white">
      {/* ABOUT Heading */}
      <section className="py-32 px-4 text-center">
        <h1 className="text-8xl md:text-9xl font-bold tracking-tighter mb-16">
          ABOUT
        </h1>
      </section>

      {/* Our Story Section */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl md:text-2xl font-light mb-8 text-gray-400">
          Our story
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-gray-300 font-light">
          Creative design studio specializing in the development of visual identities,
          branding, and innovative solutions for digital and print media. With a vision
          of crafting unique stories through design, our team is dedicated to transforming
          ideas into striking visual concepts. We focus on details, aesthetics, and
          functionality, ensuring that every project reflects the authenticity and values
          of your brand.
        </p>
      </section>

      {/* Awards Section */}
      <section className="py-32 px-4">
        <h2 className="text-6xl md:text-7xl font-bold tracking-tighter text-center mb-24">
          AWARDS
        </h2>

        {awards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {awards.map((award) => (
              <div key={award._id} className="flex flex-col items-center text-center">
                {/* Badge Image */}
                <div className="w-48 h-48 mb-8 relative rounded-full overflow-hidden ring-2 ring-white">
                  {award.badgeImage && (
                    <Image
                      src={urlFor(award.badgeImage).url()}
                      alt={award.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Year & City */}
                <p className="text-base mb-2 font-light">
                  {award.year} - {award.city}
                </p>

                {/* Placement & Category */}
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  {award.placement} - {award.category}
                </p>

                {/* Person */}
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  {award.person}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>No awards to display yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}

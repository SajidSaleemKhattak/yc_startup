import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import React from "react";
// import { client } from "@/sanity/lib/client"; we needed that only to fetch the not-LIVE data 
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ querry?: string }>;
}) => {
  const querry = (await searchParams).querry;

  // const posts = await client.fetch(STARTUP_QUERY); now we will use the below for live fetch
  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY });

  console.log(JSON.stringify(posts, null, 2));

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Start up Ideas <br />
          Become an entrapraneaur
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Gets notices and compete with people in virtual
          competitions
        </p>
        <SearchForm querry={querry} />
      </section>

      {/* Startup Section Started */}
      <section className="section_container">
        <p className="text-30 semi-bold">
          {querry ? `Search results for ${querry}` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((posts: StartupTypeCard, index: number) => (
              <StartupCard key={index} posts={posts}></StartupCard>
            ))
          ) : (
            <p className="no-result">No results found</p>
          )}
        </ul>
      </section>
  <SanityLive></SanityLive>
    </>
  );
};

export default page;

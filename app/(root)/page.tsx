import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import Image from "next/image";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ querry?: string }>;
}) => {
  const querry = (await searchParams).querry;
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Sajid" }, // Changed from 'authhor' to 'author'
      _id: 1,
      description: "This is a sample descripition",
      image: "https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Robots",
      title: "We Robots",
    },
  ];
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
            posts.map(
              (
                post: StartupCardType,
                index: number // Changed 'posts' to 'post'
              ) => (
                <StartupCard key={post._id} post={post}></StartupCard> // Changed 'posts' to 'post'
              )
            )
          ) : (
            <p className="no-result">No results found</p>
          )}
        </ul>
      </section>
    </>
  );
};

export default page;

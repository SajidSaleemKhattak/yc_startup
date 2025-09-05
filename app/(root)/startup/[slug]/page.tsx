import Link from "next/link";
import Image from "next/image";
import React from "react";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import markdownit from "markdown-it";

const md = markdownit();

// export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  console.log(slug);
  const post = await client.fetch(STARTUP_BY_SLUG_QUERY, { slug });
  // console.log("FROM the startup details" , post)
  // console.log(post._createdAt)

  const parsedContent = md.render(post.pitch || "");
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{post?._createdAt}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${post.author?._id}`}>
              <Image
                src={post.author?.image || "/default-avatar.png"}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              ></Image>
            </Link>
            <p className="text-20-medium">
              {post.author?.name || "author-name"}
            </p>
            <p className="text-20-medium !text-black-300">
              @{post.author?.username || "author-@"}
            </p>
            <p className="category-tag">{post.category || "category"}</p>
          </div>
          <h3 className="pitch-details">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <hr className="divider" />

        {/* EDITOR SELECTED STARTUPS */}
      </section>
    </>
  );
};

export default page;

/* props = {
1)params (is also an object) conating a key value pair of i.e {id : (some value of type string)}
2)querry (is also an object) containg a key value pair of i.e {query :(some value of type string)} 
}

So when we destructure it what we have to do is :=>
first destructure the params out of props i.e by doing {props} and then we have to mention the type of thing from which we are destructuring it i.e the type of props and (not params) that is why we first create an interface that looks like a props interface and from there we get the params   

ADDITIONAL CONFIRMATION FROM CHAT GPT:
Exactly ✅ — your understanding is spot on! Let me clarify and tweak your explanation a bit for full accuracy:

1️⃣ The code:
import React from "react";
import { client } from './../../../../sanity/lib/client';
import { Link } from 'next/link';
import { author } from './../../../../sanity/schemaTypes/author';
import { Image } from 'next/image';

interface PageProps {
  params: { id: string };
  query?: { query: string }; // optional if you have query
}

const Page = ({ params }: PageProps) => {
  return <div>page</div>;
};

export default Page;

2️⃣ Why it works:

props is always the object that React passes to your component.

In your case, props looks like:

{
  params: { id: string },
  query?: { query: string } // optional
}


When you do destructuring:

const Page = ({ params }: PageProps)


You are saying:

Pull out params from props.

props has the type PageProps.

Important: The type goes on the object you are destructuring (props), not on the thing you pulled out (params).

3️⃣ Key point:

If you tried this (wrong):

const Page = ({ params }: { id: string }) => { ... }


TypeScript would complain, because { id: string } is the type of params, not props.

You always type the whole props object, then destructure from it.

So your comment explanation is correct, just remember:

Type goes on the whole props object, not the destructured field.


If you want, I can also write a visual diagram showing props → destructure → types so it becomes very clear in one glance. It’s a game-changer for TypeScript beginners.

Do you want me to make that diagram?

You said:
params is always present as the props but it will be present on the pages having a dynamic route like i.e (id or something) and not on every react page right
ChatGPT said:

Exactly 💯 — you got it.

params is only automatically provided by Next.js on dynamic routes in the app directory (or getServerSideProps/getStaticProps in the pages directory).

For example, if your file is:

app/startup/[id]/page.tsx


Next.js will give your component props like:

{
  params: { id: "some-value-from-url" }
}


Static pages like app/about/page.tsx or app/contact/page.tsx do not get params, because there’s no dynamic segment in the route.

Optional: searchParams

Similarly, searchParams are provided automatically if the URL has query params:

// URL: /startup/123?query=test
const Page = ({ searchParams }: { searchParams: { query?: string } }) => {
  console.log(searchParams.query); // "test"
};


searchParams is optional — only exists if someone actually puts query parameters in the URL.

✅ So rules of thumb:

Prop	When it exists
params	Only on pages with dynamic route segments
searchParams	On any page if URL has query parameters
Others	You define them manually if you want

If you want, I can make a one-page “cheat sheet” for all Next.js page props showing exactly when params / searchParams / etc. exist — makes this much easier to remember.
*/

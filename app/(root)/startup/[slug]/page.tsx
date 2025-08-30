import React from "react";

const page = async ({ params }: {params : Promise <{slug:string}>}) => {
  const slug = (await params).slug
  return <div>{slug}</div>;
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

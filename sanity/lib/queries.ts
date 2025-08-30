import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`
*[_type=="startup" && (!defined($search) || category match $search || author->name match $search || title match $search)] 
| order(_createdAt desc) {
  id,
  title,
  slug,
  _createdAt,
  author->{_id, name, image, bio},
  views,
  description,
  category,
  image
}
`);

export const STARTUP_BY_SLUG_QUERY = defineQuery(`
*[_type=="startup" && slug.current==$slug ] {
  id,
  title,
  slug,
  _createdAt,
  author->{_id, name, image, bio},
  views,
  description,
  category,
  image
}
`);

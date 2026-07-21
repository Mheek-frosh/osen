const projectId=import.meta.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset=import.meta.env.VITE_SANITY_DATASET?.trim()||'production';
const apiVersion=import.meta.env.VITE_SANITY_API_VERSION?.trim()||'2026-07-21';

export const sanityConfigured=Boolean(projectId);

const productQuery=`*[_type == "product" && active != false] | order(sortOrder asc, _createdAt desc){
  "id": coalesce(slug.current, _id),
  name,
  category,
  price,
  material,
  "imageUrl": image.asset->url,
  badge,
  description
}`;

export async function fetchSanityProducts({signal}={}){
  if(!sanityConfigured)return null;
  const params=new URLSearchParams({query:productQuery,perspective:'published'});
  const endpoint=`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${params}`;
  const response=await fetch(endpoint,{signal});
  if(!response.ok)throw new Error(`Sanity request failed (${response.status})`);
  const payload=await response.json();
  return payload.result||[];
}

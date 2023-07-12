import { getLoadoutBySlug } from "./infra/get-loadout-by-slug";

type ViewLoadoutProps = {
  slug: string;
};

export async function ViewLoadout(props: ViewLoadoutProps) {
  const loadout = await getLoadoutBySlug(props.slug);

  return <pre>{JSON.stringify(loadout, null, 2)}</pre>;
}

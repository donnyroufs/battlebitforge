import { ViewLoadout } from "@bbforge/loadouts";

// TODO: Figure out native type
type PageProps = {
  params: {
    slug: string;
  };
};

export default function Page(props: PageProps) {
  return <ViewLoadout slug={props.params.slug} />;
}

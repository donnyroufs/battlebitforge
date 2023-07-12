import { ViewLoadouts } from "@bbforge/loadouts";

// Figure out what native type is needed
type PageProps = {
  searchParams: {
    filterBy?: string;
  };
};

export default async function Page(props: PageProps) {
  const filterBy = props.searchParams?.filterBy ?? "all";
  return <ViewLoadouts filterBy={filterBy} />;
}

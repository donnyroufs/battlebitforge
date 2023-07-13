import { ViewLoadouts } from "@bbforge/loadouts";

// Figure out what native type is needed
type PageProps = {
  searchParams: {
    filterBy?: string;
  };
};

export default ViewLoadouts;

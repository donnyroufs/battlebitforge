import { Button } from "@bbforge/design-system";
import { MdDelete } from "react-icons/md";

// TODO: add confirmation
export function DeleteLoadout() {
  return (
    <Button variant="secondary">
      <div className="flex items-center justify-center">
        <MdDelete className="mr-2" />
        Delete
      </div>
    </Button>
  );
}

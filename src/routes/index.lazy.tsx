import DynamicForm from "@/components/dynamic-form";
import { useGetAllFormTypes } from "@/hooks";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { data: formTypes, isLoading, isError } = useGetAllFormTypes({});

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-2 justify-center items-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-2 justify-center items-center">
      <h3>Welcome Home!</h3>
      <Select onValueChange={(v) => setSelectedType(v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {formTypes?.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {selectedType && <DynamicForm type={selectedType} />}
    </div>
  );
}

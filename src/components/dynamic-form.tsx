import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGetFormType } from "@/hooks";
import { getSchema } from "@/lib/get-schema";
import { LoaderCircle } from "lucide-react";
import DynamicFormControl from "./dynamic-form-control";
import { useToast } from "@/hooks/use-toast";

const DynamicForm = ({ type }: {
  type: string
}) => {
  const { toast } = useToast();
  const { data: formType, isLoading, isError } = useGetFormType({
    type,
  });

  const formSchema = getSchema(formType);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  if (isLoading) {
    return <LoaderCircle className="animate-spin" />
  }

  if (isError) {
    return <div>Error</div>;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
        {formType && formType.fields.map((f) => (
          <FormField
            key={f.id}
            control={form.control}
            name={f.id as never}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{f.label} <span className="text-red-500">{f.required && "*"}</span></FormLabel>
                <FormControl>
                  <DynamicFormControl inputField={f} field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
        <div><span className="text-red-500">*</span> indicates required field</div>
      </form>
    </Form>
  );
};

export default DynamicForm;

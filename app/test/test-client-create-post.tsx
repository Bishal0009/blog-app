"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export default function TestClientCreatePost() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const formSchema = z.object({
    title: z.string(),
    content: z.string(),
  });

  const createTodos = useMutation(
    trpc.testCreatePost.mutationOptions({
      onSuccess: (values) => {
        console.log("Successfully inserted: ", values);
        queryClient.invalidateQueries();
      },
      onError: (error) => {
        console.log("Got an error: ", error);
      },
    })
  );

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      createTodos.mutate(value);
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          children={(field) => {
            return (
              <Field>
                <FieldLabel htmlFor={field.name} className="block text-lg mb-2">
                  Title
                </FieldLabel>
                <Input
                  className="w-full px-4 py-2 border rounded-lg"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your post title"
                />
              </Field>
            );
          }}
        />

        <form.Field
          name="content"
          children={(field) => (
            <Field>
              <FieldLabel className="block text-lg mb-2" htmlFor={field.name}>
                Content
              </FieldLabel>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Write your post content here."
                className="w-full px-4 py-2 border rounded-lg"
              />
            </Field>
          )}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

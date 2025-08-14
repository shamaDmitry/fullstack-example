import useSWR from "swr";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) return null; // 404 -> no data
    return res.json();
  });

export default function Test() {
  const { data, error, mutate, isLoading } = useSWR(
    "http://localhost:4000/api/employees",
    fetcher
  );

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: "", email: "" }, // base defaults
  });

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  const onSubmit = async (formData) => {
    // Decide if we're creating or updating
    const method = data ? "PUT" : "POST";

    // Optimistic update
    mutate({ ...data, ...formData }, false);

    await fetch("/api/profile", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // Get fresh data
    mutate();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("name", { required: true })}
        placeholder="Name"
        className="border p-2 w-full"
      />
      <input
        {...register("email", { required: true })}
        placeholder="Email"
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {data ? "Update" : "Create"}
      </button>
    </form>
  );
}

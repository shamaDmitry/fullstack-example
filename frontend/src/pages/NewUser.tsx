import { useState } from "react";
import { useNavigate } from "react-router";

export default function NewUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      navigate("/users");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Failed to create user");
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 grid-cols-1 container">
      <div>
        <h2 className="mb-4 text-xl font-medium">Add user</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>

            <input
              className="mt-1 block w-full rounded border p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>

            <input
              className="mt-1 block w-full rounded border p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Create
            </button>
          </div>
        </form>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-medium">Add customer</h2>
      </div>
    </div>
  );
}

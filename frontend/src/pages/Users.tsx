import useSWR from "swr";
import { fetcher } from "../utils/swr";

export default function Users() {
  const { data, error, isLoading } = useSWR(
    `http://localhost:4000/api/users`,
    fetcher
  );

  console.log({ data, error, isLoading });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Customers</h2>

      {isLoading && (
        <div className="text-center my-5">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      )}

      {data && !isLoading && (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {data.map((user: { id: number; name: string; email: string }) => {
                return (
                  <tr key={user.id}>
                    <th>{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

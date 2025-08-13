import useSWR from "swr";
import { fetcher } from "../utils/swr";
import type { IEmployees } from "../types/employees";

const Employees = () => {
  const { data, isLoading } = useSWR(
    `http://localhost:4000/api/employees`,
    fetcher
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Employees</h2>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        {isLoading && <div className="p-4 text-center">Loading...</div>}

        {data && (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Position</th>
                <th>Department</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {!data.length ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    Nothing is here
                  </td>
                </tr>
              ) : (
                data.map((employee: IEmployees) => {
                  return (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.fullName}</td>
                      <td>{employee.email}</td>
                      <td>{employee.position}</td>
                      <td>{employee.department}</td>
                      <td>${employee.salary.toLocaleString()}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Employees;

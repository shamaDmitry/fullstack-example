import useSWR from "swr";
import { fetcher } from "../utils/swr";
import type { IEmployees } from "../types/employees";
import { useEffect, useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, DollarSign } from "lucide-react";
import clsx from "clsx";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import useSWRMutation from "swr/mutation";

const departments = [
  { id: 1, name: "Web" },
  { id: 2, name: "Mobile" },
  { id: 3, name: "Desktop" },
  { id: 4, name: "Backend" },
  { id: 5, name: "Frontend" },
];

type Inputs = {
  fullName: string;
  email: string;
  position: string;
  department: string;
  salary: number;
};

const saveEmployee = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) return null; // 404 -> no data
    return res.json();
  });

const Employees = () => {
  const { data, isLoading } = useSWR(
    `http://localhost:4000/api/employees`,
    fetcher
  );

  const { data: currentEmployee, mutate } = useSWR(
    "http://localhost:4000/api/employees",
    saveEmployee
  );

  const [isOpen, setIsOpen] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      fullName: "",
      email: "",
      position: "",
      department: "",
      salary: 0,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log(formData);

    const method = data ? "PUT" : "POST";

    mutate({ ...data, ...formData }, false);

    await fetch("http://localhost:4000/api/employees", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4 gap-4">
          <h2 className="text-xl font-semibold">Employees</h2>

          <button className="btn" onClick={() => setIsOpen(true)}>
            Add Employee
          </button>
        </div>

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

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-closed:opacity-0"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-xl w-full border border-base-200 bg-base-100 p-5 md:p-12 rounded">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <DialogTitle className="font-bold">Add employee</DialogTitle>

              <Description>
                This will add a new employee to the database.
              </Description>

              <p className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Fullname"
                  className={clsx("input w-full", {
                    "input-error": errors.fullName,
                  })}
                  {...register("fullName", { required: true })}
                />

                <input
                  type="text"
                  placeholder="Email"
                  className={clsx("input w-full", {
                    "input-error": errors.email,
                  })}
                  {...register("email", { required: true })}
                />

                <input
                  type="text"
                  placeholder="Position"
                  className={clsx("input w-full", {
                    "input-error": errors.position,
                  })}
                  {...register("position", { required: true })}
                />

                <Controller
                  name="department"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    const { value, onChange } = field;

                    return (
                      <Listbox value={value} onChange={onChange}>
                        <ListboxButton
                          className={clsx("input w-full text-base-content", {
                            "input-error": errors.department,
                          })}
                        >
                          {value?.name || (
                            <span
                              style={{
                                color:
                                  "color-mix(in oklab, var(--color-base-content) 50%, transparent)",
                              }}
                            >
                              Select a department
                            </span>
                          )}

                          <ChevronDownIcon
                            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 text-base-content"
                            aria-hidden="true"
                          />
                        </ListboxButton>

                        <ListboxOptions
                          anchor="bottom"
                          transition
                          className={clsx(
                            "w-(--button-width) rounded border  dark:border-gray-600 bg-base-100 p-1 [--anchor-gap:--spacing(1)] focus:outline-none transition duration-100 ease-in data-leave:data-closed:opacity-0 border-red-200"
                          )}
                        >
                          {departments.map((department) => (
                            <ListboxOption
                              key={department.name}
                              value={department}
                              className="text-base-content group flex cursor-pointer items-center gap-2 px-2 py-1.5 select-none data-focus:bg-primary data-focus:text-primary-content rounded"
                            >
                              <CheckIcon className="invisible size-4 group-data-selected:visible" />

                              <div className="text-sm/6">{department.name}</div>
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </Listbox>
                    );
                  }}
                />

                <label
                  className={clsx("input w-full", {
                    "input-error": errors.salary,
                  })}
                >
                  <DollarSign className="h-[1em] opacity-50 shrink-0" />

                  <input
                    type="number"
                    className={clsx("grow")}
                    {...register("salary", { required: true })}
                    placeholder="Salary"
                  />
                </label>
              </p>

              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Employees;

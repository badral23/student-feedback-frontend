import { UsersDataTable } from "@/components/users/data-table";
import { getUsers } from "@/lib/get-api";

export default async function Users() {
  const users = await getUsers();

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Хэрэглэгчид</h1>
      </div>
      <UsersDataTable users={users} />
    </div>
  );
}

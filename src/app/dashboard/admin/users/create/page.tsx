import { getAllCompanies } from "@/action/company/get-all-companies.action";
import { CreateUserForm } from "./create-user-form";

export default async function CreateUserPage() {
  let companies: Awaited<ReturnType<typeof getAllCompanies>> = [];

  try {
    companies = await getAllCompanies();
  } catch {
    // If companies fail to load, the form will show an empty select
  }

  return <CreateUserForm companies={companies} />;
}

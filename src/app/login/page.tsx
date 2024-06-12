import { LoginModule } from "@/modules/LoginModule";
import ValidateUser from "@/shared/hooks/ValidateUser";

const page = () => {
  return (
    <ValidateUser>
      <div className="flex h-screen w-full items-center justify-center">
        <LoginModule />
      </div>
    </ValidateUser>
  );
};

export default page;

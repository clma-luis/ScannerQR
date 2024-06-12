"use client";
import PrincipalModule from "@/modules/PrincipalModule";
import ValidateUser from "@/shared/hooks/ValidateUser";

export default function Home() {
  return (
    <ValidateUser>
      <PrincipalModule />
    </ValidateUser>
  );
}

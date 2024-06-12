"use client";

import SpinnerLoading from "@/components/SpinnerLoading";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useToast } from "@/components/ui/Toast/use-toast";
import EyeIcon from "@/components/ui/icons/EyeIcon";
import EyeSlashIcon from "@/components/ui/icons/EyeSlashIcon";
import Logo from "@/components/ui/icons/Logo";
import { loginService } from "@/services/login";
import { ErrorResponse, LoginServiceResponse } from "@/services/login/loginTypes";
import { TOKEN, USER_VARIABLE } from "@/shared/constanst/defaultConsts";
import { URL_HOME } from "@/shared/constanst/routesPaths";
import { errorMessages, genericErrorMessage } from "@/shared/constanst/statusMessages";
import { setLocalStorage } from "@/shared/utils/localStorageUtils";
import { useRouter } from "next/navigation";

import { useState } from "react";

interface LoginFormProps {
  userName: string;
  password: string;
}

const initialState: LoginFormProps = {
  userName: "",
  password: "",
};

export function LoginModule() {
  const [form, setForm] = useState<LoginFormProps>(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await loginService(form);

      if (!response.ok) {
        const errorResponse = response as ErrorResponse;
        handleErrorAlert(errorMessages[errorResponse.statusCode], errorResponse.message);
        return;
      }

      const avalibleResponse = response as LoginServiceResponse;
      setLocalStorage(TOKEN, avalibleResponse.data.access_token);
      const { userId, user, userName } = avalibleResponse.data;
      setLocalStorage(USER_VARIABLE, { userId, user, userName });
      router.push(URL_HOME);
    } catch (error: any) {
      console.error("Error fetching boat data:", error);
      handleErrorAlert(errorMessages[500], genericErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleErrorAlert = (title: string, description: string) => {
    toast({
      title: title,
      description: `* ${description}`,
      variant: "destructive",
    });
  };

  const handleDisableButton = () => {
    return !form.userName || !form.password;
  };

  return (
    <>
      <Card className=" mx-4 border-none shadow-none w-[100%] max-w-[450px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center space-x-2, mb-8 ">
          <Logo width={100} height={100} />
          </div>

          <CardTitle className="text-2xl flex justify-start font-semibold font-custom">Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Nombre de usuario</Label>
            <Input value={form.userName} name="userName" id="userName" type="text" placeholder="usuario" onChange={handleChange} />
          </div>
          <div className="grid gap-2 relative">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              value={form.password}
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0  flex top-[27px] right-[-4px] items-center px-3 bg-transparent"
            >
              {showPassword ? <EyeIcon width={20} /> : <EyeSlashIcon width={20} />}
            </button>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleOnSubmit} className="w-full" disabled={isLoading || handleDisableButton()}>
            {isLoading ? <SpinnerLoading width="4" height="4" border="2" /> : " INGRESAR"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

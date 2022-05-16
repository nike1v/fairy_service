import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Context from "../components";
import styles from "../styles/Login.module.css";
import FormField from "../components/FormField";
import { Inputs } from "../types/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation("auth");
  const { register, handleSubmit, formState: { errors }, watch } = useForm<Inputs>({
    criteriaMode: "all",
    mode: "onBlur"
  });

  const handleLogin = async (data: Inputs) => {
    try {
      const result: any = await signIn("credentials", {
        email: data.email, password: data.password, callbackUrl: `${window.location.origin}/services`, redirect: true }
      );
      if (result.error !== null) {
        if (result.status === 401) {
          alert("Your username/password combination was incorrect. Please try again");
        } else {
          alert(result.error);
        }
      } else {
        router.push(result.url);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = data => handleLogin(data);

  return (
    <Context>
      <main className={styles.container}>
        <div className={styles.header}>
          {t("loginHeader")}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.loginForm}>
          <FormField fieldName="email" register={register} errors={errors} watch={watch} />

          <FormField fieldName="password" register={register} errors={errors} watch={watch} />

          <input type="submit" value={t("loginButton")} className={styles.loginButton} />
          <div className={styles.additionalButtons}>
            <Link href={"/registration"}>
              <a className={styles.toRegisterButton}>{t("toRegisterButton")}</a>
            </Link>
            <Link href={"/forgot-password"}>
              <a className={styles.forgotPassword}>{t("forgotPassword")}</a>
            </Link>
          </div>
        </form>
        
      </main>
    </Context>
  );
};

export default Login;
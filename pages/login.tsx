import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Context from "../components";
import styles from "../styles/Login.module.css";
import FormField from "../components/FormField";
import { Inputs } from "../types/types";

const Login: NextPage = () => {
  const { t } = useTranslation("auth");
  const { register, handleSubmit, formState: { errors }, watch } = useForm<Inputs>({
    criteriaMode: "all",
    mode: "onBlur"
  });
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

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
        </form>
        <div className={styles.additionalButtons}>
          <Link href={"/register"}>
            <a className={styles.toRegisterButton}>{t("toRegisterButton")}</a>
          </Link>
          <Link href={"/forgot-password"}>
            <a className={styles.forgotPassword}>{t("forgotPassword")}</a>
          </Link>
        </div>
      </main>
    </Context>
  );
};

export default Login;
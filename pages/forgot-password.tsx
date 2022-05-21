import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useForm, SubmitHandler } from "react-hook-form";
import Context from "../components";
import styles from "../styles/Login.module.css";
import FormField from "../components/RegisterFormField";
import { Inputs } from "../types/types";
import axios from "axios";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const { t } = useTranslation("auth");
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<Inputs>({
    criteriaMode: "all",
    mode: "onBlur"
  });

  const forgotPassword = async (data: { email: string }) => {       
    await axios.post("/api/forgot", data);
    router.push("/login?error=recover");
  };

  const onSubmit: SubmitHandler<Inputs> = data => forgotPassword(data);

  return (
    <Context>
      <main className={styles.container}>
        <div className={styles.header}>
          {t("forgotHeader")}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.loginForm}>
          <FormField fieldName="email" register={register} errors={errors} watch={watch} />

          <input type="submit" value={t("forgotButton")} className={styles.loginButton} />
        </form>  
      </main>
    </Context>
  );
};

export default Login;
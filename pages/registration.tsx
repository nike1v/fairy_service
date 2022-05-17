import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import Context from "../components";
import FormField from "../components/FormField";

import { Inputs } from "../types/types";

import styles from "../styles/Register.module.css";

const Login: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation("auth");
  const { register, handleSubmit, formState: { errors }, watch } = useForm<Inputs>({
    criteriaMode: "all",
    mode: "onBlur"
  });

  const registerUser = async (data: Inputs) => {       
    await axios.post("/api/register", data);
    try {
      const result: any = await signIn("credentials", {
        email: data.email, password: data.password, callbackUrl: `${window.location.origin}/services`, redirect: true }
      );

      if (result) {
        router.push(result.url);
      }
    } catch (error: any) {
      alert("Failed to register: " + error.toString());
    }
  };

  const onSubmit: SubmitHandler<Inputs> = data => registerUser(data);

  return (
    <Context>
      <main className={styles.container}>
        <div className={styles.header}>
          {t("registerHeader")}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.registerForm}>
          <div className={styles.fieldsColumnOne}>
            <FormField fieldName="firstName" register={register} errors={errors} watch={watch} />

            <FormField fieldName="lastName" register={register} errors={errors} watch={watch} />

            <FormField fieldName="email" register={register} errors={errors} watch={watch} />

            <FormField fieldName="phone" register={register} errors={errors} watch={watch} />
          </div>
          <div className={styles.fieldsColumnTwo}>
            <FormField fieldName="password" register={register} errors={errors} watch={watch} />

            <FormField fieldName="confirmPassword" register={register} errors={errors} watch={watch} />

            <div className={styles.inputContainer}>
              <div className={styles.checkboxArea}>
                <input className={styles.checkbox} type={"checkbox"} {...register("acceptRules", { required: true })} />
                <div className={styles.checkboxText}>
                  <Trans 
                    i18nKey="auth:checkboxText" 
                    components={
                      [
                        (
                          <a target={"_blank"} href={"https://drive.google.com/file/d/1GMdic85OB6-a7_oaRC0jJGPzTTOAeodX/view?usp=sharing"} key="fairyRules" rel="noopener noreferrer"  />
                        ),
                        (
                          <a target={"_blank"} href={"https://drive.google.com/file/d/1GMdic85OB6-a7_oaRC0jJGPzTTOAeodX/view?usp=sharing"} key="userDataUse" rel="noopener noreferrer"  />
                        )
                      ]
                    } 
                  />
                </div>
              </div> 
              {errors.acceptRules && <span className={styles.errorText}>{t("checkboxError")}</span>}
            </div>

            <input type="submit" value={t("registerButton")} className={styles.registerButton} />
          </div>
        </form>
      </main>
    </Context>
  );
};

export default Login;
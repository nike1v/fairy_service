import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Context from "../components";
import styles from "../styles/Register.module.css";
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
                        (<Link href="/login" key="fairyRules">
                          <a />
                        </Link>),
                        (<Link href="/login" key="personalDataAgreement">
                          <a />
                        </Link>)
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
import { NextPage } from "next";
import { ErrorMessage } from "@hookform/error-message";
import { ValidateResult, UseFormRegister, UseFormWatch } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { Translate } from "next-translate";

import { fieldName, Inputs, InputsErrors } from "../types/types";

import styles from "../styles/FormField.module.css";

interface Props {
	fieldName: fieldName;
  errors: InputsErrors;
  register: UseFormRegister<Inputs>;
  watch: UseFormWatch<Inputs>
}

const registerOptions = (t: Translate): {[k: string]: any} => ({
  email: {
    required: {
      value: true,
      message: t("emailRequired")
    },
    pattern: {
      value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
      message: t("emailPattern")
    }
  },
  password: {
    required: {
      value: true,
      message: t("passwordRequired")
    }
  }
});

const FormField: NextPage<Props> = ({ fieldName, register, errors, watch }) => {
  const { t } = useTranslation("auth");

  const validate = (value: any) => value === watch("password") || t("confirmPasswordValidate");

  const inputType = () => {
    switch (fieldName) {
    case "firstName":
    case "lastName":
      return "text";
    
    case "email":
      return "email";

    case "password":
    case "confirmPassword":
      return "password";

    case "phone":
      return "tel";
    }
  };

  const placeholder = () => {
    switch (fieldName) {
    case "firstName":
      return t("placeholderName");

    case "lastName":
      return t("placeholderLastName");
      
    case "email":
      return t("placeholderEmail");
      
    case "phone":
      return t("placeholderPhone");
    }
  };

  return (
    <div className={styles.inputContainer}>
      <label className={`${styles.label} ${styles.required}`}>{t(`label${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`)}</label>
      <input className={`${styles.input} ${errors[fieldName] && styles.error}`} placeholder={placeholder()} type={inputType()} {...register(fieldName, registerOptions(t)[fieldName])} />
      <ErrorMessage
        errors={errors}
        name={fieldName}
        render={({ messages }) => messages
          ? Object.entries(messages).map(([type, message]: [string, ValidateResult]) => (
            <span key={type} className={styles.errorText}>{message}</span>
          ))
          : null
        }
      />
    </div>
  );};

export default FormField;
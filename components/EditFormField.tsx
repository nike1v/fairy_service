import { NextPage } from "next";
import { ErrorMessage } from "@hookform/error-message";
import { ValidateResult, UseFormRegister, UseFormWatch } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { Translate } from "next-translate";

import { EditUser, fieldName, InputsErrors } from "../types/types";

import styles from "../styles/FormField.module.css";

interface Props {
	fieldName: fieldName;
  errors: InputsErrors;
  register: UseFormRegister<EditUser>;
  watch: UseFormWatch<EditUser>;
  value?: string
}

const registerOptions = (t: Translate, validate: any): {[k: string]: any} => ({
  firstName: { 
    pattern: { 
      value: /^[A-ZА-Яa-zа-яіІїЇ]+((\s)?((\'|\-|\.)?([A-ZА-Яa-zа-яіІїЇ])+))*$/g,
      message: t("firstNamePattern")
    }, 
    minLength: { 
      value: 2, 
      message: t("firstNameMinLength")
    }
  },
  lastName: { 
    pattern: { 
      value: /^[A-ZА-Яa-zа-яіІїЇ]+((\s)?((\'|\-|\.)?([A-ZА-Яa-zа-яіІїЇ])+))*$/g, 
      message: t("lastNamePattern")
    }, 
    minLength: { 
      value: 2, 
      message: t("lastNameMinLength")
    } 
  },
  email: {
    pattern: {
      value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
      message: t("emailPattern")
    }
  },
  phone: {
    pattern: {
      value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/img,
      message: t("phonePattern")
    },
    minLength: {
      value: 5,
      message: t("phoneMinLength")
    },
    maxLength: {
      value: 10,
      message: t("phoneMaxLength")
    }
  },
  password: {
    pattern: {
      value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/g,
      message: t("passwordPattern")
    },
    minLength: {
      value: 8,
      message: t("passwordMinLength")
    },
    maxLength: {
      value: 28,
      message: t("passwordMaxLength")
    }
  },
  confirmPassword: {
    validate: (value: any) => validate(value)
  }
});

const FormField: NextPage<Props> = ({ fieldName, register, errors, watch, value }) => {
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
      <input className={`${styles.input} ${errors[fieldName] && styles.error}`} defaultValue={value} placeholder={placeholder()} type={inputType()} {...register(fieldName, registerOptions(t, validate)[fieldName])} />
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
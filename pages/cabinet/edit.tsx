import { NextApiRequest, NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

import Context from "../../components";
import FormField from "../../components/EditFormField";

import { EditUser, Inputs } from "../../types/types";

import styles from "../../styles/Register.module.css";
import { PrismaClient } from "@prisma/client";
import { getToken, JWT } from "next-auth/jwt";

interface Props {
	value: EditUser,
};

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const prisma = new PrismaClient();
  const token: null | JWT = await getToken({
    req,
    secret: process.env.NEXT_JWT_SECRET,
  });
  const user = await prisma.clients.findFirst({
    where: {
      email: token?.email as string | undefined,
    },
    select: {
      clientId: true,
      firstName: true,
      phone: true,
      email: true,
      lastName: true,
      admin: true
    }
  });

  return {
    props: { 
      value: user
    },
  };
};

const EditUserInfo: NextPage<Props> = ({ value }) => {
  const router = useRouter();
  const { t } = useTranslation("auth");
  const { register, handleSubmit, formState: { errors }, watch } = useForm<EditUser>({
    criteriaMode: "all",
    mode: "onBlur"
  });

  const editUserData = async (data: EditUser) => {  
    try {
      const result: any = await axios.put("/api/edit", data);

      if (result.status === 200) {
        router.push("/cabinet");
      }
    } catch (error: any) {
      alert("Failed to edit data: " + error.toString());
    }
  };

  const onSubmit: SubmitHandler<EditUser> = data => editUserData(data);

  return (
    <Context>
      <main className={styles.container}>
        <div className={styles.header}>
          {t("editHeader")}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.registerForm}>
          <div className={styles.fieldsColumnOne}>
            <FormField fieldName="firstName" register={register} errors={errors} watch={watch} value={value.firstName} />

            <FormField fieldName="lastName" register={register} errors={errors} watch={watch} value={value.lastName} />

            <FormField fieldName="email" register={register} errors={errors} watch={watch} value={value.email} />

            <FormField fieldName="phone" register={register} errors={errors} watch={watch} value={value.phone} />
          </div>
          <div className={styles.fieldsColumnTwo}>
            <FormField fieldName="password" register={register} errors={errors} watch={watch}  />

            <FormField fieldName="confirmPassword" register={register} errors={errors} watch={watch}  />
            <input type="hidden" value={+value.clientId} {...register("clientId")} /> 

            <input type="submit" value={t("saveEditButton")} className={styles.registerButton} />
          </div>
        </form>
      </main>
    </Context>
  );
};

export default EditUserInfo;
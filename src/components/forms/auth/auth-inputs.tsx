import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInSchema, SignUpSchema } from "@/schemas/auth.schema";
import { IconAt, IconLock, IconUser } from "@tabler/icons-react";
import { Control, FieldErrors } from "react-hook-form";

interface AuthInputsProps {
  control: Control<SignInSchema> | Control<SignUpSchema>;
  errors: FieldErrors;
  isRegister?: boolean;
}

const AuthInputs: React.FC<AuthInputsProps> = ({
  control,
  errors,
  isRegister,
}) => {
  return (
    <>
      {isRegister && (
        <FormField
          control={control as Control<SignUpSchema>}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Name</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder="Your Full Name"
                  leftIcon={<IconUser size={20} />}
                  variant={errors.full_name ? "error" : "default"}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormErrorMessage name={field.name} />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={control as Control<SignInSchema>}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={field.name}>Email</FormLabel>
            <FormControl>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="Your Email Address"
                leftIcon={<IconAt size={20} />}
                variant={errors.email ? "error" : "default"}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormErrorMessage name={field.name} />
          </FormItem>
        )}
      />
      <FormField
        control={control as Control<SignInSchema>}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={field.name}>Password</FormLabel>
            <FormControl>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                placeholder="Your Password"
                leftIcon={<IconLock size={20} />}
                variant={errors.password ? "error" : "default"}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormErrorMessage name={field.name} />
          </FormItem>
        )}
      />
    </>
  );
};

export default AuthInputs;

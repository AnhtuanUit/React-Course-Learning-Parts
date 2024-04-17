import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSingup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { getValues, register, formState, handleSubmit } = useForm();
  const { signup, isLoading } = useSignup();

  function onSubmit(data) {
    console.log(data);
    signup(data);
  }

  // console.log(formState.errors);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={formState.errors.fullName?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={formState.errors.email?.message}>
        <Input
          disabled={isLoading}
          type="email"
          id="email"
          autoComplete="username"
          {...register("email", {
            required: "This field is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={formState.errors.password?.message}
      >
        <Input
          disabled={isLoading}
          type="password"
          id="password"
          autoComplete="new-password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password length must be from 8",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={formState.errors.passwordConfirm?.message}
      >
        <Input
          disabled={isLoading}
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Confirm password not match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

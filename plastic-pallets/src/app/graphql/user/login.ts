import { Variables } from "graphql-request";
import mutate from "@/app/graphql/mutate";

interface LoginMutationVariables extends Variables {
  email: string; // Change email to be a required field
  password: string; // Change password to be a required field
}

const LOGIN_MUTATION = /* GraphQL */ `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const loginMutation = async (variables: LoginMutationVariables) => {
  const response = mutate(LOGIN_MUTATION, variables);
  console.log(response);

  return response;
};

export default loginMutation;

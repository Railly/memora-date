import { SignInSchema } from "@/schemas/auth.schema";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AUTH_ERROR } from "../constants";

const supabase = createRouteHandlerClient({ cookies });

class ServerAuthService {
  async signInWithEmailAndPassword(body: SignInSchema) {
    try {
      const { email, password } = body;
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error, data };
    } catch (error) {
      return {
        data: null,
        error: {
          name: AUTH_ERROR,
          message: "Something went wrong, please try again later",
          status: 500,
          error,
        },
      };
    }
  }

  async signUpWithEmailAndPassword(body: SignInSchema) {
    try {
      const { email, password } = body;
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });

      return { error, data };
    } catch (error) {
      return {
        data: null,
        error: {
          name: AUTH_ERROR,
          message: "Something went wrong, please try again later",
          status: 500,
          error,
        },
      };
    }
  }
}

export default ServerAuthService;

import { SignInSchema, SignUpSchema } from "@/schemas/auth.schema";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AUTH_ERROR } from "../constants";
import type { Database } from "@/types/supabase";

const supabase = createRouteHandlerClient<Database>({ cookies });

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
      console.error(error);
      return {
        data: null,
        error: {
          name: AUTH_ERROR,
          message: "Something went wrong, please try again later",
          status: 500,
        },
      };
    }
  }

  async signUpWithEmailAndPassword(body: SignUpSchema) {
    try {
      const { email, password, name } = body;
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      return { error, data };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: {
          name: AUTH_ERROR,
          message: "Something went wrong, please try again later",
          status: 500,
        },
      };
    }
  }

  async signOut() {
    try {
      const { error, data } = await supabase.auth.getSession();
      console.log({ error, data });
      if (error) {
        return { error, data };
      }
      if (data.session) {
        const { error } = await supabase.auth.signOut();
        return { error, data: null };
      }
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: {
          name: AUTH_ERROR,
          message: "Something went wrong, please try again later",
          status: 500,
        },
      };
    }
  }

  async signInWithProvider(provider: "google" | "github") {
    try {
      const response = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: {
          name: AUTH_ERROR,
          message: "Something went wrong, please try again later",
          status: 500,
        },
      };
    }
  }
}

export default ServerAuthService;

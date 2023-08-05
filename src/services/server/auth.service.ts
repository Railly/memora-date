import { SignInSchema, SignUpSchema } from "@/schemas/auth.schema";
import { AUTH_ERROR } from "../constants";
import { ServerServiceApi } from "./blueprint";

class ServerAuthService extends ServerServiceApi {
  async signInWithEmailAndPassword(body: SignInSchema) {
    try {
      const { email, password } = body;
      const { error, data } = await this.supabase.auth.signInWithPassword({
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
      const { error, data } = await this.supabase.auth.signUp({
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
      const { error, data } = await this.supabase.auth.getSession();
      if (error) {
        return { error, data };
      }
      if (data.session) {
        const response = await this.supabase.auth.signOut();
        return {
          error: response.error,
          data: null,
        };
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

  async signInWithProvider(
    provider: "google" | "github",
    lastLogoutFrom: string
  ) {
    try {
      const redirectTo = new URL(
        "/api/auth/callback",
        process.env.NEXT_PUBLIC_BASE_URL
      );
      redirectTo.searchParams.set("lastLogoutFrom", lastLogoutFrom);
      const response = await this.supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectTo.toString(),
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

  async getSession() {
    try {
      const { error, data } = await this.supabase.auth.getSession();
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
}

export default ServerAuthService;

import { SignInSchema, SignUpSchema } from "@/schemas/auth.schema";
import { HttpError } from "../errors";

class ClientAuthService {
  async signInWithEmailAndPassword(body: SignInSchema) {
    try {
      const { email, password } = body;
      const response = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.ok) {
        throw new HttpError(response.status, data.error.message);
      }
      return data;
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(`HTTP Error: ${error.status} - ${error.statusText}`);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async signUpWithEmailAndPassword(body: SignUpSchema) {
    try {
      const { name, email, password } = body;
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.ok) {
        throw new HttpError(response.status, response.statusText);
      }
      return data;
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(`HTTP Error: ${error.status} - ${error.statusText}`);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async signOut() {
    try {
      const response = await fetch("/api/auth/sign-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!data.ok) {
        throw new HttpError(response.status, response.statusText);
      }
      return data;
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(`HTTP Error: ${error.status} - ${error.statusText}`);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async signInWithProvider(provider: "google" | "github", redirectTo = "") {
    try {
      const response = await fetch(
        `/api/auth/sign-in/oauth?provider=${provider}&redirectTo=${redirectTo}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!data.ok) {
        throw new HttpError(response.status, response.statusText);
      }
      return data;
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(`HTTP Error: ${error.status} - ${error.statusText}`);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async getSession() {
    try {
      const response = await fetch("/api/auth/session", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
      }
      return response.json();
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(`HTTP Error: ${error.status} - ${error.statusText}`);
      } else {
        console.error(error);
      }
      throw error;
    }
  }
}

export default ClientAuthService;

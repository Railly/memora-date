import { SignInSchema } from "@/schemas/auth.schema";
import { AUTH_ERROR } from "../constants";

class ClientAuthService {
  async signInWithEmailAndPassword(body: SignInSchema) {
    try {
      const { email, password } = body;
      const response = fetch("/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      throw new Error(AUTH_ERROR);
    }
  }

  async signUpWithEmailAndPassword(body: SignInSchema) {
    try {
      const { email, password } = body;
      const response = fetch("/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      throw new Error(AUTH_ERROR);
    }
  }
}

export default ClientAuthService;

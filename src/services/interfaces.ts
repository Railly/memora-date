import ServerAuthService from "./api/auth.service";
import ClientAuthService from "./client/auth.service";

type ServiceType = "client" | "server";

export interface IServiceApi<T extends ServiceType> {
  auth: T extends "server" ? ServerAuthService : ClientAuthService;
}

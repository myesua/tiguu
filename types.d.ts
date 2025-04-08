import { BunRequest } from "./pages/interface";
declare module "bunrest" {
	interface BunRequest {
		body?: BunRequest.body;
	}
}

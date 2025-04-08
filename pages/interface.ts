export interface BunRequest {
	method: string;
	request: Request;
	path: string;
	headers?: { [key: string]: any };
	params?: { [key: string]: any };
	query?: { [key: string]: any };
	body?: { [key: string]: any };
	blob?: any;
}

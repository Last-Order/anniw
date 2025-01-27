import axios, { AxiosInstance, AxiosError } from "axios";
import { formatRequest, formatResponse } from "../utils/format";

export class AnniwRequestError extends Error {}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

class Request {
    private base: string = "";
    private instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            timeout: 10000,
        });
    }

    setBasePath(base: string): void {
        this.base = base;
    }

    /**
     * HTTP Request
     * @param method
     * @param path
     * @param payload
     */
    request<T>(
        method: HttpMethod = "GET",
        path: string = "/",
        payload: Record<string, unknown> = {}
    ): Promise<T> {
        console.log(`[${new Date().toISOString()}] ${method} ${path}`);
        const options = {
            method: method,
            url: `${this.base}${path}`,
            params: {},
            data: {},
        };
        if (method === "GET") {
            options.params = formatRequest(payload);
        } else {
            options.data = formatRequest(payload);
        }
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.instance.request(options);
                const data = response.data;
                if (data.status !== 0) {
                    reject(new AnniwRequestError(data.message));
                } else {
                    resolve(formatResponse(data.data));
                }
            } catch (e) {
                // Network Error
                reject(this.parseError(e as any));
            }
        });
    }

    /**
     * HTTP GET
     * @param path
     * @param payload
     */
    get<T>(path: string = "/", payload: Record<string, unknown> = {}) {
        return this.request<T>("GET", path, payload);
    }

    /**
     * HTTP POST
     * @param path
     * @param payload
     */
    post<T>(path: string = "/", payload: Record<string, unknown> = {}) {
        return this.request<T>("POST", path, payload);
    }

    /**
     * HTTP PATCH
     * @param path
     * @param payload
     * @returns
     */
    patch<T>(path: string = "/", payload: Record<string, unknown> = {}) {
        return this.request<T>("PATCH", path, payload);
    }

    /**
     * HTTP DELETE
     * @param path
     * @param payload
     * @returns
     */
    delete<T>(path: string = "/", payload: Record<string, unknown> = {}) {
        return this.request<T>("DELETE", path, payload);
    }

    parseError(e: AxiosError): AnniwRequestError {
        if (e.request?.status) {
            return new AnniwRequestError(`网络错误: ${e.request.status} ${e.request.statusText}`);
        }
        return new AnniwRequestError("未知网络错误");
    }
}

export default new Request();

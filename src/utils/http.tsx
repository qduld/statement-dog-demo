export interface HttpRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE"; // 请求方法
  headers?: { [key: string]: string }; // 请求头
  body?: unknown; // 请求体，可以是JSON对象或其他格式
}

export interface HttpResponseData {
  list: Array<unknown>;
  code: number;
  data: unknown;
  ok: boolean;
}
export interface HttpResponse {
  status: number;
  data: HttpResponseData;
  ok: boolean;
}

// https://finmindtrade.com/analysis/#/account/user token
export const authorization =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNS0wNy0wMyAwNDoyMDoxNCIsInVzZXJfaWQiOiJmcmFua2xpbnplbG8iLCJpcCI6IjE0MC4yNDUuOTkuMTMxIn0.W9w7clO6TLb6BHjp3zyGkJ-xNUYJj3zJVVXfjQucDmA";
const proxyServer = "/api/proxy";
export async function httpRequest(
  url: string,
  options: HttpRequestOptions = {},
  params?: Record<string, unknown>,
  timeout: number = 10000
): Promise<HttpResponse> {
  const {
    method = "GET",
    headers = {
      "Content-Type": "application/json",
    },
    body = null,
  } = options;

  // Add path and params to query string
  const queryParams = {
    path: url,
    ...(params || {}),
  };
  const queryString = objectToQueryString(queryParams);

  // 创建超时的 Promise
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);
  });

  try {
    const response = await Promise.race([
      fetch(`${proxyServer}${queryString}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      }),
      timeoutPromise,
    ]);

    // 解析 JSON 响应
    const data = await response.json();

    // 返回统一的响应格式
    return {
      status: response.status,
      data,
      ok: response.ok,
    };
  } catch (error) {
    // 在这里可以添加更多的错误处理逻辑
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`HTTP request failed: ${errorMessage}`);
  }
}

/**
 * 将对象转换为查询字符串
 * @param params 请求的查询参数对象
 * @returns string 查询字符串
 */
function objectToQueryString(params?: Record<string, unknown>): string {
  if (!params) return "";
  return (
    "?" +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            value !== null && value !== undefined ? String(value) : ""
          )}`
      )
      .join("&")
  );
}

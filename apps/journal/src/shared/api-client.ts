export async function apiRequest<T>(
  endpoint: string,
  method: string = "GET",
  body?: unknown,
): Promise<T> {
  const options: RequestInit = {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, options);
  const data: unknown = await response.json();

  if (!response.ok) {
    const errorPayload =
      typeof data === "object" && data !== null && "error" in data
        ? (data as { error?: unknown }).error
        : undefined;

    if (Array.isArray(errorPayload)) {
      const firstIssue = errorPayload[0];
      const message =
        typeof firstIssue?.message === "string"
          ? firstIssue.message
          : "Something went wrong";
      throw new Error(message);
    }

    if (typeof errorPayload === "string") {
      throw new Error(errorPayload);
    }

    if (
      typeof errorPayload === "object" &&
      errorPayload !== null &&
      "message" in errorPayload &&
      typeof (errorPayload as { message?: unknown }).message === "string"
    ) {
      throw new Error((errorPayload as { message: string }).message);
    }

    throw new Error("Something went wrong");
  }

  return data as T;
}

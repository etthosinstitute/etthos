
export async function apiRequest<T>(
  endpoint: string,
  method: string = "GET",
  body?: any
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, options);
  const data = await response.json();

  if (!response.ok) {
    const errorPayload = data?.error;

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

    if (errorPayload && typeof errorPayload.message === "string") {
      throw new Error(errorPayload.message);
    }

    throw new Error("Something went wrong");
  }

  return data as T;
}

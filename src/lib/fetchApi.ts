export async function fetchAPI<T>(path: string, options = {}) {
    try {
        const mergedOptions = {
            next: { revalidate: 60 },
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        };
        const pathUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api${path}`;
        const response = await fetch(pathUrl, mergedOptions);
        const data = await response.json() as T;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const defaultFetchOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function api(endpoint, fetchOptions = defaultFetchOptions) {
  try {
    const data = await fetch(`http://localhost:8000/api${endpoint}`, fetchOptions);
    if (!data.ok) {
      throw new Error(data.status);
    }
    const json = await data.json();
    return json;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

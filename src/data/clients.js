const url = import.meta.env.VITE_API_URL;

export async function getClients() {
  const response = await fetch(url);
  const result = await response.json();

  return result;
}

export async function getClient(id) {
  const response = await fetch(`${url}/${id}`);
  const result = await response.json();

  return result;
}

export async function addClient(data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function editClient(id, data) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function destroyClient(id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    await response.json();
  } catch (error) {
    console.log(error);
  }
}

export const fetchData = async (url, method = "GET", payload) => {
  try {
    const res = await fetch(url, {
      method,
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Fetching data error: ${error.message}`);
  }
};

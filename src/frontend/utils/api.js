const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

const controller = new AbortController()
const signal = controller.signal

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

export async function listManga(params, signal) {
    console.log("API_BASE_URL:", API_BASE_URL);
    let url = new URL(API_BASE_URL);
    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }
    return await fetchJson(url, { headers, signal }, []);
  }
  

  export async function read(manga_id, params, signal) {
    console.log("API_BASE_URL:", API_BASE_URL);
    let url = new URL(`${API_BASE_URL}/${manga_id}/info`);
    console.log(url);
    if (params) {
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );
    }

    try {
        const response = await fetch(url, { headers, signal });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null or handle the error as needed
    }
}
  
export async function createComment(comment, params) {

  const url = new URL(`${API_BASE_URL}/comments`);
  const controller = new AbortController();
  const signal = controller.signal;

  if (params) {
      Object.keys(params).forEach((key) =>
          url.searchParams.append(key, params[key])
      );
  }


  try {
    // Original object
    const option = {
      method: 'POST',
      headers,
      body: JSON.stringify(comment), // Use the comment object as the request body
      signal,
    };

// Create a new object with properties in the desired order
const reorderedObject = {
  method: option.method,
  body: option.body,
  headers: headers,
  signal: option.signal
};
const options = {
  method: reorderedObject.method,
  headers: headers,
  body: reorderedObject.body,
  signal: reorderedObject.signal
};
console.log('-----',reorderedObject);
    const response = await fetchJson(url, options);
    console.log('-----------------response',response)
      if (response && response.ok) {
          const data = await response.json();
          return data;
      } else {
          const errorMessage = await response.text(); // Get the detailed error message from the response
          throw new Error(`Failed to create comment: ${errorMessage}`);
      }
  } catch (error) {
      console.error('Error creating comment:', error);
      throw new Error('Error creating comment');
  }
}
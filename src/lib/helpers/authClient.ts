// get the token from the local storage
export function getAuthToken() {
  const authStorage = localStorage.getItem("auth-storage");
  if (!authStorage) {
    return null;
  }

  try {
    const parsedStorage = JSON.parse(authStorage);
    return parsedStorage.state.token;
  } catch (error) {
    console.error("Error parsing auth storage:", error);
    return null;
  }
}

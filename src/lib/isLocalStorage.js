
export default function isLocalStorage() {
  const key = '__table';
  try {
    localStorage.setItem(key, key);
    localStorage.removeItem(key);
    return true;
  } catch(e) {
    return false;
  }
}

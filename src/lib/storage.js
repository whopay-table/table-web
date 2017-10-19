
import isLocalStorage from 'src/lib/isLocalStorage';

const IS_LOCAL_STORAGE = isLocalStorage();

export function setItem(key, value) {
  if (IS_LOCAL_STORAGE) {
    localStorage.setItem(key, value)
  } else {
    Cookies.set(key, value);
  }
}

export function getItem(key) {
  if (IS_LOCAL_STORAGE) {
    return localStorage.getItem(key);
  } else {
    return Cookies.get(key);
  }
}

export function removeItem(key) {
  if (IS_LOCAL_STORAGE) {
    return localStorage.removeItem(key);
  } else {
    return Cookies.remove(key);
  }
}

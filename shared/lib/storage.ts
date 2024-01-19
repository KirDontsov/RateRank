export const storage = {
  getItem(key: string) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.log(e);
    }
  },
  setItem(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  },
  removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  },
};

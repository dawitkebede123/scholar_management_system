export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};
export const getBusiness = () => {
  return fetch("https://chamber-60982-default-rtdb.firebaseio.com/Query10.json?print=pretty").then((res) => res.json());
};
export const getAlmanac = () => {
  return fetch("https://chamber-60982-default-rtdb.firebaseio.com/Almanac.json").then((res) => res.json());
};
export const getNotification = () => {
  return fetch("https://chamber-60982-default-rtdb.firebaseio.com/Announcement.json").then((res) => res.json());
};
export const getUser = () => {
  return fetch("https://chamber-60982-default-rtdb.firebaseio.com/User.json").then((res) => res.json());
};
export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};

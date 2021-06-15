export const trimmer = (users) => {
  const _users = [
    ...new Map(users.map((item) => [item.email, item])).values(),
  ];
  return _users;
};
export const displayFilter = (products) => {
  return products.filter((product) => product.show === true);
}
export const countUnique = (arr) => {
  const counts = {};
  for (let i = 0; i < arr.length; i++) {
    counts[arr[i]] = 1 + (counts[arr[i]] || 0);
  }
  return counts;
};
export const getInitials= (name = '') => name
  .replace(/\s+/, ' ')
  .split(' ')
  .slice(0, 2)
  .map((v) => v && v[0].toUpperCase())
  .join('');

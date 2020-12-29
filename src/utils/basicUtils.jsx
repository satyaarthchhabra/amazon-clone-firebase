export const trimmer = (users) => {
  const _users = [
    ...new Map(users.map((item) => [item.email, item])).values(),
  ];
  return _users;
};
export const displayFilter = (products) => {
  return products.filter((product) => product.show === true);
}
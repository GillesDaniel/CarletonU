const loader = (query) => {
  console.log('JSON Datasource LOADER', query);

  return Promise.resolve([
    {
      _id: 1,
      name: 'Chip Russert',
      role: 'Journeyman carpenter',
    },
    {
      _id: 2,
      name: 'Sam Thomas',
      role: 'Second class electrician',
    },
    {
      _id: 3,
      name: 'Bill McDonald',
      role: 'First  class electrician',
    },
    {
      _id: 4,
      name: 'Adam Modfield',
      role: 'Journeyman carpenter',
    },
    {
      _id: 5,
      name: 'Tina Smith',
      role: 'Expert electrician',
    },
    {
      _id: 6,
      name: 'Kyle Young',
      role: 'Second class carpenter',
    },
  ]);
};

export default loader;

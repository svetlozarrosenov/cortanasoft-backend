export const usersTable = {
  id: 'usersTable',
  fields: [
    { field: 'firstName', headerName: 'Име', filter: true, flex: 1 },
    { field: 'middleName', headerName: 'Презиме', filter: true },
    { field: 'lastName', headerName: 'Фамилия', filter: true },
    { field: 'role', headerName: 'Роля', filter: true },
    { field: 'country', headerName: 'Държава', filter: true },
    { field: 'city', headerName: 'Град', filter: true },
    { field: 'address', headerName: 'Адрес', filter: true },
    { field: 'phone', headerName: 'Телефон', filter: true },
    { field: 'email', headerName: 'Имейл', filter: true },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 150,
    },
  ],
};

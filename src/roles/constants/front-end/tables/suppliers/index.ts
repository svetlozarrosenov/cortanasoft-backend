export const suppliersTable = {
  id: 'suppliersTable',
  fields: [
    {
      field: 'companyName',
      headerName: 'Име на компания',
      filter: true,
      flex: 1,
    },
    {
      field: 'responsiblePerson',
      headerName: 'Отговорно лице',
      filter: true,
      flex: 1,
    },
    { field: 'email', headerName: 'Имейл', filter: true, flex: 1 },
    { field: 'phone', headerName: 'Телефон', filter: true, flex: 1 },
    { field: 'address', headerName: 'Адрес', filter: true, flex: 1 },
    { field: 'city', headerName: 'Град', filter: true, flex: 1 },
    { field: 'country', headerName: 'Държава', filter: true, flex: 1 },
    {
      field: 'actions',
      headerName: 'Действия',
      minWidth: 250,
    },
  ],
};

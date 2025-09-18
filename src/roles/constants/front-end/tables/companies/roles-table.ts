export const rolesTable = {
  id: 'rolesTable',
  fields: [
    { field: 'name', headerName: 'Име на ролята', filter: true, flex: 1 },
    { field: 'description', headerName: 'Описание', filter: true, flex: 1 },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 150,
    },
  ],
};

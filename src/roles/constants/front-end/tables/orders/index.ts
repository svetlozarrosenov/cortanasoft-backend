export const ordersTable = {
  id: 'ordersTable',
  fields: [
    {
      field: 'clientName',
      headerName: 'Клиент',
      filter: true,
    },
    {
      field: 'totalPrice',
      headerName: 'Обща цена',
      filter: true,
    },
    {
      field: 'status',
      headerName: 'Статус',
      filter: true,
    },
    {
      field: 'createdAt',
      headerName: 'Създадена на',
      filter: true,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleString('bg-BG'),
    },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 120,
    },
  ],
};

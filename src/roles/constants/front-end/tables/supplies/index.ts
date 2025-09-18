export const suppliesTable = {
  id: 'suppliesTable',
  fields: [
    {
      field: 'companyName',
      headerName: 'Доставчик',
      filter: true,
    },
    {
      field: 'price',
      headerName: 'Цена на доставка',
      filter: true,
    },
    {
      field: 'status',
      headerName: 'Статус',
      filter: true,
      valueFormatter: (params) => {
        const statusMap: Record<string, string> = {
          pending: 'Очакваща',
          received: 'Получена',
          canceled: 'Отменена',
        };
        return statusMap[params.value] || params.value;
      },
    },
    {
      field: 'deliveryDate',
      headerName: 'Дата на доставка',
      filter: true,
    },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 120,
    },
  ],
};

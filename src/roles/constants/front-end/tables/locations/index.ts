export const locationsTable = {
  id: 'locationsTable',
  fields: [
    { field: 'name', headerName: 'Име', filter: true, flex: 1 },
    {
      field: 'type',
      headerName: 'Тип',
      filter: true,
      valueFormatter: (params) => {
        const typeMap: Record<string, string> = {
          warehouse: 'Склад',
          store: 'Магазин',
          bin: 'Позиция',
        };
        return typeMap[params.value] || params.value;
      },
    },
    { field: 'address', headerName: 'Адрес', filter: true, flex: 1 },
    { field: 'country', headerName: 'Държава', filter: true },
    { field: 'city', headerName: 'Град', filter: true },
    { field: 'email', headerName: 'Имейл', filter: true },
    { field: 'phone', headerName: 'Телефон', filter: true },
    { field: 'description', headerName: 'Описание', filter: true, flex: 1 },
    {
      headerName: 'Действия',
      width: 150,
    },
  ],
};

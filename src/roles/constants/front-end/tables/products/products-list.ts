export const productsListTable = {
  id: 'productsListTable',
  fields: [
    { field: 'name', headerName: 'Име', filter: true, flex: 1 },
    { field: 'model', headerName: 'Модел', filter: true, flex: 1 },
    { field: 'description', headerName: 'Описание', filter: true, flex: 1 },
    {
      field: 'price',
      headerName: 'Цена',
      filter: true,
    },
    { field: 'category', headerName: 'Категория', filter: true },
    { field: 'quantity', headerName: 'Наличност', filter: true },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 150,
    },
  ],
};

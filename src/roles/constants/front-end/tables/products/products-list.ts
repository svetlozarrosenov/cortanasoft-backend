export const productsListTable = {
  id: 'productsListTable',
  fields: [
    { field: 'name', headerName: 'Име', filter: true, width: 350 },
    { field: 'model', headerName: 'Модел', filter: true, width: 350 },
    { field: 'quantity', headerName: 'Наличност', filter: true },
    {
      field: 'salePrice',
      headerName: 'Продажна цена',
      filter: true,
    },
    {
      field: 'costPrice',
      headerName: 'Доставна цена',
      filter: true,
    },
    { field: 'vat', headerName: 'ДДС', filter: true },
    { field: 'description', headerName: 'Описание', filter: true, width: 350 },
    { field: 'category', headerName: 'Категория', filter: true },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 150,
    },
  ],
};

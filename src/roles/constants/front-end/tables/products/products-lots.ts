export const productsLotsTable = {
  id: 'productsLotsTable',
  fields: [
    {
      field: 'lotNumber',
      headerName: 'Номер на партида',
      filter: true,
      width: 250,
    },
    { field: 'name', headerName: 'Име', filter: true },
    { field: 'model', headerName: 'Модел', filter: true },
    {
      field: 'serialNumber',
      headerName: 'Сериен Номер',
      filter: true,
      width: 250,
    },
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
    { field: 'category', headerName: 'Категория', filter: true },
    { field: 'status', headerName: 'Статус', filter: true },
    {
      field: 'expiryDate',
      headerName: 'Срок на годност',
      filter: true,
    },
    { field: 'description', headerName: 'Описание', filter: true },
  ],
};

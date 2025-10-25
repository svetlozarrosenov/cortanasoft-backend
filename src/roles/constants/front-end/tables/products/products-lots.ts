export const productsLotsTable = {
  id: 'productsLotsTable',
  fields: [
    {
      field: 'lotNumber',
      headerName: 'Номер на партида',
      filter: true,
      width: 200,
    },
    { field: 'name', headerName: 'Име', filter: true },
    { field: 'model', headerName: 'Модел', filter: true },
    {
      field: 'serialNumber',
      headerName: 'Сериен Номер',
      filter: true,
      width: 200,
    },
    { field: 'quantity', headerName: 'Наличност', filter: true },
    {
      field: 'salePrice',
      headerName: 'Продажна цена',
      filter: true,
      width: 200,
    },
    {
      field: 'costPrice',
      headerName: 'Доставна цена за брой',
      filter: true,
      width: 250,
    },
    { field: 'currencyRate', headerName: 'Курс', filter: true },
    {
      field: 'totalCostPrice',
      headerName: 'Общо доставна цена със ДДС',
      filter: true,
      width: 270,
    },
    { field: 'vatRate', headerName: 'ДДС', filter: true },
    { field: 'category', headerName: 'Категория', filter: true, width: 300 },
    { field: 'status', headerName: 'Статус', filter: true },
    {
      field: 'expiryDate',
      headerName: 'Срок на годност',
      filter: true,
      width: 200,
    },
    { field: 'description', headerName: 'Описание', filter: true, width: 350 },
  ],
};

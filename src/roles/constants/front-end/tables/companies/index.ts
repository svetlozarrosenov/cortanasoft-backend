export const companiesTable = {
  id: 'companiesTable',
  fields: [
    {
      field: 'name',
      headerName: 'Име на компанията',
      filter: true,
      width: 250,
    },
    { field: 'description', headerName: 'Описание', filter: true },
    { field: 'industry', headerName: 'Индустрия', filter: true, width: 150 },
    {
      field: 'email',
      headerName: 'Имейл за контакт',
      width: 250,
      filter: true,
    },
    { field: 'phone', headerName: 'Телефон за контакт', filter: true },
    { field: 'eik', headerName: 'ЕИК номер', filter: true },
    { field: 'vatNumber', headerName: 'ДДС номер', filter: true },
    { field: 'personInCharge', headerName: 'МОЛ', filter: true },
    { field: 'country', headerName: 'Държава', filter: true },
    { field: 'city', headerName: 'Град', filter: true },
    { field: 'address', headerName: 'Адрес', filter: true },
    { field: 'price', headerName: 'Цена', filter: true, width: 150 },
    { field: 'currency', headerName: 'Валута', filter: true, width: 150 },
    {
      field: 'charging',
      headerName: 'Таксуване',
      filter: true,
    },
    { field: 'roleInTheSystem', headerName: 'Роля в системата', filter: true },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 150,
    },
  ],
};

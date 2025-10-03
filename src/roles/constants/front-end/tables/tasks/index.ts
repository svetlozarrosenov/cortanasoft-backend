export const tasksTable = {
  id: 'tasksTable',
  fields: [
    {
      field: 'title',
      headerName: 'Заглавие',
      filter: true,
      flex: 1,
    },
    { field: 'description', headerName: 'Описание', filter: true, flex: 1 },
    {
      field: 'deadline',
      headerName: 'Краен срок',
      filter: true,
    },
    {
      field: 'isRecurring',
      headerName: 'Повтарящо се',
      filter: true,
    },
    {
      field: 'recurrenceInterval',
      headerName: 'Интервал',
      filter: true,
    },
    {
      field: 'status',
      headerName: 'Статус',
      filter: true,
    },
    {
      field: 'reporterName',
      headerName: 'Възложител',
      filter: true,
    },
    {
      field: 'assigneeName',
      headerName: 'Отговорник',
      filter: true,
    },
  ],
};

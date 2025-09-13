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
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString('bg-BG') : '-',
    },
    {
      field: 'isRecurring',
      headerName: 'Повтарящо се',
      filter: true,
      valueFormatter: (params) => (params.value ? 'Да' : 'Не'),
    },
    {
      field: 'recurrenceInterval',
      headerName: 'Интервал',
      filter: true,
      valueFormatter: (params) => {
        const intervalMap: Record<string, string> = {
          daily: 'Дневно',
          weekly: 'Седмично',
          monthly: 'Месечно',
        };
        return params.value ? intervalMap[params.value] || params.value : '-';
      },
    },
    {
      field: 'status',
      headerName: 'Статус',
      filter: true,
      valueFormatter: (params) => {
        const statusMap: Record<string, string> = {
          pending: 'Чакаща',
          in_progress: 'В процес',
          completed: 'Завършена',
        };
        return statusMap[params.value] || params.value;
      },
    },
    {
      field: 'reporter',
      headerName: 'Възложител',
      filter: true,
    },
    {
      field: 'assignee',
      headerName: 'Отговорник',
      filter: true,
    },
    {
      headerName: 'Действия',
      width: 150,
    },
  ],
};

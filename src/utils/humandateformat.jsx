export const getHumanDateFormat = (data) => {
    const date = new Date(data);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric'
    };
    return date.toLocaleDateString('es-PE', options);
  }
export const getHumanDateFormat = (data) => {
    const date = new Date(data);
    date.setDate(date.getDate() + 1);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric'
    };
    return date.toLocaleDateString('es-PE', options);
  }

export const getHumanDateFormat_plus = (data, daysmore) => {
  const date = new Date(data);
  date.setDate(date.getDate() + 1 + daysmore);
  return date
}

//2024-05-06
export function getFormatShipDate({fechacontable: date, moredays = 0}) {
  var d = date?.getDate() + 1 + moredays;
  var m = ("0" + (date.getMonth() + 1)).slice(-2);
  var y = date?.getFullYear();
  return '' +  y + '-' + m + '-' + (d <= 9 ? '0' + d : d);
}

//06-05-2024
export function getFormatShipDate_peru({fecha: date, moredays = 0}) {
  var d = date?.getDate() + 1 + moredays;
  var m = ("0" + (date.getMonth() + 1)).slice(-2);
  var y = date?.getFullYear();
  return '' + (d <= 9 ? '0' + d : d) + '/' + m + '/' + y;
}
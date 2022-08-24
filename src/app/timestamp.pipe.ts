import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {
  transform(value: any, args?: any) {
    if (!value) null;

    value = new Date(value);

    let format = 'hh:mm';

    // const YYYY = value.getFullYear().toString();
    const MM = (value.getMonth() + 1).toString().padStart(2, '0');
    const DD = value.getDate().toString().padStart(2, '0');
    const hh = value.getHours().toString().padStart(2, '0');
    const mm = value.getMinutes().toString().padStart(2, '0');
    // const ss = value.getSeconds().toString().padStart(2, '0');
    // format = format.replace('YYYY', YYYY);
    // format = format.replace('MM', MM);
    // format = format.replace('DD', DD);
    format = format.replace('hh', hh);
    format = format.replace('mm', mm);
    // format = format.replace('ss', ss);

    let prefix = '';
    if (value.getDate() === new Date().getDate() - 1) {
      prefix = 'Hier à ';
    } else if (value.getDate() === new Date().getDate() - 2) {
      prefix = 'Avant-hier à ';
    } else if (new Date().getDate() - 2 > value.getDate()) {
      prefix = DD + '/' + MM + ' à ';
    }

    format = prefix + format;

    return format;
  }
}

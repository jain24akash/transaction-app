import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

const CSV_EXTENSION = '.csv';
const CSV_TYPE = 'text/plain;charset=utf-8';

@Injectable()
export class ExportService {
    constructor() { }

    /**
     * Creates an array of data to csv. It will automatically generate title row based on object keys.
     *
     * @param data array of data to be converted to CSV.
     * @param fileName filename to save as.
     */

    downloadFile(data: any, fileName: string, columns?: string[]) {
        const replacer = (key: any, value: null) => value === null ? '' : value; // specify how you want to handle null values here
        const header = Object.keys(data[0]).filter(k => {
            if (columns?.length) {
              return columns.includes(k);
            } else {
              return true;
            }
          });
        // const header = Object.keys(data[0]);
        let csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        csv.unshift(header.join(','));
        let csvArray = csv.join('\r\n');

        var blob = new Blob([csvArray], { type: CSV_TYPE })
        saveAs(blob, `${fileName}${CSV_EXTENSION}`);
    }
}
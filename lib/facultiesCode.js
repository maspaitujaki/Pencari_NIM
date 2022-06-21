import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'students');

export function getFacultiesCode(){
    const fullPath = path.join(dataDirectory, 'kode_fakultas.json');
    const contents = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(contents);

    return data;
}
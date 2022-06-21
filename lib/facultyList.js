import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'students');

export function getFacultiesList(){
    const fullPath = path.join(dataDirectory, 'list_fakultas.json');
    const contents = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(contents);

    return data;
}
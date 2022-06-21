import fs from 'fs';
import path from 'path';

const studDirectory = path.join(process.cwd(), 'students');

export function getStudentsData(){
    const fullPath = path.join(studDirectory, 'data.json');
    const contents = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(contents);
    const allStudData = data.map(stud => {
        
        return {
            nama: stud[0],
            nimTPB: stud[1],
            nimJurusan: stud.length == 3 ? stud[2] : ""
        }
    })

    return allStudData;
}
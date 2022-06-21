export function filterByNama(students, arrOfNama) {
    students = students.map(item => {
        let count = 0;
        for(const element of arrOfNama){
            if(item.nama.toLowerCase().match(new RegExp(element))){
            count++;
            }
        }
        return {
            prio: count,
            ...item
        }
    });

    students = students.filter(item => item.prio > 0);
    
    students = students.sort((a, b) => {
        if(a.prio > b.prio){
            return -1;
        } else {
            return 1;
        }
    });
    return students;
}
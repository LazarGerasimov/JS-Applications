let url = 'http://localhost:3030/jsonstore/advanced/table';

export async function getAllStudents() {
    return fetch(url)
        .then(res => res.json())
}
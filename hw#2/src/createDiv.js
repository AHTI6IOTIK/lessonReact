export function createDiv(body, id = null) {
    const div = document.createElement('div');

    div.innerHTML = body;
    div.id = id || '';
    div.onclick = () => {

        let divDate = document.getElementById('date'),
            date = Date();
 
        divDate.innerHTML =  date;
    };

    return div;
}
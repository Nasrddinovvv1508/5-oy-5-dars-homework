const button = document.getElementById('button');
const name = document.getElementById('name');
const price = document.getElementById('price');
const category = document.getElementById('category');
let tbody = document.getElementById('tbody');
const form = document.getElementById('form');

function validate() {
    if (!name.value) {
        alert(`Name bo'sh`);
        name.focus();
        return false
    }

    if (name.value.trim().lenght < 3) {
        alert(`Name 3 tadan ko'p bo'lishi kerak`);
        name.focus();
        return false;
    }

    if (!price.value) {
        alert(`Price bo'sh`);
        price.focus();
        return false;
    }

    if (!Number(price.value)) {
        alert(`Price son bo'lishi kerak`);
        price.focus();
        return false;
    }

    if (!category.value) {
        alert(`category bo'sh`);
        return false
    }

    return true
}


function createRow(phone, index) {
    return `
        <tr>
            <td>${index}</td>
            <td>${phone.name}</td>
            <td>${phone.price}</td>
            <td>${phone.category}</td>
            <td data-id = 'data-${phone.id}'>
                <span class="text-primary">update</span>
                <span class="text-danger">delete</span>
            </td>
        </tr>
    `
}


function getData() {
    let data = [];

    if (localStorage.getItem('phones')) {
        data = JSON.parse(localStorage.getItem('phones') )
    }

    return data;
}


button && button.addEventListener('click', function (event) {
    event.preventDefault();

    if (validate(name, price, category)) {
        let phone = {
            id: Date.now(),
            name: name.value,
            price: price.value,
            category: category.value
        }


        let data = getData();
        data.push(phone);
        localStorage.setItem('phones', JSON.stringify(data));

        let tr = createRow(phone, data.length);
        tbody.innerHTML += tr;
        form.reset();

    } else {
        alert(`Validatsiyadan o'tmadi`);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    let data = getData();

    data.length && data.forEach((phone, index) => {
        let tr = createRow(phone, index + 1);
        tbody.innerHTML += tr;
    });


    let deleteButtons = document.querySelectorAll('.text-danger');

    deleteButtons.length && deleteButtons.forEach(v => {
        v && v.addEventListener('click', function() {
            let isDelete = confirm('Are you sure?');

            if (isDelete) {
                let id = this.parentNode.getAttribute('data-id').substring(5);
                data = data.filter((phone) => {
                    return phone.id != id
                })

                localStorage.setItem('phones', JSON.stringify(data))

                tbody.innerHTML = '';
                data.length && data.forEach((phone, index) => {
                    let tr = createRow(phone, index + 1);
                    tbody.innerHTML += tr;
                })
            }
        })
    })
    })
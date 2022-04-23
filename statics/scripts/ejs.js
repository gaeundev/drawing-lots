const dragImgEl = document.getElementById('dragImg');
const uploadBox = document.querySelector('.uploadBox');

const chooseEl = document.getElementById('drawingLots');
const successEl = chooseEl.getElementsByTagName('ul');

const pickEl = document.getElementById('pick');
const pickMemberEl = document.getElementById('pickMember');
const winnerInput = document.getElementById('winner');
const memberInput = document.getElementById('member');
const pathInput = document.getElementById('path');

let waiting, memberData;
const formData = new FormData();

uploadBox.addEventListener('dragover', function (e) {
    e.preventDefault();
    dragImgEl.classList.add('icon');
});

uploadBox.addEventListener('dragleave', function (e) {
    e.preventDefault();
    dragImgEl.classList.remove('icon');
});

uploadBox.addEventListener('drop', handleDrop);

function handleDrop(e) {
    e.preventDefault();

    let dt = e.dataTransfer;
    let files = dt.files;

    uploadFile(files[0]);
}

function uploadFile(file) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            const res = JSON.parse(xhr.response);
            const resData = res.data;

            console.log(res);

            waiting = resData.waiting;

            memberInput.value = JSON.stringify(resData);
            pathInput.value = res.path;

            for (let person of waiting) {
                const newDiv = document.createElement('li');
                const newText = document.createTextNode(person);
                newDiv.appendChild(newText);

                successEl[0].appendChild(newDiv);
            }

            chooseEl.classList.remove('d-none');
            uploadBox.classList.add('d-none');
        }
    };

    let url = '/upload';
    formData.append('uploads', file);

    xhr.open('POST', url, true);
    xhr.send(formData);

    dragImgEl.classList.remove('icon');
}

function pickHandler() {
    let pick = Math.floor(Math.random() * waiting.length);
    winnerInput.value = waiting[pick];
    pickMemberEl.innerText = waiting[pick];

    chooseEl.classList.add('d-none');
    pickEl.classList.remove('d-none');
}

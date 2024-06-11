document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    const messageElement = document.getElementById('message');
    if (response.ok) {
        codeInput.value = result.code;
        messageElement.textContent = `File uploaded successfully! Code: ${result.code}`;
    } else {
        messageElement.textContent = `Error: ${result.message}`;
    }
});

document.getElementById('downloadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const code = document.getElementById('codeInput').value;

    const response = await fetch(`/api/download/${code}`);

    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } else {
        const result = await response.json();
        const messageElement = document.getElementById('message');
        // messageElement.textContent = `Error: ${result.message}`;

    }
});


// redblock
let a = document.getElementById('popap1');
$('#xmark').click(function () { 
    a.style.display = 'none';
});
$('.redBlock').click(function () { 
    a.style.display = 'flex';
});
// blueblock
let b = document.getElementById('popap2');
$('#xmark1').click(function () { 
    b.style.display = 'none';
});
$('.blueBlock').click(function () { 
    b.style.display = 'flex';
});


axios.get('/api/get-total-count')
.then(res=>{
    console.log(res.data);
$('.count').append(`<p>all count: ${JSON.stringify(res.data.count)}</p>`);
})
axios.get('/api//get-total-size')
.then(res=>{
    console.log(res.data);
    let sizeinMB = (JSON.stringify(res.data.size) / 1024 /1024).toFixed(2);
$('.sizeMB').append(`<p>all size: ${sizeinMB} MB</p>`);
})
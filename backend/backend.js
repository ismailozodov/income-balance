const 

async function getExpanse() {
    let response = await fetch('http://127.0.0.1:5000/expanse')
    console.log(response);
}

getExpanse()
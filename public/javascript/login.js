async function loginFunction(event) {
    event.preventDefault();

    const email = document.querySelector('#emailLogin').value.trim();
    const pw = document.querySelector('#pwLogin').value.trim();

    if (email && pw) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                pw,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } 
        else {
            alert(response.statusText);
        }
    }
}

async function signUpFunction(event) {
    event.preventDefault();

    const userName = document.querySelector('#username-signUp').value.trim();
    const email = document.querySelector('#email-signUp').value.trim();
    const pw = document.querySelector('#pwSignUp').value.trim();

    if (userName && email && pw) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                userName,
                email,
                pw,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        } 
        else {
            alert(response.statusText);
        }
    }
}



document.querySelector('.loginFunction').addEventListener('submit', loginFunction);
document.querySelector('.signUpFunction').addEventListener('submit', signUpFunction);
const API_BASE_URL = 'http://localhost:8000/auth'; 

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = formatRegisterData()
    console.log(formData.get('name'),formData.get('email'),formData.get('password'));

    handleRegister(formData.get('name'), formData.get('email'), formData.get('password'))
})

function formatRegisterData() {
    const form = document.getElementById('register-form')

    const formData = new FormData(form)

    return formData
}

async function handleRegister(name, email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); 
            return true;
        } else {
            alert(`Erro no Cadastro: ${data.message}`);
            return false;
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        alert('Falha ao conectar com o servidor.');
        return false;
    }
}
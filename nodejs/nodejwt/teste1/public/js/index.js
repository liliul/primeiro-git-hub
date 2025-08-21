const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password-login');
const profileBtn = document.getElementById('profileBtn');
const adminBtn = document.getElementById('adminBtn');
const nokiaBtn = document.getElementById('nokiaBtn');
const createUserForm = document.getElementById('createUserForm');
const newUsernameInput = document.getElementById('newUsername');
const newRoleInput = document.getElementById('newRole');
const updateUserForm = document.getElementById('updateUserForm');
const updateUserIdInput = document.getElementById('updateUserId');
const updateUsernameInput = document.getElementById('updateUsername');
const updateRoleInput = document.getElementById('updateRole');
const deleteUserForm = document.getElementById('deleteUserForm');
const deleteUserIdInput = document.getElementById('deleteUserId');
const responseMessageDiv = document.getElementById('responseMessage');

let token = localStorage.getItem('jwtToken'); // Pega o token do localStorage

function displayMessage(message, isError = false) {
    responseMessageDiv.textContent = message;
    responseMessageDiv.classList.remove('hidden', 'error');
    if (isError) {
        responseMessageDiv.classList.add('error');
    } else {
        responseMessageDiv.classList.remove('error');
    }
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const passworld = passwordInput.value
    
    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, passworld }),
        });

        const data = await res.json();
        
        if (res.ok) {
            token = data.token;
            localStorage.setItem('jwtToken', token); // Armazena o token
            displayMessage('Login bem-sucedido! Token JWT armazenado.');
        } else {
            displayMessage(`Erro no login: ${data.message}`, true);
        }
    } catch (error) {
        displayMessage(`Erro na requisição de login: ${error.message}`, true);
    }
});

// Função genérica para fazer requisições com o JWT
async function makeAuthenticatedRequest(url, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`; // Adiciona o token ao cabeçalho
    } else {
        displayMessage('Nenhum token JWT encontrado. Faça o login primeiro.', true);
        return; // Impede a requisição se não houver token
    }

    try {
        const options = { method, headers };
        if (body) {
            options.body = JSON.stringify(body);
        }

        const res = await fetch(url, options);
        const data = await res.json();
        console.log('d',data);
        
        if (res.ok) {
            displayMessage(`Resposta de ${url}: ${JSON.stringify(data)}`);
        } else {
            displayMessage(`Erro ao acessar ${url}: ${data.message || res.statusText}`, true);
        }
    } catch (error) {
        displayMessage(`Erro na requisição para ${url}: ${error.message}`, true);
    }
}

profileBtn.addEventListener('click', () => {
    makeAuthenticatedRequest('/profile');
});

adminBtn.addEventListener('click', () => {
    makeAuthenticatedRequest('/admin');
});

nokiaBtn.addEventListener('click', () => {
    makeAuthenticatedRequest('/git');
});

createUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = newUsernameInput.value;
    const role = newRoleInput.value;
    await makeAuthenticatedRequest('/criarusuariologin/', 'POST', { username, role });
    newUsernameInput.value = ''; // Limpa o campo
    newRoleInput.value = '';     // Limpa o campo
});

updateUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = updateUserIdInput.value;
    const username = updateUsernameInput.value;
    const role = updateRoleInput.value;
    const body = {};
    if (username) body.username = username;
    if (role) body.role = role;
    
    await makeAuthenticatedRequest(`/login/${id}`, 'PUT', body);
    updateUserIdInput.value = '';
    updateUsernameInput.value = '';
    updateRoleInput.value = '';
});

deleteUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = deleteUserIdInput.value;
    await makeAuthenticatedRequest(`/login/${id}`, 'DELETE');
    deleteUserIdInput.value = '';
});
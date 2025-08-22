
async function gitUser(params, method = 'GET') {
    const url = await fetch(`${params}`, {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const git = await url.json()

    return git 
}

document.getElementById('html').addEventListener('click', async () => {
    document.querySelector('.container').innerHTML = ''
    const githubUser = await gitUser('git')
    console.log(githubUser);

    const article = document.createElement('article')

    article.innerHTML = `
        <h1>${githubUser.message.name}</h1>
        <h2>${githubUser.message.login}</h2>
    `
    document.querySelector('.container').appendChild(article)
})

document.getElementById('get').addEventListener('click', async () => {
    document.querySelector('.container').innerHTML = ''
    
    const githubUser = await gitUser('get')
    console.log(githubUser);

    githubUser.map((iten) => {
        const article = document.createElement('article')
        article.setAttribute('data-id', `${iten.id}`)
        article.innerHTML = `
            <h1>${iten.username}</h1>
            <h2>${iten.role}</h2>
        `
        document.querySelector('.container').appendChild(article)
    })
})
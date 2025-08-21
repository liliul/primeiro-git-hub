
async function gitUser() {
    const url = await fetch('/git', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const git = await url.json()

    return git 
}

document.getElementById('html').addEventListener('click', async () => {
    
    const githubUser = await gitUser()
    console.log(githubUser);

    const article = document.createElement('article')

    article.innerHTML = `
        <h1>${githubUser.message.name}</h1>
        <h2>${githubUser.message.login}</h2>
    `
    document.querySelector('.container').appendChild(article)
})
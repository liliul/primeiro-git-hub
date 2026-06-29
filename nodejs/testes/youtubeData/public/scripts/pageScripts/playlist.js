import { authFetch } from '../core/authFetch.js'

function ContainerPlaylistsFunction() {
    let playlistsCache = null;
    let currentView = "playlists";

    async function fetchPlaylists() {
        if (playlistsCache) {
        return playlistsCache;
        }

        const response = await authFetch("http://localhost:3001/ytlist")
        if (!response) return null
        const data = await response.json()
        
        playlistsCache = data;
        return data;
    }

    function renderPlaylists(playlists) {
        currentView = "playlists";

        const container = document.getElementById("videos");
        container.innerHTML = "";

        const playlistsLength = playlists.length
        const spanLength = document.createElement('span')
        spanLength.textContent = playlistsLength
        spanLength.className = 'p-length'
        container.appendChild(spanLength)

        playlists.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.playlistId = p.id;

        card.innerHTML = `
            <img src="${p.thumbnailList}" alt="${p.title}">
            <h3>${p.title}</h3>
            <button class="btn-playlist">Ver playlist</button>
        `;

        container.appendChild(card);
        });
    }

    function renderVideos(playlistId) {
        currentView = "videos";
        localStorage.setItem("view", currentView)

        const playlist = playlistsCache.find(p => p.id === playlistId);
        if (!playlist) return;

        const container = document.getElementById("videos");
        container.innerHTML = "";
        
        const videosLength = playlist?.videos?.length
        const spanLength = document.createElement('span')
        spanLength.textContent = videosLength
        spanLength.className = 'p-length'
        container.appendChild(spanLength)

        const backBtn = document.createElement("button");
        backBtn.textContent = "← Voltar";
        backBtn.className = 'b-volta'
        backBtn.onclick = () => renderPlaylists(playlistsCache);
        container.appendChild(backBtn);

        const playlistSemVideosErros = playlist.videos.filter(EvitandoVideosPrivateDeleted)

        playlistSemVideosErros.forEach(v => {
        if (!v.videoId) return;

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${v.thumbnail}" alt="${v.title}">
            <h3>${v.title}</h3>
            <a href="${v.url}" target="_blank">Assistir</a>
        `;

        container.appendChild(card);
        });
    }

    document.getElementById("videos").addEventListener("click", (e) => {
        if (!e.target.classList.contains("btn-playlist")) return;

        const playlistId = e.target.closest(".card").dataset.playlistId;
        renderVideos(playlistId);
    });

    fetchPlaylists().then(renderPlaylists);
}

function EvitandoVideosPrivateDeleted(item) {
    return (
        item.title !== "Private video" &&
        item.title !== "Deleted video" &&
        item.thumbnail
    )
}

ContainerPlaylistsFunction()
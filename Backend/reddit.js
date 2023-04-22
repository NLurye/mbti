// Listen for authorization grant message from background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'authorization_granted') {
        // Store access token in local storage
        localStorage.setItem('access_token', request.access_token);

        // Enable the get posts button
        document.getElementById('get-posts-button').disabled = false;
    }
});

// Listen for get posts button click event
document.getElementById('get-posts-button').addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://oauth.reddit.com/user/me/posts', true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);
            // Display the posts in the UI
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = '';
            response.data.children.forEach(function(post) {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                const titleElement = document.createElement('h2');
                titleElement.textContent = post.data.title;
                const thumbnailElement = document.createElement('img');
                thumbnailElement.src = post.data.thumbnail;
                postElement.appendChild(titleElement);
                postElement.appendChild(thumbnailElement);
                postsContainer.appendChild(postElement);
            });
        }
    };
    xhr.send();
});

// Use the PRAW library to authenticate with the Reddit API using the stored access token and refresh token
const access_token = localStorage.getItem('access_token');
const refresh_token = localStorage.getItem('refresh_token');
const praw = new window.PRAW({
    client_id: 'dnj9y7yTTST0-ENzKLj_sw',
    client_secret: 'lx1RwXlqNdXgReFzkq4dAEQo5Nb6SQ',
    access_token: access_token,
    refresh_token: refresh_token,
});

// Use the PRAW library to retrieve the posts from the authenticated user's Reddit profile
praw.get('/api/v1/me/posts', function(data) {
    // The data variable contains the list of posts
    console.log(data);
});

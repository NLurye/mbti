import praw

reddit = praw.Reddit(
    client_id="dnj9y7yTTST0-ENzKLj_sw",
    client_secret="lx1RwXlqNdXgReFzkq4dAEQo5Nb6SQ",
    redirect_uri="http://localhost:80/whoMBTI/reddit-callback.html",
    access_token="YOUR_ACCESS_TOKEN",
    user_agent="web:com.example.whoMBTI:v1.0.0 (by /u/kozo315)"
)

# Fetch the user's posts
user = reddit.user.me()
posts = user.posts.new(limit=10)

# Print the post titles
for post in posts:
    print(post.title)
import requests
import json
import os
import re
import urllib.parse
from datetime import datetime, timezone

# API URLs
TITLE_API = "https://llama2.maxim-e72.workers.dev/"
CONTENT_API = "https://floral-field-smrtai.maxim-e72.workers.dev/?theme={}"

# Paths
ARTICLES_DIR = "/var/www/posts"
ARTICLES_FILE = f"{ARTICLES_DIR}/articles.json"

def generate_slug(title):
    """Generates an SEO-friendly slug from the title."""
    slug = re.sub(r"[^\w\s-]", "", title)  # Remove special characters
    slug = re.sub(r"\s+", "-", slug.strip())  # Replace spaces with hyphens
    return slug.lower()

def fetch_title():
    """Fetches a new blog title from the API."""
    response = requests.get(TITLE_API)
    if response.status_code == 200:
        data = response.json()
        raw_title = data.get("post", {}).get("response", "").strip()
        if raw_title:
            return raw_title
    return None

def fetch_full_article(title):
    """Fetches the full blog post using the title as a query."""
    encoded_title = urllib.parse.quote(title)  # URL encode title
    response = requests.get(CONTENT_API.format(encoded_title))
    if response.status_code == 200:
        data = response.json()
        return data.get("post", {}).get("response", "").strip()
    return None

def update_articles():
    """Fetches a new article and updates articles.json."""
    title = fetch_title()
    if not title:
        print("Failed to fetch title")
        return

    content = fetch_full_article(title)
    if not content:
        print(f"Failed to fetch article for: {title}")
        return

    new_article = {
        "title": title,
        "slug": generate_slug(title),
        "content": content,
	"timestamp": datetime.now(timezone.utc).isoformat()
    }

    # Ensure directory exists
    os.makedirs(ARTICLES_DIR, exist_ok=True)

    # Load existing articles
    if os.path.exists(ARTICLES_FILE):
        with open(ARTICLES_FILE, "r") as f:
            articles = json.load(f)
    else:
        articles = []

    # Check for duplicates
    existing_slugs = {article["slug"] for article in articles}
    if new_article["slug"] in existing_slugs:
        print(f"Article already exists: {new_article['title']}, skipping update.")
        return

    # Append new article
    articles.append(new_article)

    # Save updated articles
    with open(ARTICLES_FILE, "w") as f:
        json.dump(articles, f, indent=4)

    print(f"Added new article: {new_article['title']}")

if __name__ == "__main__":
    update_articles()

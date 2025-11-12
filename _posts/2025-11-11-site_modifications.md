---
layout: post
title: My customizations to al-folio template
date: 2025-11-11 19:10:00
description: Some notes on the changes I made to al-folio's base template. 
tags: HTML CSS code website github-pages
categories: coding
---
I learned how to modify the al-folio by looking at what other have done before. The examples of `Academics` websites linked on the repository's <a href="https://github.com/alshedivat/al-folio/tree/main#:~:text=sending%20a%20PR.-,Academics,-%E2%98%85%20%E2%98%85%20%E2%98%85" target="_blank">README</a> was very helpful.     

In case someone out there is reading, below are some notes on some things I have done in case you wanted to replicate.  

Note: I am NOT an expert in CSS/HTML. Everything I did was trial and error. If you intend on making the same modifications, please proceed with caution!  

# HTML Element Modifications 
## Table Modifications  
Original Code: 
````markdown
table {

  td,
  th {
    font-size: 1rem;
    padding: 1px 1rem 1px 0;
  }

  th {
    font-weight: bold;
  }
}
````

Modifications: 
````markdown
table {
  display: table;
  width: 100%;
  border-collapse: collapse;

  th, 
  td {
    font-size: 1rem;
    padding: 0.1rem 0.05rem;     // top/bottom and left/right 
    background-color: $white-color;      // white background
    border: 1px solid $black-color;  // border around cells 
  }

  th {
    font-weight: bold;
  }

  tbody tr:last-of-type {
    td {
      padding-bottom: 1rem;      // extra space at bottom of table
    }
}
````

# Project Page Modifications 
To create the "Interest" page, I modified the `_pages/projects.md` file.  

## 1. Editing Categories Headers.  
I wanted to make the following edits to categories headers: left align text, change text color, and bold text.   

Project title in `_pages/projects.md` defined in `<h2 class="category">{{ category }}</h2>`. Original code for `category` in `_sass/_base.scss` file:  
````markdown
h2.category {
    color: var(--global-divider-color);
    border-bottom: 1px solid var(--global-divider-color);
    padding-top: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    text-align: right;
}
````

Edited code:  
````markdown
h2.category {
    color: var(--global-text-color);
    border-bottom: 1px solid var(--global-divider-color);
    padding-top: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    text-align: left;
    font-weight: bold;
}
````

## 2. Editing Project Cards.  
Project cards are generated from `_include/projects.liquid`, which calls classes: `card-body`, `card-title`, and `card-text`, which are defined in `_sass/_base.scss`.  

I wanted to make the following edits to project cards: smaller `card-title` font size, less padding in the card. 

````markdown
// original 
.card {
  background-color: var(--global-card-bg-color);

  .card-img {
    width: 100%;
    padding-top: 1.25rem;
  }

  .card-title {
    color: var(--global-text-color);
  }

  .card-body {
    padding: 1.25rem 1.25rem 1.25rem 1.25rem;
  }
}

// edited 
.card {
  background-color: var(--global-card-bg-color);

  .card-img {
    width: 100%;
    padding-top: 0.5rem;
  }

  .card-title {
    color: var(--global-text-color);
    font-size: 1rem; // smaller than default
  }

  .card-body {
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  }
}
````

## 3. Creating CSS class to format guitar tabs.  
Guitar tabs are best shown in mono-spaced fonts, therefore the built in code block was very helpful. However, I wanted additional modifications such as decreased. Therefore, I created a custom class, added to the bottom of the `_sass/_base.scss` file. 
````markdown
// My cysome code block class - for guitar tabs
.guitar-tabs {
  font-size: 0.5rem; // font size half the default 
  font-weight: bold; // bolded the letters (instead of thin/normal)
  letter-spacing: -1px; // spacing between letters 
  line-height: 0.75; //spacing between lines      
  font-family: monospace; // monospace font
  color: $black-color; // optional text color
  background-color: $code-bg-color-light; // white background
  padding: 0.25rem 0.25rem 0.25rem 0.25rem; // optional: add some padding for better readability
  border-radius: 4px; // slightly rounded corners
}
````

To use this class: 
````markdown
Artist Name - Song Name Guitar Tabs: 

<pre class="guitar-tabs">
E |---guitar-tabs-here----|
<pre/>
````


# Blog Page Modifications  
## 1. Editing the main blog page  
- In the `_config.yml` file, I removed the blog_name. 
- I removed the block of code that generates the tags at the top: 
{% raw %}
  ````markdown
  {% if site.display_tags and site.display_tags.size > 0 or site.display_categories and site.display_categories.size > 0 %}

    <div class="tag-category-list">
      <ul class="p-0 m-0">
        {% for tag in site.display_tags %}
          <li>
            <i class="fa-solid fa-hashtag fa-sm"></i> <a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}">{{ tag }}</a>
          </li>
          {% unless forloop.last %}
            <p>&bull;</p>
          {% endunless %}
        {% endfor %}
        {% if site.display_categories.size > 0 and site.display_tags.size > 0 %}
          <p>&bull;</p>
        {% endif %}
        {% for category in site.display_categories %}
          <li>
            <i class="fa-solid fa-tag fa-sm"></i> <a href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}">{{ category }}</a>
          </li>
          {% unless forloop.last %}
            <p>&bull;</p>
          {% endunless %}
        {% endfor %}
      </ul>
    </div>
    {% endif %}

  ````
{% endraw %}

- I removed the featured post section: 
{% raw %}
  ````markdown
  {% assign featured_posts = site.posts | where: "featured", "true" %}
  {% if featured_posts.size > 0 %}
  <br>

  <div class="container featured-posts">
  {% assign is_even = featured_posts.size | modulo: 2 %}
  <div class="row row-cols-{% if featured_posts.size <= 2 or is_even == 0 %}2{% else %}3{% endif %}">
  {% for post in featured_posts %}
  <div class="col mb-4">
  <a href="{{ post.url | relative_url }}">
  <div class="card hoverable">
  <div class="row g-0">
  <div class="col-md-12">
  <div class="card-body">
  <div class="float-right">
  <i class="fa-solid fa-thumbtack fa-xs"></i>
  </div>
  <h3 class="card-title text-lowercase">{{ post.title }}</h3>
  <p class="card-text">{{ post.description }}</p>

                      {% if post.external_source == blank %}
                        {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
                      {% else %}
                        {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
                      {% endif %}
                      {% assign year = post.date | date: "%Y" %}

                      <p class="post-meta">
                        {{ read_time }} min read &nbsp; &middot; &nbsp;
                        <a href="{{ year | prepend: '/blog/' | relative_url }}">
                          <i class="fa-solid fa-calendar fa-sm"></i> {{ year }} </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        {% endfor %}
        </div>
      </div>
      <hr>

  {% endif %}
  ````
{% endraw %}

- Removed read time
{% raw %}
  ````markdown
    {% if post.external_source == blank %}
      {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
    {% else %}
      {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
    {% endif %}

      <p class="post-meta">
        {{ read_time }} min read &nbsp; &middot; &nbsp;
        {{ post.date | date: '%B %d, %Y' }}
        {% if post.external_source %}
        &nbsp; &middot; &nbsp; {{ post.external_source }}
        {% endif %}
      </p>
  ````
{% endraw %}
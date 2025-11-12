---
layout: post
title: al-folio Customizations
date: 2015-07-15 15:09:00
description: an example of a blog post with some code
tags: HTML CSS code website github-pages
categories: coding
---

Note: I am NOT an expert in CSS/HTML, in fact I have very limited experience. Everything I did was trial and error. Proceed with caution!  

# Project Page Modifications  
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

## 1. Editing Project Cards.  
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
    padding-top: 1rem;
  }

  .card-title {
    color: var(--global-text-color);
    font-size: 1rem; // smaller than default
  }

  .card-body {
    padding: 1rem 1rem 1rem 1rem;
  }
}
````
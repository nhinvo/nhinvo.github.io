---
layout: post
title: My customizations to the al-folio template
date: 2025-11-11 19:10:00
description: Some notes on the changes I made to al-folio's base template. 
tags: HTML CSS code website github-pages
categories: coding
---
{% raw %}
I learned how to modify the al-folio by looking at what others have done before. The example websites linked on the repository's <a href="https://github.com/alshedivat/al-folio/tree/main#:~:text=sending%20a%20PR.-,Academics,-%E2%98%85%20%E2%98%85%20%E2%98%85" target="_blank">README</a> was very helpful.     

In case someone out there is reading, below are notes on some (not all) things I have modified in case you wanted to replicate. Note: I am NOT an expert in CSS/HTML. Everything I did was trial and error. If you intend on making the same modifications, please proceed with caution!  

<h2>About/Home Page</h2>
<h3>Selected Publication Modifications</h3>  
I wanted to make the following changes to the "Selected Publication" section of the About page: 
  - Change the header title "Selected Publications" to "Publications".
  - Remove the hyperlink to the "Publications" page, as I don't have a dedicated "Publications" page on my website. 
  - Be able to link to this section in the description above using html name. Based on <a href="https://stackoverflow.com/questions/2822089/how-to-link-to-part-of-the-same-document-in-markdown" target="_blank">this</a> stack overflow thread.  

How I achieved this:  
- Edited `_layouts/about.liquid` code: 
  ````markdown
  <a name="publications" style="color: inherit">Publications</a>
  ````
- Original `_layouts/about.liquid` code: 
  ````markdown
  <a href="{{ '/publications/' | relative_url }}" style="color: inherit">selected publications</a>
  ````

## CV Page
### Automated Publicated Section 
Currently (as of 11/12/2025), I could not find how to include publications from the `_bibliography/papers.bib` file. Example `` and `` seem to have manual entries. I wanted to add a "Publications" section into my "CV" page, but using the same format as the "Publications" page. 
  - To automate adding publication section to CV, add the following code block in file `_layouts/cv.liquid` after the `<div>` block in the loop `{% for entry in site.data.cv %}` (i.e. after line 50): 
    ````markdown
    {% if entry.title == 'Experience' %}
      <a class="anchor" id="Publications"></a>
      <div class="card mt-3 p-3">
        <h3 class="card-title font-weight-medium">Publications</h3>
        <div>
          {% include selected_papers.liquid %}
        </div>
      </div>
    {% endif %}
    ````
    - I wanted this "Publications" section to be after the "Experience" section, which is why I added the if condition into the loop. 
      - Originally, I had the "Publications" section at the end of the CV, outside of the for loop without the `if entry.title == 'Experience'` statement. 


### Interest Page 
To create the "Interest" page, I modified the `_pages/projects.md` file.  

#### Editing Category Headers  
I wanted to make the following edits to category headers (i.e. "Art" and "Guitar Tabs"): 
- Left align text
- Change text color
- Bold text

How I edited this: 
- Edited code in `_sass/_base.scss` file: 
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
  - `_pages/projects.md` file defined project title/header in this line `<h2 class="category">{{ category }}</h2>`. Then I found that `category` was defined in `_base.scss`.

- Original code block: 
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

#### Editing Project Cards  
I wanted to make the following edits to project cards: 
- Smaller `card-title` font size.  
- Less padding in the card. 

How to achieve: 
- Project cards are generated from `_include/projects.liquid`, which calls classes: `card-body`, `card-title`, and `card-text`, which are defined in `_sass/_base.scss`.  
- Therefore this section was edited: 
  ````markdown
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

- Original code block: 
  ````markdown
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
  ````

#### Creating CSS class to format guitar tabs  
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


### Blog Page Modifications  
#### Editing the main blog page  
- In the `_config.yml` file, I removed the blog_name. 
- I removed the block of code that generates the tags at the top: 
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

- I removed the featured post section: 
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

- Removed read time
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
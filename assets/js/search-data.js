// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "Home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-github-repo",
          title: "Github Repo",
          description: "My GitHub repositories.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-interests",
          title: "Interests",
          description: "Where I store my art and guitar tabs.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/interests/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-die-spitz-guitar-tabs",
          title: 'Die Spitz Guitar Tabs',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/die_spitz/";
            },},{id: "projects-gel-guitar-tabs",
          title: 'GEL Guitar Tabs',
          description: "rip gel",
          section: "Projects",handler: () => {
              window.location.href = "/projects/gel/";
            },},{id: "projects-momma-guitar-tabs",
          title: 'Momma Guitar Tabs',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/momma/";
            },},{id: "projects-thee-oh-sees-osees-guitar-tabs",
          title: 'Thee Oh Sees (Osees) Guitar Tabs',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/osees/";
            },},{id: "projects-other-artists-guitar-tabs",
          title: 'Other Artists - Guitar Tabs',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/other_artists/";
            },},{id: "projects-scowl-guitar-tabs",
          title: 'Scowl Guitar Tabs',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/scowl/";
            },},{id: "projects-the-breeders-guitar-tabs",
          title: 'The Breeders Guitar Tabs',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/the_breeders/";
            },},{id: "projects-the-chats-guitar-tabs",
          title: 'The Chats Guitar Tabs',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/the_chats/";
            },},{id: "projects-tuning-cheat-sheet",
          title: 'Tuning Cheat Sheet',
          description: "Tunings of songs I like to play.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/tuning_cheatsheet/";
            },},{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/nhinvo", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/nhinvo", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=smAGAToAAAAJ&hl", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];

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
        },{id: "nav-blogs",
          title: "Blogs",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-useful-slurm-hpc-things",
        
          title: "Useful SLURM/HPC Things",
        
        description: "an example of a blog post with some code",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/useful_slurm/";
          
        },
      },{id: "post-useful-things-for-bioinformatics",
        
          title: "Useful things for Bioinformatics",
        
        description: "an example of a blog post with some code",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/useful_bioinformatics/";
          
        },
      },{id: "post-useful-bashrc-things",
        
          title: "Useful .bashrc Things",
        
        description: "an example of a blog post with some code",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/useful_bashrc/";
          
        },
      },{id: "post-al-folio-customizations",
        
          title: "al-folio Customizations",
        
        description: "an example of a blog post with some code",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/site_modifications/";
          
        },
      },{id: "projects-die-spitz-guitar-tabs",
          title: 'Die Spitz Guitar Tabs',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/die_spitz/";
            },},{id: "projects-gel-guitar-tabs",
          title: 'GEL Guitar Tabs',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/gel/";
            },},{id: "projects-momma-guitar-tabs",
          title: 'Momma Guitar Tabs',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/momma/";
            },},{id: "projects-arts-amp-crafts",
          title: 'Arts &amp;amp; Crafts',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/my-art/";
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
      },];

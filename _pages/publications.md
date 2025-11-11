---
layout: page
permalink: /publications/
title: Publications
description: "* denotes equal contribution"
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<div class="publications">

<h2>Peer-reviewed Articles</h2>
{% bibliography -f papers -q @article %}

<h2>Accepted</h2>
{% bibliography -f papers -q @accepted %}

<h2>Under Review</h2>
{% bibliography -f papers -q @unpublished %}

</div>

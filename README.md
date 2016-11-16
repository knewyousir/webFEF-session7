#Foundations Class 7 Files

The CSS

```html
<link rel="stylesheet" type="text/css" href="styles/base.css" >
```

And import the print.css into it on the first line:

```css
@import url(reset.css);
@import url(print.css) print;
```

Branding and Introduction

in base.css

```css
h1 {
	max-width: 940px;
	height: 88px;
	margin: 6px auto 0 auto;
	font-size:48px;
}
.content-introduction {
	max-width: 940px;
	margin: 6px auto 26px auto;
	padding-top: 20px;
	border-top: 3px double #dbd1b5;
}
.content-introduction p {
	text-transform: uppercase;
	line-height: 1.1;
	color: #666;
}
```

[First child](http://www.quirksmode.org/css/firstchild.html) - select an element that is the first or last child of its parent

```css
.content-introduction p:first-child {
	margin-bottom: 12px;
	font-size: 26px;
}
.content-introduction p:last-child {
	font-size: 14px;
}
```

##SASS

[Syntactically Awesome Style Sheets](https://sass-lang.com) - takes sass files and converts (compiles) them into css. sass [adds features](http://sass-lang.com/guide) to css.

###Free Options
(Note - on OSX you may need to right click and choose open rather than double click in order to run these.)

[Koala](http://koala-app.coms)
[Scout app](https://github.com/scout-app/scout-app/)

Rename base.css to base.scss
Rename reset.css to _reset.scss
Rename print.css to _print.scss

###Imports

Compare

```css
@import url(print.css) print
```

```css
@import 'reset';
```

###Variables

```css
$link: #4e7c92;
```

rename reset and use imports

```
@import 'reset'; 
sample mixin (optional)
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}
$radius: 10px;
```

recast the content introduction

```css
.content-introduction {
	max-width: 940px;
	margin: 6px auto 26px auto;
	padding-top: 20px;
	border-top: 3px double #dbd1b5;
	
	p {
		text-transform: uppercase;
		line-height: 1.1;
		color: #666;
	}

	p:first-child {
		margin-bottom: 12px;
		font-size: 26px;
	}

	p:last-child {
		font-size: 14px;
	}
}
```

The Responsive Main Nav

```html
<nav>
	<ul>
		<li><a href="#one">Intro</a></li>
		<li><a href="#two">Summary</a></li>
		<li><a href="#three">Skills</a></li>
		<li><a href="#four">Experience</a></li>
		<li><a href="#five">Education</a></li>
		<li><a href="#six">Contact</a></li>
	</ul>
	<a href="#" id="pull">Menu</a>
</nav>
```

micro clearfix

```css
.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}
.clearfix:after {
    clear: both;
}
.clearfix {
    *zoom: 1;
}
```

Add to the nav and ul

```html
<nav class="clearfix">
	<ul class="clearfix">
```

Base nav CSS

Create a sass partial _navigation.scss and import it into the base.css ( @import 'navigation';  ).

this is the wide screen version

```css
/* Navigation */
nav {
	height: 40px;
	width: 100%;
	background: $link;
	font-size: 0.85rem;
	position: fixed;
	top: 0;
}
nav ul {
	padding: 0;
	margin: 0;
	height: 40px;
}
nav li {
	display: inline;
	float: left;
}
nav a {
	color: #fff;
	display: inline-block;
	text-align: center;
	text-decoration: none;
	padding:9px 12px;
	text-shadow: none;
}
nav a#pull {
	display: none;
}
```

this is the small screen version. 

small screen

```css
@media screen and (max-width: $breakpoint) {
	nav {
		height: auto;
		border-bottom: 0;
	}
	nav ul {
		display: none;
		height: auto;
	}	
	nav li {
		width: 100%;
		float: left;
		position: relative;
		border-bottom: 1px solid #262626;
  	}

  	nav a {
	  	text-align: left;
	  	width: 100%;
	  	text-indent: 25px;
			background: #2e2e2e;	  	
  	}  	
  	nav a:hover {
	  	background:#444;
  	}
  	  		
	nav a#pull {
		display: block;
		background-color: $link;
		width: 100%;
		position: relative;
	}
	nav a#pull:after {
		content:"";
		background: url(../img/nav-icon.png) no-repeat;
		width: 60px;
		height: 30px;
		color: #fff;
		display: inline-block;
		position: absolute;
		right: 15px;
		top: 10px;
	}
}
```

add jQuery at the bottom of the page before the closing of the body

```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
```

create script version 1

```js
var menu = $('nav ul');

$('#pull').on('click', function() {
  menu.slideToggle();
  return false;
});
// this removes jQuery’s inline styling
$(window).resize(function(){
  var w = $(this).width();
  console.log(w);
  if(w > 800 && menu.is(':hidden')) {
    menu.removeAttr('style');
    console.log('done');
  }
});
// this art closes the menu when clicked 
$('li').on('click', function(e) {       
  var w = $(window).width();
  if(w < 800 ) {
    menu.slideToggle();
  }
});
```

see .is() in jQuery http://api.jquery.com/is/

see hidden selector: http://api.jquery.com/hidden-selector/

Add padding to the top of the H1 to account for the nav position static

might be nice to center the nav when in wide screen mode

```css
nav ul { 
	padding: 0; 
	margin: 0; 
	height: 40px; 
	max-width: $max-width; 
	margin: 0 auto;
}
```

also to have the nav unfurl leaving the hamburger on the top

```html
<nav class="clearfix">
  <a href="#" id="pull">Menu</a>
  <ul class="clearfix">
    <li><a href="#one">Intro</a></li>
    <li><a href="#two">Summary</a></li>
    <li><a href="#three">Link Three</a></li>
    <li><a href="#four">Link Four</a></li>
    <li><a href="#five">Link Five</a></li>
    <li><a href="#six">Contact</a></li>
  </ul>
</nav>
```

Content (effects multiple regions - re-examine the DOM)

```css
.content {
	max-width: 940px;
	margin: 0 auto;
	padding-bottom: 1.5em;
}
.content-main {
 	box-sizing: border-box;
	float: left;
	width: 60%;
	padding-right: 24px;
}
.content-sub {
	float: right;
	width: 40%;
}
```

if we want to check for mobile first design

```css
	@media (max-width: $breakpoint) {
		* {
			color: red !important;
		}
	}
```

vs

```css
	@media (max-width: $breakpoint) {
		* {
			color: red !important;
		}
	}
```

create a second breakpoint

```css
$breakpoint-med: 768px;
```

apply this to medium screen sizes and above only

```css
@media (min-width: $breakpoint-med) {
	.content {
		max-width: 940px;
		margin: 0 auto;
		padding-bottom: 1.5em;
	}
	.content-main {
		box-sizing: border-box;
		float: left;
		width: 60%;
		padding-right: 24px;
	}
	.content-sub {
		float: right;
		width: 40%;
	}
}
```

Box sizing - the universal approach:

```css
*, *:before, *:after {
  box-sizing: inherit;
}
html {
  box-sizing: border-box;
}
```

The Secondary div

```css
.secondary {
	background:#f8f7f3;
	border:1px solid #bfbfbf;
	padding:1em;
}
```

Add the clearfix to the content and secondary divs

iFrame needs to expand. Note the inline width and height parameters.

```css
iframe {
  width: 100%;
}
```

Video Switcher - JavaScript

Add the active class for the first iframe link

```css
.btn-list {
	padding: 6px;
	.active { 
		background: #87a3af;
		text-shadow: none; 
		color: #fff;
	}
}
```

Add the JavaScript

```js
$('.content-video a').on('click',function(){
	$('.content-video a').removeClass('active');
	$(this).addClass('active');
	var videoToPlay = $(this).attr('href');
	$('iframe').attr('src',videoToPlay);
	console.log(videoToPlay);
	return false;
 });
 ```

Format the video buttons

```css
.btn-list {
	padding: 6px;
	li {
		display: inline-block;
		margin-right:1.5rem;
		margin-bottom:1rem;
	}
	.active { 
		background: #87a3af;
		text-shadow: none; 
		color: #fff;
		padding: 0.25rem;
	}
}
```

The Footer (note the need for border-box)

```css
.footer {
	margin-top: 40px;
	background-color: $link;
	min-height: 320px;
	.siteinfo {
		max-width: $max-width;
		margin: 0 auto;
		color: #fff;
		text-shadow: none;
		p, ul, .vcard {
			width: 33%;
			padding: 20px;
			float: left;
		}
	}
	.siteinfo a {
		color: #fff;
	}
}
```

Nav Sub

Integrate the JavaScript for nav-sub into the layout.

```css
.nav-sub {  
	margin-top: 16px;
	padding: 20px;
	background-color: #f8f7f3;
	border: 1px solid #bfbfbf;

	li { margin:6px 0;}
	ul {display:none;}
	li:first-child ul {display:block;}
	> li > a { font-weight:bold; }
	ul li {padding-left:12px;}
}
```

Accordion for Nav Sub

```js
	$('.nav-sub>li a').on('click tap', function(){
		$('.nav-sub ul').slideUp();
		$(this).next().slideToggle();
  		console.log(this);
		return false;
	});
```

Examine the image & the dom, the panels need the same treatment as .nav-sub

```css
.nav-sub, .content-sub .panel {
...
}
```

Rounded Corners

Add to rounded corners - multiple selectors

```css
.nav-collapse, .nav-sub, .content-sub .panel {
	border-radius: 10px;
}
```

Small Images

```
.secondary .content-sub {
	li {
		float: left;
		width: 33.333%;
		padding: 10px;
	}
	li img {
		padding: 10px;
		background-color: #fff;
		border: 1px solid #bfbfbf;
		border-bottom-color: #7c7c7a;
		width: 100%;
		height: auto;
	}
}
```

Color & Scale Transition

```css
li img {
...
  	transition: all 0.2s linear;
}
li img:hover {
  transform: scale(1.1);
  box-shadow: 1px 1px 1px rgba(0,0,0,0.4);
}
```

Content Slider - examine image

```css
.content-slider {
	position: relative;
	p {
		padding: 6px;
		background: rgba(255,255,255,0.7);
		position: absolute;
		bottom: 0;
	}
}
```

Image Carousel - JavaScript

change the # links to point to high res images

```js
$('.image-tn a').on('click tap', function(){
    var imgsrc = $(this).attr('href');
    var titleText = $(this).find('img').attr('title');
    $('.content-slider > img').attr('src',imgsrc);
    $('.caption').html(titleText);
    return false;
});
```

hide the h2 and p in small screen view!

The Headers

```css
h2 {
	margin-bottom: 12px;
	padding-bottom: 6px;
	font-size: 24px;
	letter-spacing: -1px;
}

h3, h4 {
	font-size: 16px;
	line-height: 1.25;
	margin-bottom: 20px;
}
- effects the panels
h2 + h3 {
	margin-bottom: 7px;
}
```

Content Main > henry - Latest News

```css
.hentry {
  position: relative;
  float: left;
  width: 50%;
}
```

The little date area

```css
.hentry {
	position: relative;
	float: left;
	width: 50%;
	padding: 1rem;
	.published {
		position: absolute;
		top: 250px;
		left: 1rem;
		display: block;
		width: 50px;
		padding: 5px 10px;
		background-color: $link;
		font-size: 10px;
		text-align: center;
		text-transform: uppercase;
		color: #fff;
	}
	.day {
		font-size: 20px;
	}
	h4 {
		margin: 0 0 10px 60px;
		font-size: 20px;
	}
	p {
		margin-left: 60px;
	}
}
```

attribute selectors

```css
a[rel="alternate"] {
	padding-left: 20px;
	background: url(img/a-rss.png) no-repeat 0 50%;
}
```

with svg

```css
a[rel="alternate"] {
	padding-left: 20px;
	background: url(../img/feed-icon.svg) no-repeat 0 50%;
	-webkit-background-size: contain;
    background-size: contain;
}
```

Additional Tweaks for Mobile (need to test on phone)

the tap event in JS

```js
$('.image-tn a').on('click tap', function(){
    var imgsrc = $(this).attr('href');
    var titleText = $(this).find('img').attr('title');
    $('.content-slider > img').attr('src',imgsrc);
    $('.caption').html(titleText);
    return false;
});
```

the z-index for images and navbar

```css
nav {
	height: 40px;
	width:100%;
	background: $link;
	font-size: 1rem;
	position: fixed;
	z-index: 20;
	top: 0;
```

media queries for transform effects (on hover)

```css
.secondary .content-sub {
	li {
		float: left;
		width: 33.333%;
		padding: 10px;
	}

	li img {
		padding: 10px;
		background-color: #fff;
		border: 1px solid #bfbfbf;
		border-bottom-color: #7c7c7a;
		width: 100%;
		height: auto;
		@media (min-width: $breakpoint-med){
			transition: all 0.2s linear;
			&:hover {
				-webkit-transform: scale(1.1);
				transform: scale(1.1);
				box-shadow: 1px 1px 4px rgba(0,0,0,0.4);
			}
		}
	}
}
```

Basic print styles

```css
 * { background: transparent !important; color: black !important;  } 
  a, a:visited { color: #444 !important; text-decoration: underline; }
  a[href]:after { content: " (" attr(href) ")"; }
  abbr[title]:after { content: " (" attr(title) ")"; }
  tr, img { page-break-inside: avoid; }
  p, h2, h3 { orphans: 3; widows: 3; }
  h2, h3{ page-break-after: avoid; }
```

add to media query:

```css
@media print { 	
}
```

run a test print


###Homework
Continue to work on your final projects

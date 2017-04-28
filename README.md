# Foundations Session 7 

## Homework

1. Install [GIT](https://git-scm.com) on your laptop
2. Carefully follow the tutorial on [Gituhub](https://try.github.io/levels/1/challenges/1)
3. Create an account on [Github](https://github.com)

1. Review the process used to set up this project and continue to add JavaScript for the video player.

![image](wide.png)
![image](mobile.png)




## Tooling

```
$ cd <session7>
$ npm init -y
$ npm install browser-sync node-sass concurrently --save-dev
```

Package.json scripts (similar to last week's):

```
  "scripts": {
    "sassy": "node-sass --watch sass --output app/css --source-map true",
    "start": "browser-sync start --server 'app' --files 'app'",
    "boom!": "concurrently \"npm run start\" \"npm run sassy\" "
  },
```

`$ npm run boom!`


## CSS

Branding and Introduction. 

Clean up the old html.

in base.css

```css
header {
	max-width: 940px;
}

header h1 {
	font-size: 3rem;
}
header p {
	font-size: 1.5rem;
	max-width: 940px;
	text-transform: uppercase;
	line-height: 1.1;
	margin-bottom: 1rem;
}
header h1 + p {
	padding-top: 1rem;
	border-top: 3px double #dbd1b5;
}
header p + p {
	font-size: 1rem;
	line-height: 1.1;
	color: #666;
}
```

## SASS

[Syntactically Awesome Style Sheets](https://sass-lang.com) - takes sass files and converts (compiles) them into css. sass [adds features](http://sass-lang.com/guide) to css.


### Free Options
(Note - on OSX you may need to right click and choose open rather than double click in order to run these.)

[Koala](http://koala-app.coms)
[Scout app](https://github.com/scout-app/scout-app/)

For Scout the setup includes creating and input folder for sass and an output folder for css.

Save base.css to sass/imports/_header.scss
Save reset.css to sass/imports/_reset.scss

Create styles.scss and import both the above.


### Nesting

Refactor the header.

```css
header {
	h1 {
		font-size: 3rem;
	}
	p {
		font-size: 1.5rem;
		max-width: 940px;
		text-transform: uppercase;
		line-height: 1.1;
		margin-bottom: 1rem;
	}
	h1 + p {
		padding-top: 1rem;
		border-top: 3px double #dbd1b5;
	}
	p + p {
		font-size: 1rem;
		line-height: 1.1;
		color: #666;
	}
}
```

### Media Query - Mobile First

Add a media query to hide the paragraphs on small screens.

_header.scss:

```
	p {
		font-size: 1.5rem;
		max-width: 940px;
		text-transform: uppercase;
		line-height: 1.1;
		margin-bottom: 1rem;
		@media (max-width: 480px){
			display: none;
		}
	}
```

Note: this is NOT a mobile first design pattern. It uses max-width to add display attributes to small screens.

Change it to use mobile first design pattern:

```
	p {
		display: none;
		@media (min-width: 480px){
			display: block;
			font-size: 1.5rem;
			max-width: 940px;
			text-transform: uppercase;
			line-height: 1.1;
			margin-bottom: 1rem;
		}
	}
```

### Variables

Add to _variables.scss to imports with:

```
//variables

$max-width: 940px;

$link: #4e7c92;
$hover: #df3030;
$text: #333;

$med-gray: #666;
$light-gray: #ddd;
$dk-yellow: #dbd1b5;
```

Add breakpoint variables in _variables.scss for 480px and 768px.

```
$break-sm: 480px;
$break-med: 768px;
```

Apply the color and max-width variables in _header.scss.


Note the map file.

- maps the css line numbers to the scss line numbers
- note the line numbers in the elements inspector


## Responsive Main Nav

Tidy up the old HTML and add a link `<a href="#" id="pull">Menu</a>` to show the menu on small screens:

```
<nav>
	<a href="#" id="pull">Menu</a>
	<ul>
		<li><a href="#one">Intro</a></li>
		<li><a href="#two">Summary</a></li>
		<li><a href="#three">Skills</a></li>
		<li><a href="#four">Experience</a></li>
		<li><a href="#five">Education</a></li>
		<li><a href="#six">Contact</a></li>
	</ul>
</nav>
```

Create a sass partial `_navigation.scss` and import it into `styles.css` with `@import 'imports/navigation';`.

Small screen - hide the navigation

```
nav {

	ul {
		display: none;
	}
	li {
		padding: 4px 2px 4px 8px;
		border-bottom: 1px solid rgba(255,255,255,0.25);
	}
}
```

Show and format the link:

```

	a#pull {
		display: block;
		background-color: $link;
		height: 32px;
		padding-top: 12px;
		padding-left: 12px;
	}

	a#pull:after {
		content:"";
		background: url(../img/nav-icon.png) no-repeat;
		background-size: cover; 
		width: 22px;
		height: 22px;
		color: #fff;
		display: inline-block;
	}
}

```

Remove the text element on the #pull.


### Large Screen

Add media queries for medium and larger screens

Hide the hamburger on wider screens:

```
a#pull {
	display: block;
	background-color: $link;
	height: 32px;
	padding-top: 12px;
	padding-left: 12px;
	@media (min-width: $break-sm) {
		display: none;
	}
}
```

Show the navigation:

```
	ul {
		display: none;
		background: $light-gray;
		@media (min-width: $break-sm){
			display: flex;
			justify-content: space-between;
			background: $link;
			text-align: center;
		}
	}
```

Can't see the anchor tags:

```
		a {
			@media (min-width: $break-sm){
					color: #fff;
			}
		}
```

Format the list items (horizontal display)

```
	li {
		padding: 4px 2px 4px 8px;
		border-bottom: 1px solid rgba(255,255,255,0.25);
		@media (min-width: $break-sm){
			padding: 0.5rem;
			border-bottom: none;
			flex-grow: 1;
		}
```

Add hover effect:

```

		&:hover {
			background: $text;

			a {
				color: #fff;
				display: inline-block;
				width: 100%;

			}  
		}
	}
```

Note the css for hover.

Here is the entire file for _navigation.scss:

```
// _navigation.scss

nav {

	ul {
		display: none;
		background: $light-gray;
		@media (min-width: $break-sm){
			display: flex;
			justify-content: space-between;
			background: $link;
			text-align: center;
		}
		a {
			@media (min-width: $break-sm){
				color: #fff;
			}
		}
		li {
			padding: 4px 2px 4px 8px;
			border-bottom: 1px solid rgba(255,255,255,0.25);
			@media (min-width: $break-sm){
				padding: 0.5rem;
				border-bottom: none;
				flex-grow: 1;
			}
			&:hover {
				background: $text;

				a {
					color: #fff;
					display: inline-block;
					width: 100%;

				}  
			}
		}
	}
	

	a#pull {
		display: block;
		background-color: $link;
		height: 32px;
		padding-top: 12px;
		padding-left: 12px;
		@media (min-width: $break-sm) {
			display: none;
		}
	}

	a#pull:after {
		content:"";
		background: url(../img/nav-icon.png) no-repeat;
		background-size: cover; 
		width: 22px;
		height: 22px;
		color: #fff;
		display: inline-block;
	}
}
```



### Show/Hide Nav

Set the display of nav ul to none and add our scripts at the bottom of the page before the closing body tag:

```html
<script src="http://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="js/scripts.js"></script>
```

In `js/scripts.js`:

```
$('#pull').on('click', function() {
	$('nav ul').slideToggle();
	return false;
});
```

add .show class to SASS:

```
.show { display: block }
```

```
const menuButton = document.querySelector('#pull')
const menu = document.querySelector('nav ul')
menuButton.addEventListener('click', toggleMenu)

function toggleMenu(){
	menu.classList.toggle('show');
	event.preventDefault();
}
```

### Animation with CSS

Since we cannot animate display block we use properties we can animate to hide the nav:

```
nav {
	ul {
		// display: none;
		transform: translateY(-200px);
		max-height: 1px;
		opacity: 0;
		transition: all .3s;
		background: $light-gray;
```

Use the same properties to show it:

```
.show { 
	transform: translateY(0);
	max-height: 1000px;
	opacity: 1;
	transition: all .3s;
}
```

We also need to get the hamburger out of the way:

```
a#pull {
	position: relative;
	z-index: 20;
	display: block;
```

Note that we have a problem in wider screen view - the nav is not showing.

Reset the ul:

```
		@media (min-width: $break-sm){
			display: flex;
			justify-content: space-between;
			background: $link;
			text-align: center;
			transform: translateY(0);
			max-height: 1000px;
		}
```

## Columns for Content

Content (effects multiple regions - re-examine the DOM).

In a new _structure.scss file:

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

Apply the second breakpoint variable to medium screen sizes and above only:

```css
@media (min-width: $break-two) {
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

### Box sizing 

The universal approach (applies to all elements):

```
*, *:before, *:after {
  box-sizing: inherit;
}
html {
  box-sizing: border-box;
}
```

Check and make corrections to the nav.

The Secondary div

```css
.secondary {
	background:#f8f7f3;
	border:1px solid #bfbfbf;
	padding:1em;
}
```

### Micro clearfix

```css
.clearfix:before,
.clearfix:after {
    content: " ";
    display: table;
}
.clearfix:after {
    clear: both;
}
```

Add the clearfix to the content and secondary divs

`<div class="content clearfix">`

`<div class="container secondary clearfix">`

### Responsive Images

iFrame and images need to expand and contract to fit. 

Note the inline width and height parameters for the iFrame in the HTML.

```css
img,
iframe {
  width: 100%;
}
```

### Video Switcher - JavaScript

The old school JavaScript

```
$('.content-video a').on('click',function(){
	$('.content-video a').removeClass('active');
	$(this).addClass('active');
	var videoToPlay = $(this).attr('href');
	$('iframe').attr('src',videoToPlay);
	console.log(videoToPlay);
	return false;
 });
```

```
const videoLinks = document.querySelectorAll('.content-video a')
const videoLinksArray = [...videoLinks]
videoLinksArray.forEach( videoLink => videoLink.addEventListener('click', selectVideo ))

function selectVideo(){
	console.log(this)
	event.preventDefault()
}
```

```
function selectVideo(){
	const videoToPlay = this.getAttribute('href')
	console.log(videoToPlay)
	event.preventDefault()
}
```

Add the iFrame

```
const iFrame = document.querySelector('iframe')
const videoLinks = document.querySelectorAll('.content-video a')
const videoLinksArray = [...videoLinks]
videoLinksArray.forEach( videoLink => videoLink.addEventListener('click', selectVideo ))

function selectVideo(){
	const videoToPlay = this.getAttribute('href')
	iFrame.setAttribute('src', videoToPlay)
	console.log(iFrame)
	event.preventDefault()
}
```

Active class

Add css for the active class (for the first video iframe link):

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

```
const iFrame = document.querySelector('iframe')
const videoLinks = document.querySelectorAll('.content-video a')
const videoLinksArray = [...videoLinks]
videoLinksArray.forEach( videoLink => videoLink.addEventListener('click', selectVideo ))

function selectVideo(){
	removeActiveClass()
	this.classList.add('active')
	const videoToPlay = this.getAttribute('href')
	iFrame.setAttribute('src', videoToPlay)
	console.log(iFrame)
	event.preventDefault()
}

function removeActiveClass(){
	videoLinksArray.forEach( videoLink => videoLink.classList.remove('active'))
}
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

### The Footer 

Note the need for border-box and the new variable.

```css
.footer {
	clear: both;
	margin-top: 40px;
	background-color: $dk-blue;
	min-height: 320px;
	.siteinfo {
		max-width: $max-width;
		margin: 0 auto;
		color: #fff;
		text-shadow: none;
		p, ul, .vcard {
			box-sizing: border-box;
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

### Nav Sub

Integrate the JavaScript for nav-sub into the layout.

```css
.nav-sub {  
	margin-top: 16px;
	padding: 20px;
	background-color: #f8f7f3;
	border: 1px solid #bfbfbf;

	li { 
		margin:6px 0;
	}
	ul {
		display:none;
	}
	li:first-child ul {
		display:block;
	}
	> li > a { 
		font-weight:bold; 
	}
	ul li {
		padding-left:12px;
	}
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

```
const subnavLinks = document.querySelectorAll('.nav-sub > li a')
const subnavLinksArray = [...subnavLinks]
subnavLinksArray.forEach( subnavLink => subnavLink.addEventListener('click', openAccordion))

function openAccordion(){
	console.log(this)
	event.preventDefault()
}
```

Refine the selector (see [Combinators](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Simple_selectors))

```
const subnavLinks = document.querySelectorAll('.nav-sub > li > a')
console.log(subnavLinks)
const subnavLinksArray = [...subnavLinks]
subnavLinksArray.forEach( subnavLink => subnavLink.addEventListener('click', openAccordion))

function openAccordion(){
	console.log(this)
	event.preventDefault()
}
```

[DOM Traversal](https://www.w3schools.com/jsref/dom_obj_document.asp)

nextElementSibling, nextSibling, previousSibling, childNodes, firstChild ...

```
const subnavLinks = document.querySelectorAll('.nav-sub > li > a')
console.log(subnavLinks)
const subnavLinksArray = [...subnavLinks]
subnavLinksArray.forEach( subnavLink => subnavLink.addEventListener('click', openAccordion))

function openAccordion(){
	this.nextElementSibling.classList.toggle('active')
	event.preventDefault()
}
```

Idea - use `.nav-sub > li` as a selector for subnavLinks

Remove the active class

```
const subnavLinks = document.querySelectorAll('.nav-sub > li > a')
console.log(subnavLinks)
const subnavLinksArray = [...subnavLinks]
subnavLinksArray.forEach( subnavLink => subnavLink.addEventListener('click', openAccordion))

function openAccordion(){
	removeActiveClass()
	this.nextElementSibling.classList.toggle('active')
	event.preventDefault()
}

function removeActiveClass(){
	subnavLinksArray.forEach( subnavLink => subnavLink.nextElementSibling.classList.remove('active'))
}
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

### Small Images

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

```
const carouselLinks = document.querySelectorAll('.image-tn a')
const carouselLinksArray = [...carouselLinks]
const carousel = document.querySelector('.content-slider img')

carouselLinksArray.forEach( carouselLink => carouselLink.addEventListener('click', runCarousel ))

function runCarousel(){
	const imageHref = this.getAttribute('href')
	carousel.setAttribute('src', imageHref)
	event.preventDefault()
}
```

Set the text in the carousel.

Find the appropriate traversal.

```
function runCarousel(){
	const imageHref = this.getAttribute('href')
	const titleText = this.firstChild.title
	console.log(titleText)
	carousel.setAttribute('src', imageHref)
	event.preventDefault()
}
```

```
function runCarousel(){
	const imageHref = this.getAttribute('href')
	const titleText = this.firstChild.title
	carouselPara.innerHTML = titleText
	console.log(carouselPara)
	carousel.setAttribute('src', imageHref)
	event.preventDefault()
}
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
```

- effects the panels

```css
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





## Notes

### Mixins

```
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}
$radius: 10px;
```


Add to the nav and ul

```html
<nav class="clearfix">
	<ul class="clearfix">
```

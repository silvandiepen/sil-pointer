# Pointer

Create an alternate pointer in your interface, or a specific pointer for a button. This directive makes it easily possible by adding it to the element. The directive throws you back two custom-properties which you can use to animate anything.

### Install

Install the package
`npm install @sil/pointer`

Import the package

`import Pointer from '~/@sil/pointer`

Define the component:

```js
Vue.directive(Pointer);
```

Use the component with default values:

```html
<any-element v-pointer />
```

### Custom properties

When the directive is added, it will give you back a `--x` and a `--y` which you can use for instance for a pointer or animated background.

### Options

By default the directive will return you with the current x and why on the page. 

#### Percentage

You can also choose type percentage, in this case directive will return the position of the pointer relative to the element which has the directive.
When pointing in the ultimate center of the element the `--x` and `--y` will be `50%`.

```html
<any-element v-pointer="{ type: 'percentage' }">
```
#### Min / Max values

When you are using the percentage option. You can also choose to give the value a min and max. 

```html
<any-element v-pointer="{ type: 'percentage', min: 0, max: 100 }">
```
In this case the pointer won't give any value bigger than 100 and smaller than 0. 

### Examples

#### Button Background

```html
<button v-pointer>Hoi</button>
```

```css
button {
	/* Box Model */
	display: inline-block;
	padding: 1rem 2rem;

	/* Visual */
	background-color: blue;
	border: none;

	/* Typography */
	font-family: sans-serif;
	font-size: 1rem;
	color: white;
}
button::before {
	content: '';

	/* Positioning */
	position: absolute;
	top: var(
		--y,
		50%
	); // --y comes from the directive, the 50% is just a fallback
	left: var(--x, 50%);

	/* Box Model */
	display: block;
	width: 200%;
	height: 200%;

	/* Visual */
	background-image: radial-gradient(
		closest-side,
		rgba(0, 0, 0, 1),
		rgba(0, 0, 0, 0)
	);
}
```

#### Body Pointer

With this your pointer will be just a black dot.

```html
<body v-pointer>
	// Your html here
</body>
```

```css
body {
	pointer: none;
}
body::before {
	content: '';

	/* Positioning */
	position: absolute;
	top: var(
		--y,
		50%
	); // --y comes from the directive, the 50% is just a fallback
	left: var(--x, 50%);

	/* Box Model */
	display: block;
	width: 1rem;
	height: 1rem;

	/* Visual */
	background-image: radial-gradient(
		closest-side,
		rgba(0, 0, 0, 1) 100%,
		rgba(0, 0, 0, 0)
	);
}
```

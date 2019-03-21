# Pointer

Create an alternate pointer in your interface, or a specific pointer for a button. This directive makes it easily possible by adding it to the element. The directive throws you back two custom-properties which you can use to animate anything.

## Install

Install the package
```bash
npm install @sil/pointer 
```

Import the package

```js
import Pointer from '~/@sil/pointer 
```

Define the component:

```js
Vue.directive(Pointer);
```

Use the component with default values:

```html
<any-element v-pointer />
```

## About

When the directive is added, it will give you back a `--x` and a `--y` which are the values of your pointer relative to the viewport. 
You can use for instance for a pointer or animated background.

## Options

By default the directive will return you with the current x and why on the page. 

#### Percentage

You can also choose type percentage, in this case directive will return the position of the pointer relative to the element which has the directive.
When pointing in the ultimate center of the element the `--x` and `--y` will be `50%`.

```html
<any-element v-pointer="{ type: 'percentage' }">
```
#### Min / Max values

Give a min and max value to make sure the value doesn't go over the top. 

```html
<any-element v-pointer="{ type: 'percentage', min: 0, max: 100 }">
```
In this case the pointer won't give any value bigger than 100% and smaller than 0%. 


#### Custom variables

By default the directive returns you a `--x` and `--y`. You can alter these by setting:
(Make sure you add the `--` otherwise your custom property won't work. )

```html
<any-element v-pointer="{ x_var: '--horizontal', y_var: '--vertical' }">
```

This will return:

```html
<any-element style="--horizontal: 50%; --vertical: 50%">
```



## Examples

#### Button Background

```html
<button v-pointer>Hoi</button>
```

```css
button {
	display: inline-block;
	padding: 1rem 2rem;

	background-color: blue;
	border: none;

	font-family: sans-serif;
	font-size: 1rem;
	color: white;
}
button::before {
	content: '';

	position: absolute;
	top: var(
		--y,
		50%
	); /* --y comes from the directive, the 50% is just a fallback */
	left: var(--x, 50%);

	display: block;
	width: 200%;
	height: 200%;

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
	<!-- Your html here -->
</body>
```

```css
body {
	pointer: none;
}
body::before {
	content: '';

	position: absolute;
	top: var(
		--y,
		50%
	); /* --y comes from the directive, the 50% is just a fallback */
	left: var(--x, 50%);

	display: block;
	width: 1rem;
	height: 1rem;

	background-image: radial-gradient(
		closest-side,
		rgba(0, 0, 0, 1) 100%,
		rgba(0, 0, 0, 0)
	);
}
```

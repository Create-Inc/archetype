# PostCSS better states plugin

Advanced pseudo-classes for element states.

## Usage

Use the available pseudo-classes to target states. They will be replaced in the output by their corresponding selectors.

### Example

```css
/* original */
.button:is-disabled {
  opacity: 0.5;
}

/* output */
.button:is([disabled], [aria-disabled="true"], [data-disabled]) {
  opacity: 0.5;
}
```

## States

The following pseudo-classes are supported:

### `:is-disabled`

Whether the element is disabled.

Triggered by any of the following:

- `disabled` attribute.
- `aria-disabled` attribute when the value is `"true"`.
- `data-disabled` attribute.

### `:is-focus-visible`

Whether the element is focused through keyboard input.

Triggered by any of the following:

- `:focus-visible` pseudo-class.
- `data-focus-visible` attribute (added by UI libraries like [Ariakit](https://ariakit.org/)).

It's not triggered when the element matches `:is-disabled`.

### `:is-targeted`

Whether the element is being "targeted" through pointer or keyboard input.

Triggered by any of the following:

- `:hover` pseudo-class.
- `:focus-visible` pseudo-class.
- `data-focus-visible` attribute (added by UI libraries like [Ariakit](https://ariakit.org/)).

It's not triggered when the element matches `:is-disabled`.

### `:is-pressed`

Whether the element is being "pressed".

Triggered by any of the following:

- `:active:hover` pseudo-classes.
- `data-active` attribute (added by UI libraries like [Ariakit](https://ariakit.org/)).

It's not triggered when the element matches `:is-disabled`.

The combination of `:active` and `:hover` means that active styles are only triggered when the element is also being hovered, which is closer to native (non-web) UI and is generally a better user experience.

It also matches the actual behavior more accurately. Consider this scenario:

1. The user presses down on a button without releasing the mouse key.
2. The user moves the pointer out of the button.
3. The user releases the mouse key.

When these steps are followed, the button's `click` event is **not** triggered, but the `:active` styles are present until the moment the mouse key is released. This is a mismatch between UI and behavior that can result in a bad user experience.

By requiring active styles to also match `:hover`, the UI reflects the actual behavior more accurately. This way, the `click` event will be triggered **only** if the button has active styles when the user releases the mouse key.

This is inspired by [the React Aria usePress utility](https://react-spectrum.adobe.com/react-aria/usePress.html).

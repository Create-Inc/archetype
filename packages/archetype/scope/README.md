# PostCSS scope plugin

Automatic class scoping and layering of styles.

## Usage

Stylesheets following the `<scope name>.scoped.css` format will be automatically processed by this plugin. All others will be ignored.

### Class scoping

All classes will be renamed to the following format: `<prefix>_<scope name>_<original name>`.

The default prefix is `at`.

#### Example

```css
/* original: Button.scoped.css */
.button {
  padding: 4px;
  background-color: red;
}

/* output */
.at_Button_button {
  padding: 4px;
  background-color: red;
}
```

### Layering

All styles will be wrapped in a [CSS cascade layer](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_layers). The main advantage of this approach is that the styles can be overridden by other styles that are unlayered or defined in layers with higher precedence.

For example, Tailwind CSS utility classes will override them by default, without the need for `!important`.

The default layer name is `archetype`.

#### Example

```css
/* original: Button.scoped.css */
.button {
  padding: 4px;
  background-color: red;
}

/* output */
@layer archetype {
  .at_Button_button {
    padding: 4px;
    background-color: red;
  }
}
```

### Global classes

A class can be opted-out from scoping by prefixing it with an underscore (`_`). The underscore will be removed from the output.

#### Example

```css
/* original: Button.scoped.css */
.button {
  padding: 4px;

  &._dark {
    background-color: darkblue;
    color: white;
  }

  &._light {
    background-color: blue;
    color: black;
  }
}

/* output */
.at_Button_button {
  padding: 4px;

  &.dark {
    background-color: darkblue;
    color: white;
  }

  &.light {
    background-color: blue;
    color: black;
  }
}
```

## Options

The plugin can be configured with the following options:

| Options  | Default     | Description                                                         |
| -------- | ----------- | ------------------------------------------------------------------- |
| `prefix` | `at`        | The prefix that will be used to scope class names.                  |
| `layer`  | `archetype` | The name of the layer in which scoped stylesheets will be declared. |

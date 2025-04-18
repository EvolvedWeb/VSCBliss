# VSCBliss

VSCBliss is a set of lightweight, developer-friendly tools designed to enhance your JavaScript and JSON editing experience directly within Visual Studio Code. It offers intelligent formatting and conversion commands with minimal configuration.

---

## Features

### Convert Concatenated Strings to Template Literals

This command transforms code like:

```js
"My name is " + name + "."
```

Into:

```js
`My name is ${name}.`
```

**How to use:**
- Select a concatenated string (or place your cursor on the line)
- Run the command: `VSCBliss: Convert to Template Literal`

---

### Convert JSON to JavaScript Object

This command converts a valid JSON string into a native JavaScript object with formatting options.

Example:

**Input (JSON):**
```json
{
  "dog": "woof",
  "thing": {
    "one": 1,
    "dog-food": true,
    "class": "reserved"
  }
}
```

**Output (JavaScript object with single quotes):**
```js
{
  dog: 'woof',
  thing: {
    one: 1,
    'dog-food': true,
    'class': 'reserved'
  }
}
```

**Output (JavaScript object with double quotes):**
```js
{
  dog: "woof",
  thing: {
    one: 1,
    "dog-food": true,
    "class": "reserved"
  }
}
```

- Keys that are safe JavaScript identifiers are unquoted.
- Keys that are reserved words or contain invalid characters remain quoted.
- String values are quoted using your preferred quote style.
- Formatting matches the surrounding code’s indentation and spacing style.

**How to use:**
- Select a valid JSON string
- Run one of the following commands:
  - `VSCBliss: Convert JSON to JS Object (single quotes)`
  - `VSCBliss: Convert JSON to JS Object (double quotes)`

---

## Configuration

You can adjust formatting behavior using VS Code's built-in settings.

### Available Settings

| Setting                      | Type    | Default | Description                                                   |
|-----------------------------|---------|---------|---------------------------------------------------------------|
| `vscBliss.format.multiline` | boolean | `true`  | If true, the converted output will be formatted across lines. |

**Indentation is automatically matched to your current file’s formatting** using your workspace/editor settings (`editor.tabSize`, `insertSpaces`, etc.).

No other configuration is required.

---

## Installation

You can install VSCBliss from the Visual Studio Code Marketplace (once published), or manually using the packaged `.vsix` file:

```bash
code --install-extension ./vscbliss-0.0.1.vsix
```

---

## Contributing

Future tools may include:

- Reverse conversion: JS Object → JSON
- Template literal → concatenated string
- Quote style toggling
- Multi-line string formatter
- String joining/splitting utilities

Suggestions, bug reports, and pull requests are welcome.

---

## License

MIT

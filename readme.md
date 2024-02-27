## get-spot 

```bash
    npm install --save get-spot
```

Get the stack and their lines, columns and filenames from the current spot of invocation with
the option to specify an offset.



> import { getSpot } from "get-spot";

## `[...stack] = getSpot(offset = 1)`

`offset`: must be 1 or greater

Stack will have the following information

- `line` : the line number the invocation occurred.
- `column` : the column number the invocation occurred.
- `file` : The filename or url depending on if its nodejs or browser.
- `beforeParse` : the stack line before parsing into the above.

## License
This project is licensed under [MIT](LICENSE.md).
More info in the [LICENSE](LICENSE.md) file.

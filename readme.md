## get-spot 

Get the stack and their lines, columns and filenames at the current spot of invocation with
the option to specify an offset.

## [...stack] = `getSpot(offset = 1)`

Stack will have the following information

- line : the line number the invocation occurred.
- column : the column number the invocation occurred.
- file : The filename or url depending on if its nodejs or browser.
- beforeParse : the stack line before parsing into the above.


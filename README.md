# Install

Install dependencies:

```sh
npm install
```

# How to use

```sh
node groupGenerator -h
```

```sh
Usage: Random Group Generator [options] <filepath>

This script creates a random groups from a list of names, can be seeded

Arguments:
  filepath                 input filepath containing list of names

Options:
  -V, --version            output the version number
  -g, --groups <number>    number of groups (default: 2)
  -o, --output <filepath>  output filepath (default: "./output.txt")
  -s, --seed <string>      Seed for the randomizer
  -h, --help               display help for command
```

# Example

```sh
node createGroups ./input.txt -g 28
```
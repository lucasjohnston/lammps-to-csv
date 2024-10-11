# 🌟 LAMMPs dump to CSV tool

A **CLI tool** to convert your LAMMPS dump files into **easy-to-read CSV** files. Simplify your data processing workflow with just a single command!

## 🚀 Installation

Ensure you have [Node.js](https://nodejs.org/) installed. Then, install the CLI tool globally using npm:

```bash
npm install -g lammps-to-csv
```

## 🛠️ Usage

Use the `lammps-to-csv` command followed by the path to your LAMPS dump file:

```bash
lammps-to-csv path/to/input.txt
```

This will generate a `input.csv` file in the same directory.

## 📖 Example

```bash
lammps-to-csv ./data/dump.txt
```

**Output:**

```bash
💾 File has been saved to ./data/dump.csv
```

## 🎉 Features

- **Fast Conversion:** Quickly transform large LAMMPS dump files to CSV.
- **User-Friendly:** Intuitive CLI with helpful spinner indicators.
- **Error Handling:** Provides clear error messages for smooth troubleshooting.

## 📝 License

MIT © Lucas Johnston

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/lucasjohnston/lammps-to-csv).

#!/usr/bin/env node

import fs from "fs";
import ora from "ora";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("⛔ Please provide the input file path as an argument.");
  process.exit(1);
}

const inputFilePath = args[0];
const outputFilePath = inputFilePath.replace(".txt", ".csv");

fs.readFile(inputFilePath, "utf8", (err, data) => {
  console.log(
    "\x1b[1m\x1b[35mWelcome to lamps-dumps-to-csv (aka lucashelpme.js) ✨\x1b[0m"
  );

  if (err) {
    console.error("⛔ Error reading the file: ", err);
    return;
  } else {
    console.log(`📔 Read file: ${inputFilePath}`);
  }

  const rows = data.split("\n");
  const filteredRows = [];
  let previousRow = null;

  const spinner = ora("Converting your data...").start();

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];

    // Ignore empty lines
    if (currentRow.trim() === "") {
      continue;
    }

    if (
      currentRow.includes(
        "ITEM: ATOMS id type x y z vx vy vz angmomx angmomy angmomz c_1[1] c_1[2] c_1[3] c_1[4] c_orient[1] c_orient[2] c_orient[3] c_orient[4]"
      )
    ) {
      // Skip the previous line by not adding it to filteredRows
      if (previousRow !== null) {
        // Remove the last added row if it exists
        filteredRows.pop();
      }
      // Add the current row without skipping
      filteredRows.push(currentRow);
      previousRow = currentRow;
      continue;
    }

    // Skip any row starting with "ITEM:"
    if (currentRow.startsWith("ITEM:")) {
      previousRow = currentRow;
      continue;
    }

    // Process and format the current row
    try {
      const items = currentRow.split(" ");
      items.forEach((item, index, arr) => {
        // Ensure each number is correctly formatted
        if (!/^[-+]?\d+(\.\d{1,16})?([eE][-+]?\d+)?$/.test(item)) {
          throw new Error(
            `Invalid number format: "${item}" at row ${i + 1}, column ${
              index + 1
            }`
          );
        }

        // Replace exponential number with 13 d.p. float
        if (item.includes("e")) {
          arr[index] = parseFloat(item).toFixed(13);
        }

        // Ensure each number is at least 1 d.p.
        if (!item.includes(".")) {
          arr[index] = item + ".0";
        }
      });
      filteredRows.push(items.join(","));
    } catch (error) {
      spinner.fail("An error occurred during data conversion.");
      console.error(error.message);
      return;
    }

    previousRow = currentRow;
  }

  // Add appropriate amount of trailing commas to account for the total number of columns
  const maxColumns = filteredRows.reduce((max, row) => {
    const length = row.split(",").length;
    return length > max ? length : max;
  }, 0);

  const csvDataWithTrailingCommas = filteredRows
    .map((row) => {
      const columns = row.split(",");
      const trailingCommas = ",".repeat(maxColumns - columns.length);
      return row + trailingCommas;
    })
    .join("\n");

  spinner.succeed("Data converted successfully");

  fs.writeFile(outputFilePath, csvDataWithTrailingCommas, "utf8", (err) => {
    if (err) {
      console.error("⛔ Error saving the CSV file: ", err);
      return;
    }
    console.log(`💾 File has been saved to ${outputFilePath}`);
    console.log("👋 цем цем");
  });
});

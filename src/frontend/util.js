const fsPromise = require("node:fs/promises");

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  response.type = matches[1];
  response.data = Buffer.from(matches[2], "base64");

  return response;
}

function fixPath(filePath, fileExtension) {
  let splitted = filePath.split("/");
  let fileName = splitted[splitted.length - 1];
  let splittedFileName = fileName.split(".");
  let hasFileExtension = splittedFileName.length == 2;
  let hasCorrectFileExtension =
    hasFileExtension && splittedFileName[1] == fileExtension;

  if (!hasFileExtension) {
    filePath = filePath + "." + fileExtension;
  } else if (!hasCorrectFileExtension) {
    filePath = filePath.split(".")[0] + "." + fileExtension;
  }

  return filePath;
}

async function showSaveDialog(
  downloadFolder,
  dialog,
  fs,
  win,
  fileName,
  fileExtension,
  base64File,
  buttonLabel,
  title
) {
  let downloadPath = downloadFolder + `/${fileName}.${fileExtension}`;

  // define save dialog options
  var options = {
    title: title,
    buttonLabel: buttonLabel,
    defaultPath: downloadPath,
    filters: [{ name: fileExtension, extensions: [fileExtension] }],
  };

  var imageBuffer = decodeBase64Image(base64File);

  const { canceled, filePath } = await dialog.showSaveDialog(win, options);
  // fix file path if the path has no extension or a wrong extension
  if (!canceled) {
    fs.writeFileSync(
      fixPath(filePath, fileExtension),
      imageBuffer.data,
      "base64"
    );
  }

  return canceled ? undefined : filePath;
}

function saveToUserFolder(userFolderPath, fileName, fileExtension, data) {
  return fsPromise.writeFile(
    `${userFolderPath}/${fileName}.${fileExtension}`,
    data
  );
}

function readFromUserFolder(userFolderPath, fileName, fileExtension) {
  return fsPromise.readFile(
    `${userFolderPath}/${fileName}.${fileExtension}`,
    "utf8"
  );
}

module.exports = {
  decodeBase64Image,
  fixPath,
  showSaveDialog,
  saveToUserFolder,
  readFromUserFolder,
};

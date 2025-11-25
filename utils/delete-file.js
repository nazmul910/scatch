import path from "path";
import fs from "fs";

const deleteFile = (filePath) => {
  const absolutePath = path.resolve(filePath);

  fs.unlink(absolutePath, (err) => {
    if (err) console.log("Delete Error:", err);
  });
};

export default deleteFile;
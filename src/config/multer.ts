import crypto from "node:crypto";
import multer from "multer";
import { extname, resolve, dirname } from "node:path";

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(import.meta.dirname, "..", "..", folder),
        filename: (_request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;
          return callback(null, fileName);
        },
      }),
    };
  },
};

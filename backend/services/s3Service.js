const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

async function uploadProductImage(buffer, key) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: "image/webp",
  });

  await s3Client.send(command);

  if (!process.env.S3_PUBLIC_URL_BASE) {
    throw new Error("S3_PUBLIC_URL_BASE is not configured");
  }

  const publicUrlBase = process.env.S3_PUBLIC_URL_BASE.replace(/\/$/, "");

  return `${publicUrlBase}/${key}`;
}

module.exports = { uploadProductImage };

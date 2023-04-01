const { S3ClientFactory } = require("../../infra/s3-client");

/**
 *
 * @returns {[S3Client, S3Client]}
 */
function makeS3Providers() {
  const source = S3ClientFactory.createClient("source", {
    region: process.env.SOURCE_AWS_REGION,
    accessKeyId: process.env.SOURCE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SOURCE_AWS_SECRET_ACCESS_KEY,
  });

  const target = S3ClientFactory.createClient("target", {
    region: process.env.TARGET_AWS_REGION,
    accessKeyId: process.env.TARGET_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.TARGET_AWS_SECRET_ACCESS_KEY,
  });

  return [source, target];
}

module.exports = { makeS3Providers };

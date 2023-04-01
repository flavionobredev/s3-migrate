const { StorageService } = require("../../domain/storage.service");
const { makeS3Providers } = require("./s3-providers.factory");
/**
 *
 * @returns {[StorageService, StorageService]}
 */
function makeStorageServices() {
  const [source, target] = makeS3Providers();
  const sourceStorageService = new StorageService(
    `${process.env.SOURCE_AWS_BUCKET}`,
    source
  );

  const targetStorageService = new StorageService(
    `${process.env.TARGET_AWS_BUCKET}`,
    target
  );

  return [sourceStorageService, targetStorageService];
}

module.exports = { makeStorageServices };

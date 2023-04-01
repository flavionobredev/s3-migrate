const { GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { S3Client } = require("../infra/s3-client");
const stream = require("stream");

/**
 * @typedef { object } GetMediaOutput
 * @property { stream.Readable } stream
 * @property { number } length
 */

/**
 * @typedef { object } UploadMediaInput
 * @property { string } filename
 * @property { string } folder
 * @property { number } length
 */

class StorageService {
  #_s3Client;
  #_bucket;

  /**
   * @param { string } bucket
   * @param { S3Client } s3Client
   */
  constructor(bucket, s3Client) {
    this.#_s3Client = s3Client;
    this.#_bucket = bucket;
  }

  /**
   * @param {string} filename
   * @param {string} folder
   *
   */
  async getMedia(filename, folder = "") {
    const params = {
      Bucket: this.#_bucket,
      Key: `${folder}${filename}`,
    };

    const data = await this.#_s3Client.send(new GetObjectCommand(params));
    return {
      stream: data.Body,
      length: data.ContentLength,
    };
  }

  /**
   * @param {UploadMediaInput} input
   **/
  uploadMedia(input) {
    const pass = new stream.PassThrough();
    const params = {
      Bucket: this.#_bucket,
      Key: `${input.folder}${input.filename}`,
      Body: pass,
      ContentLength: input.length,
    };
    this.#_s3Client.send(new PutObjectCommand(params));
    return pass;
  }
}

module.exports = { StorageService };

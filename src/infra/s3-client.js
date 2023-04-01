const { S3Client } = require("@aws-sdk/client-s3");

/**
 * @typedef S3CreateClientConfig
 * @property {string} region
 * @property {string} accessKeyId
 * @property {string} secretAccessKey
 */

/**
 * @typedef { S3Client } S3Client
 */

class S3ClientFactory {
  /**
   * @type {Record<string, S3Client>}
   */
  static #_clients = {};

  /**
   * @param {string} provider name for provider
   * @param { S3CreateClientConfig } config s3 configs
   */
  static createClient(provider, config) {
    if (!provider || !config) {
      throw new Error("Configs params is required");
    }

    if (this.#_clients[provider]) {
      return this.#_clients[provider];
    }

    const client = new S3Client({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });

    this.#_clients[provider] = client;
    return client;
  }

  static getClient(provider) {
    const client = this.#_clients[provider];
    if (!client) {
      throw new Error("Client not found");
    }
    return client;
  }
}

module.exports = { S3ClientFactory, S3Client };

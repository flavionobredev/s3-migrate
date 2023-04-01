const { mediaPrismaClient } = require("../../infra/database");

/**
 * @typedef { object } MediaData
 * @property { string } name
 * @property { string } folder
 */

/**
 * @typedef { object } MigrateMediasInput
 * @property { MediaData } source
 * @property { MediaData } target
 */

class MigrateMedias {
  /** @type {import("../storage.service").StorageService} */
  sourceService;

  /** @type {import("../storage.service").StorageService} */
  targetService;

  /** @type {mediaPrismaClient["medias"]} */
  mediaRepository;

  constructor({ sourceService, targetService }) {
    this.sourceService = sourceService;
    this.targetService = targetService;
    this.mediaRepository = mediaPrismaClient.medias;
  }

  /**
   * @param {MigrateMediasInput} input
   */
  async migrate({ source, target }) {
    const sourceFileName = source.name;

    const hasMedia = await this.mediaRepository.findUnique({
      where: { name: sourceFileName },
    });

    if (hasMedia?.uploaded) {
      console.log("skipping: ", sourceFileName);
      return;
    }

    await this.mediaRepository.upsert({
      where: { name: sourceFileName },
      update: {},
      create: {
        name: sourceFileName,
        uploaded: false,
      },
    });

    const result = await this.sourceService.getMedia(
      sourceFileName,
      source.folder
    );

    result.stream.pipe(
      this.targetService
        .uploadMedia({
          filename: target.name,
          folder: target.folder,
          length: result.length,
        })
        .on("finish", () => {
          this.mediaRepository
            .update({
              where: { name: sourceFileName },
              data: {
                uploaded: true,
              },
            })
            .then();
        })
    );
  }
}

module.exports = { MigrateMedias };

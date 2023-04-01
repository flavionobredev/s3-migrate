const { MigrateMedias } = require("./domain/usecase/migrate-medias");
const { sourceDbFilesPrismaClient } = require("./infra/database");
const {
  makeStorageServices,
} = require("./main/factory/storage-service.factory");

async function bootstrap() {
  const result = await sourceDbFilesPrismaClient.file.findMany({
    select: { name: true },
    take: 10,
  });

  const [sourceService, targetService] = makeStorageServices();

  const migrateMedias = new MigrateMedias({
    sourceService,
    targetService,
  });

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  for (const media of result) {
    await sleep(50);
    console.log("migrating: ", media.name)
    await migrateMedias.migrate({
      source: {
        name: media.name,
        folder: process.env.SOURCE_AWS_BUCKET_FOLDER,
      },
      target: {
        name: media.name,
        folder: process.env.TARGET_AWS_BUCKET_FOLDER,
      },
    });
  }
}

process.stdout.write("\033c");
bootstrap();

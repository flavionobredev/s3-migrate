const {
  PrismaClient: MediaPrismaClient,
} = require("../../infra/prisma/s3-migration/client");

const {
  PrismaClient: SourceDbFilesPrismaClient,
} = require("../../infra/prisma/source-db-files/client");

const mediaPrismaClient = new MediaPrismaClient();
const sourceDbFilesPrismaClient = new SourceDbFilesPrismaClient();

module.exports = { mediaPrismaClient, sourceDbFilesPrismaClient };

import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: (_, args, { reqeust }) => {
      const { id } = args;
      return prisma.post({ id });
    }
  }
};

import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, email, firstname, lastname, bio } = args;
      const { user } = request;
      return await prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstname, lastname, bio }
      });
    }
  }
};

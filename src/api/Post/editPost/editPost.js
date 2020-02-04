import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id, caption, location, action } = args;
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        if ("EDIT" === action) {
          return prisma.updatePost({
            data: { caption, location },
            where: { id }
          });
        } else if ("DELETE" === action) {
          return prisma.deletePost({ id });
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};

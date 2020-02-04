import { prisma } from "../../../../generated/prisma-client";
import { POST_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following();
      return prisma
        .posts({
          where: {
            user: { id_in: [...following.map(user => user.id), user.id] }
          }
        })
        .$fragment(POST_FRAGMENT);
    }
  }
};

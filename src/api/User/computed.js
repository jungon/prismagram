import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullname: parent => `${parent.lastname} ${parent.firstname}`,
    isFollowing: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [{ id: parentId }, { followers_some: { id_in: [user.id] } }]
        });
      } catch {
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  },
  Post: {
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          { post: { id: parentId } }
        ]
      });
    },
    likeCount: parent =>
      prisma
        .likesConnection({
          where: {
            post: {
              id: parent.id
            }
          }
        })
        .aggregate()
        .count(),
    files: parent => prisma.post({ id: parent.id }).files(),
    comments: parent => prisma.post({ id: parent.id }).comments()
  }
};

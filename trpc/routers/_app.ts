import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import prisma from "@/lib/prisma";
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

  testGetPost: baseProcedure.query(async () => {
    return await prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }),

  testCreatePost: baseProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          authorId: 1,
        },
      });
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const req = await request.json();
  const { boardId, userId } = req;
  try {
    const removedUser = await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        users: {
          disconnect: [{ id: userId }],
        },
      },
    });
    if (!removedUser) return NextResponse.json('Could not remove the user');
    return NextResponse.json('Successfully removed user');
  } catch (err) {
    throw new Error(`Error removing user: ${err}`);
  }
}

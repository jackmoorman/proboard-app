import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const req = await request.json();
  const { boardId, email } = req;
  try {
    const addedUser = await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        users: {
          connect: [{ email: email }],
        },
      },
    });
    if (!addedUser) return NextResponse.json('Could not find the user');
    return NextResponse.json('Successfully added user to the board');
  } catch (err) {
    throw new Error(`Error adding user to the board: ${err}`);
  }
}

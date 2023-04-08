import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { uuid } from 'uuidv4';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();
  const session = await getServerSession(authOptions);
  const { title } = req;
  const id = session.user.id;

  try {
    const newBoard = await prisma.board.create({
      data: {
        title: title,
        adminId: id,
        users: {
          connect: [{ id: id }],
        },
        data: [
          {
            id: uuid(),
            title: 'Column 1',
            cards: [
              {
                id: uuid(),
                status: 'Unassigned',
                value: 'My first card.',
              },
            ],
          },
        ],
      },
    });
    return NextResponse.json('Successfully created project.');
  } catch (err) {
    throw new Error(`Error creating project: ${err}`);
  }
}

export async function PUT(request: Request) {
  const req = await request.json();
  const { boardId, allCols } = req;
  try {
    const updated = await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        data: allCols,
      },
    });
    return NextResponse.json('Successfully updated board');
  } catch (err) {
    throw new Error(`Error editing columns: ${err}`);
  }
}

export async function DELETE(request: Request) {
  const req = await request.json();
  console.log(req);
  const { boardId } = req;
  try {
    const deleted = await prisma.board.delete({
      where: {
        id: boardId,
      },
    });
    return NextResponse.json('Successfully deleted board');
  } catch (err) {
    throw new Error(`Error deleting board: ${err}`);
  }
}

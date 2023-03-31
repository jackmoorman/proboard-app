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
                value: 'My first card.',
              },
            ],
          },
        ],
      },
    });
    console.log(newBoard);
    return NextResponse.json('Successfully created project.');
  } catch (err) {
    throw new Error(`Error creating project: ${err}`);
  }
}

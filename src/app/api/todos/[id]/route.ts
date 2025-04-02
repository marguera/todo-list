import { NextResponse } from 'next/server';
import { updateTodoStatus, deleteTodo } from '@/lib/db';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { completed } = await request.json();
    const id = params.id;
    
    if (completed === undefined) {
      return NextResponse.json({ error: 'Completed status is required' }, { status: 400 });
    }

    const updatedTodo = await updateTodoStatus(id, completed);
    
    if (!updatedTodo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    await deleteTodo(id);
    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}

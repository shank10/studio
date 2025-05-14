"use client";

import { useState, type FormEvent } from 'react';
import { PlusCircle, StickyNote, Trash2, Edit3 } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import type { Note } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

const initialNotes: Note[] = [
  { id: '1', content: 'Remember to buy groceries. Check out https://example.com for recipes.', createdAt: new Date().toISOString(), color: 'bg-yellow-100 dark:bg-yellow-900' },
  { id: '2', content: 'Schedule a meeting with the team for project discussion.', createdAt: new Date().toISOString(), color: 'bg-blue-100 dark:bg-blue-900' },
];

function parseContentForLinks(content: string) {
  const urlRegex = /(https|http):\/\/([^\s]+)/g;
  return content.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/80">{part}</a>;
    }
    if (index > 0 && (content.split(urlRegex)[index-1] === 'http' || content.split(urlRegex)[index-1] === 'https')) {
       const fullUrl = `${content.split(urlRegex)[index-1]}://${part}`;
       return <a key={index} href={fullUrl} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/80">{part}</a>;
    }
    return part;
  });
}


export function NotesSection() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');

  const handleAddNote = (e: FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      content: newNoteContent,
      createdAt: new Date().toISOString(),
      color: ['bg-yellow-100 dark:bg-yellow-900', 'bg-blue-100 dark:bg-blue-900', 'bg-green-100 dark:bg-green-900', 'bg-pink-100 dark:bg-pink-900'][Math.floor(Math.random() * 4)]
    };
    setNotes(prev => [newNote, ...prev]);
    setNewNoteContent('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const handleEditNote = (e: FormEvent) => {
    e.preventDefault();
    if (!editingNote || !editNoteContent.trim()) return;
    setNotes(prev => prev.map(note => note.id === editingNote.id ? { ...note, content: editNoteContent } : note));
    setEditingNote(null);
    setEditNoteContent('');
  }

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setEditNoteContent(note.content);
  }

  return (
    <SectionCard 
      title="Quick Notes" 
      icon={<StickyNote size={24} />} 
      action={
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Note</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Note</DialogTitle></DialogHeader>
            <form onSubmit={handleAddNote} className="space-y-4">
              <Textarea 
                placeholder="Type your note here..." 
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                rows={5}
              />
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
                <Button type="submit">Save Note</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <ScrollArea className="h-[300px] pr-3">
        {notes.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No notes yet. Add one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map(note => (
              <Card key={note.id} className={`shadow-md ${note.color}`}>
                <CardContent className="p-4 text-sm whitespace-pre-wrap break-words">
                  {parseContentForLinks(note.content)}
                </CardContent>
                <CardFooter className="p-2 flex justify-end gap-2">
                   <Dialog open={editingNote?.id === note.id} onOpenChange={(isOpen) => !isOpen && setEditingNote(null)}>
                    <DialogTrigger asChild>
                       <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditModal(note)}>
                        <Edit3 size={16} /> <span className="sr-only">Edit</span>
                      </Button>
                    </DialogTrigger>
                     <DialogContent>
                        <DialogHeader><DialogTitle>Edit Note</DialogTitle></DialogHeader>
                        <form onSubmit={handleEditNote} className="space-y-4">
                          <Textarea 
                            value={editNoteContent}
                            onChange={(e) => setEditNoteContent(e.target.value)}
                            rows={5}
                          />
                          <DialogFooter>
                            <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
                            <Button type="submit">Save Changes</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                   </Dialog>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDeleteNote(note.id)}>
                    <Trash2 size={16} /> <span className="sr-only">Delete</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </SectionCard>
  );
}

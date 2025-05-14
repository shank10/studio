"use client";

import { useState, type FormEvent } from 'react';
import { TrendingUp, PlusCircle, Trash2 } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import type { Investment } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';

const initialInvestments: Investment[] = [
  { id: '1', date: new Date().toISOString().split('T')[0], description: 'Stock XYZ', amount: 1000.00, comments: 'Long term hold' },
  { id: '2', date: new Date().toISOString().split('T')[0], description: 'Crypto ABC', amount: 500.00, comments: 'Speculative' },
];

export function InvestmentTracker() {
  const [investments, setInvestments] = useState<Investment[]>(initialInvestments);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [comments, setComments] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddInvestment = (e: FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount || !date) return;
    const newInvestment: Investment = {
      id: Date.now().toString(),
      date,
      description,
      amount: parseFloat(amount),
      comments,
    };
    setInvestments(prev => [newInvestment, ...prev]);
    setDescription('');
    setAmount('');
    setComments('');
    setDate(new Date().toISOString().split('T')[0]);
  };
  
  const handleDeleteInvestment = (id: string) => {
    setInvestments(prev => prev.filter(inv => inv.id !== id));
  };

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <SectionCard 
      title="Investment Tracker" 
      icon={<TrendingUp size={24} />}
      action={
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Investment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Investment</DialogTitle></DialogHeader>
            <form onSubmit={handleAddInvestment} className="space-y-4">
              <div>
                <Label htmlFor="inv-date">Date</Label>
                <Input id="inv-date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="inv-desc">Description</Label>
                <Input id="inv-desc" value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g., S&P 500 Index Fund" required />
              </div>
              <div>
                <Label htmlFor="inv-amount">Amount</Label>
                <Input id="inv-amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g., 500.00" step="0.01" required />
              </div>
              <div>
                <Label htmlFor="inv-comments">Comments (Optional)</Label>
                <Textarea id="inv-comments" value={comments} onChange={e => setComments(e.target.value)} placeholder="e.g., Dividend reinvestment" />
              </div>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
                <Button type="submit">Add Investment</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <ScrollArea className="h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investments.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No investments logged yet.</TableCell></TableRow>
            ) : (
              investments.map(investment => (
                <TableRow key={investment.id}>
                  <TableCell>{new Date(investment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{investment.description}</TableCell>
                  <TableCell className="text-right">${investment.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-xs">{investment.comments}</TableCell>
                   <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDeleteInvestment(investment.id)}>
                      <Trash2 size={16} /> <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      {investments.length > 0 && (
        <div className="mt-4 pt-2 border-t text-right font-semibold">
          Total Invested: ${totalInvested.toFixed(2)}
        </div>
      )}
    </SectionCard>
  );
}

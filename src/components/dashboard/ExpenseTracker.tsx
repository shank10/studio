"use client";

import { useState, type FormEvent } from 'react';
import { CreditCard, PlusCircle, Trash2 } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import type { Expense, ExpenseType } from '@/lib/types';
import { EXPENSE_TYPES } from '@/lib/constants';
import { ScrollArea } from '../ui/scroll-area';

const initialExpenses: Expense[] = [
  { id: '1', date: new Date().toISOString().split('T')[0], description: 'Lunch with team', amount: 25.50, type: 'Food' },
  { id: '2', date: new Date().toISOString().split('T')[0], description: 'Monthly train pass', amount: 80.00, type: 'Transport' },
];

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<ExpenseType | ''>('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddExpense = (e: FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount || !type || !date) return;
    const newExpense: Expense = {
      id: Date.now().toString(),
      date,
      description,
      amount: parseFloat(amount),
      type: type as ExpenseType,
    };
    setExpenses(prev => [newExpense, ...prev]);
    setDescription('');
    setAmount('');
    setType('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };
  
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <SectionCard 
      title="Expense Tracker" 
      icon={<CreditCard size={24} />}
      action={
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Expense</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Expense</DialogTitle></DialogHeader>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <Label htmlFor="exp-date">Date</Label>
                <Input id="exp-date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="exp-desc">Description</Label>
                <Input id="exp-desc" value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g., Coffee" required />
              </div>
              <div>
                <Label htmlFor="exp-amount">Amount</Label>
                <Input id="exp-amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g., 3.50" step="0.01" required />
              </div>
              <div>
                <Label htmlFor="exp-type">Type</Label>
                <Select value={type} onValueChange={(value) => setType(value as ExpenseType)} required>
                  <SelectTrigger id="exp-type"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {EXPENSE_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
                <Button type="submit">Add Expense</Button>
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
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No expenses logged yet.</TableCell></TableRow>
            ) : (
              expenses.map(expense => (
                <TableRow key={expense.id}>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.type}</TableCell>
                  <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDeleteExpense(expense.id)}>
                      <Trash2 size={16} /> <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      {expenses.length > 0 && (
        <div className="mt-4 pt-2 border-t text-right font-semibold">
          Total: ${totalExpenses.toFixed(2)}
        </div>
      )}
    </SectionCard>
  );
}

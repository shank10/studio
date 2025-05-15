
"use client";

import { useState, type FormEvent } from 'react';
import { CreditCard, PlusCircle, Trash2, Edit3 } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';

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

  const [selectedExpenses, setSelectedExpenses] = useState<Set<string>>(new Set());
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEditingExpense, setCurrentEditingExpense] = useState<Expense | null>(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editType, setEditType] = useState<ExpenseType | ''>('');
  const [editDate, setEditDate] = useState('');

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
    setExpenses(prev => [newExpense, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setDescription('');
    setAmount('');
    setType('');
    setDate(new Date().toISOString().split('T')[0]);
    // Dialog will close due to DialogClose asChild on the submit button
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    setSelectedExpenses(prev => {
      const newSelected = new Set(prev);
      newSelected.delete(id);
      return newSelected;
    });
  };

  const handleSelectAllExpenses = (checkedState: boolean | 'indeterminate') => {
    if (checkedState === true) {
      const allExpenseIds = new Set(expenses.map(exp => exp.id));
      setSelectedExpenses(allExpenseIds);
    } else {
      setSelectedExpenses(new Set());
    }
  };

  const handleSelectExpense = (expenseId: string, checked: boolean) => {
    setSelectedExpenses(prev => {
      const newSelected = new Set(prev);
      if (checked) {
        newSelected.add(expenseId);
      } else {
        newSelected.delete(expenseId);
      }
      return newSelected;
    });
  };

  const handleDeleteSelectedExpenses = () => {
    setExpenses(prev => prev.filter(exp => !selectedExpenses.has(exp.id)));
    setSelectedExpenses(new Set());
  };

  const openEditExpenseDialog = (expense: Expense) => {
    setCurrentEditingExpense(expense);
    setEditDescription(expense.description);
    setEditAmount(expense.amount.toString());
    setEditType(expense.type);
    setEditDate(expense.date);
    setIsEditDialogOpen(true);
  };

  const handleUpdateExpense = (e: FormEvent) => {
    e.preventDefault();
    if (!currentEditingExpense || !editDescription.trim() || !editAmount || !editType || !editDate) return;
    
    setExpenses(prev => prev.map(exp => 
        exp.id === currentEditingExpense.id 
        ? { ...exp, description: editDescription, amount: parseFloat(editAmount), type: editType as ExpenseType, date: editDate } 
        : exp
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setIsEditDialogOpen(false);
    setCurrentEditingExpense(null);
  };
  
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  const isAllSelected = expenses.length > 0 && selectedExpenses.size === expenses.length;
  const isIndeterminate = selectedExpenses.size > 0 && selectedExpenses.size < expenses.length;


  return (
    <SectionCard 
      title="Expense Tracker" 
      icon={<CreditCard size={24} />}
      action={
        <div className="flex items-center gap-2">
          {selectedExpenses.size > 0 && (
            <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={handleDeleteSelectedExpenses}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete ({selectedExpenses.size})
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Expense</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add New Expense</DialogTitle></DialogHeader>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div>
                  <Label htmlFor="exp-date-add">Date</Label>
                  <Input id="exp-date-add" type="date" value={date} onChange={e => setDate(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="exp-desc-add">Description</Label>
                  <Input id="exp-desc-add" value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g., Coffee" required />
                </div>
                <div>
                  <Label htmlFor="exp-amount-add">Amount</Label>
                  <Input id="exp-amount-add" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g., 3.50" step="0.01" required />
                </div>
                <div>
                  <Label htmlFor="exp-type-add">Type</Label>
                  <Select value={type} onValueChange={(value) => setType(value as ExpenseType)} required> 
                    <SelectTrigger id="exp-type-add"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      {EXPENSE_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
                  <DialogClose asChild><Button type="submit">Add Expense</Button></DialogClose> 
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      <ScrollArea className="h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={isAllSelected ? true : (isIndeterminate ? 'indeterminate' : false)}
                  onCheckedChange={handleSelectAllExpenses}
                  aria-label="Select all expenses"
                  disabled={expenses.length === 0}
                />
              </TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No expenses logged yet.</TableCell></TableRow>
            ) : (
              expenses.map(expense => (
                <TableRow key={expense.id} data-state={selectedExpenses.has(expense.id) ? 'selected' : undefined}>
                  <TableCell>
                    <Checkbox
                      checked={selectedExpenses.has(expense.id)}
                      onCheckedChange={(checked) => handleSelectExpense(expense.id, !!checked)}
                      aria-label={`Select expense ${expense.description}`}
                    />
                  </TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.type}</TableCell>
                  <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => openEditExpenseDialog(expense)}>
                      <Edit3 size={16} /> <span className="sr-only">Edit</span>
                    </Button>
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

      {/* Edit Expense Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Expense</DialogTitle></DialogHeader>
          <form onSubmit={handleUpdateExpense} className="space-y-4">
            <div>
              <Label htmlFor="exp-date-edit">Date</Label>
              <Input id="exp-date-edit" type="date" value={editDate} onChange={e => setEditDate(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="exp-desc-edit">Description</Label>
              <Input id="exp-desc-edit" value={editDescription} onChange={e => setEditDescription(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="exp-amount-edit">Amount</Label>
              <Input id="exp-amount-edit" type="number" value={editAmount} onChange={e => setEditAmount(e.target.value)} step="0.01" required />
            </div>
            <div>
              <Label htmlFor="exp-type-edit">Type</Label>
              <Select value={editType} onValueChange={(value) => setEditType(value as ExpenseType)} required>
                <SelectTrigger id="exp-type-edit"><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  {EXPENSE_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SectionCard>
  );
}

    

"use client";

import { useState, type FormEvent } from 'react';
import { TrendingUp, PlusCircle, Trash2, Edit3 } from 'lucide-react';
import { SectionCard } from '@/components/shared/SectionCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import type { Investment } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';

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

  const [selectedInvestments, setSelectedInvestments] = useState<Set<string>>(new Set());
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEditingInvestment, setCurrentEditingInvestment] = useState<Investment | null>(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editComments, setEditComments] = useState('');
  const [editDate, setEditDate] = useState('');


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
    setSelectedInvestments(prev => {
      const newSelected = new Set(prev);
      newSelected.delete(id);
      return newSelected;
    });
  };

  const handleSelectAllInvestments = (checkedState: boolean | 'indeterminate') => {
    if (checkedState === true) {
      const allInvestmentIds = new Set(investments.map(inv => inv.id));
      setSelectedInvestments(allInvestmentIds);
    } else {
      setSelectedInvestments(new Set());
    }
  };

  const handleSelectInvestment = (investmentId: string, checked: boolean) => {
    setSelectedInvestments(prev => {
      const newSelected = new Set(prev);
      if (checked) {
        newSelected.add(investmentId);
      } else {
        newSelected.delete(investmentId);
      }
      return newSelected;
    });
  };

  const handleDeleteSelectedInvestments = () => {
    setInvestments(prev => prev.filter(inv => !selectedInvestments.has(inv.id)));
    setSelectedInvestments(new Set());
  };

  const openEditInvestmentDialog = (investment: Investment) => {
    setCurrentEditingInvestment(investment);
    setEditDescription(investment.description);
    setEditAmount(investment.amount.toString());
    setEditComments(investment.comments || '');
    setEditDate(investment.date);
    setIsEditDialogOpen(true);
  };

  const handleUpdateInvestment = (e: FormEvent) => {
    e.preventDefault();
    if (!currentEditingInvestment || !editDescription.trim() || !editAmount || !editDate) return;
    
    setInvestments(prev => prev.map(inv => 
        inv.id === currentEditingInvestment.id 
        ? { ...inv, description: editDescription, amount: parseFloat(editAmount), comments: editComments, date: editDate } 
        : inv
    ));
    setIsEditDialogOpen(false);
    setCurrentEditingInvestment(null);
  };

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

  const isAllSelected = investments.length > 0 && selectedInvestments.size === investments.length;
  const isIndeterminate = selectedInvestments.size > 0 && selectedInvestments.size < investments.length;

  return (
    <SectionCard 
      title="Investment Tracker" 
      icon={<TrendingUp size={24} />}
      action={
        <div className="flex items-center gap-2">
          {selectedInvestments.size > 0 && (
            <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={handleDeleteSelectedInvestments}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete ({selectedInvestments.size})
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Investment</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add New Investment</DialogTitle></DialogHeader>
              <form onSubmit={handleAddInvestment} className="space-y-4">
                <div>
                  <Label htmlFor="inv-date-add">Date</Label>
                  <Input id="inv-date-add" type="date" value={date} onChange={e => setDate(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="inv-desc-add">Description</Label>
                  <Input id="inv-desc-add" value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g., S&P 500 Index Fund" required />
                </div>
                <div>
                  <Label htmlFor="inv-amount-add">Amount</Label>
                  <Input id="inv-amount-add" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g., 500.00" step="0.01" required />
                </div>
                <div>
                  <Label htmlFor="inv-comments-add">Comments (Optional)</Label>
                  <Textarea id="inv-comments-add" value={comments} onChange={e => setComments(e.target.value)} placeholder="e.g., Dividend reinvestment" />
                </div>
                <DialogFooter>
                  <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
                  <DialogClose asChild><Button type="submit">Add Investment</Button></DialogClose>
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
                  onCheckedChange={handleSelectAllInvestments}
                  aria-label="Select all investments"
                  disabled={investments.length === 0}
                />
              </TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investments.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No investments logged yet.</TableCell></TableRow>
            ) : (
              investments.map(investment => (
                <TableRow key={investment.id} data-state={selectedInvestments.has(investment.id) ? 'selected' : undefined}>
                  <TableCell>
                    <Checkbox
                      checked={selectedInvestments.has(investment.id)}
                      onCheckedChange={(checked) => handleSelectInvestment(investment.id, !!checked)}
                      aria-label={`Select investment ${investment.description}`}
                    />
                  </TableCell>
                  <TableCell>{new Date(investment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{investment.description}</TableCell>
                  <TableCell className="text-right">${investment.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-xs">{investment.comments}</TableCell>
                   <TableCell className="text-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => openEditInvestmentDialog(investment)}>
                      <Edit3 size={16} /> <span className="sr-only">Edit</span>
                    </Button>
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

      {/* Edit Investment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Investment</DialogTitle></DialogHeader>
          <form onSubmit={handleUpdateInvestment} className="space-y-4">
            <div>
              <Label htmlFor="inv-date-edit">Date</Label>
              <Input id="inv-date-edit" type="date" value={editDate} onChange={e => setEditDate(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="inv-desc-edit">Description</Label>
              <Input id="inv-desc-edit" value={editDescription} onChange={e => setEditDescription(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="inv-amount-edit">Amount</Label>
              <Input id="inv-amount-edit" type="number" value={editAmount} onChange={e => setEditAmount(e.target.value)} step="0.01" required />
            </div>
            <div>
              <Label htmlFor="inv-comments-edit">Comments (Optional)</Label>
              <Textarea id="inv-comments-edit" value={editComments} onChange={e => setEditComments(e.target.value)} />
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

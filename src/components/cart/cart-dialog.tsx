"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";

interface CartDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDialog({ isOpen, onOpenChange }: CartDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </DialogTitle>
          <DialogDescription>
            Review your items before checking out.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <ScrollArea className="h-[300px] pr-4">
            {/* Cart items will go here */}
            <div className="flex flex-col gap-4">
              <div className="text-center text-muted-foreground">
                Your cart is empty
              </div>
            </div>
          </ScrollArea>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span>$0.00</span>
            </div>
            <Button className="w-full bg-eagles-green hover:bg-eagles-green/90">
              Checkout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

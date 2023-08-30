"use client"

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { useProModal } from '@/hooks/use-pro-modal'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import axios from 'axios'

function ProModal() {
    const proModal = useProModal()
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setIsMounted(true);
    }, []);


    const onSubscribe = async () => {
        try {
        setLoading(true);
        const response = await axios.get("/api/stripe");

        window.location.href = response.data.url;
        } catch (error) {
        toast({
            description: "Something went wrong",
            variant: "destructive",
        });
        } finally {
        setLoading(false);
        }
    }

    if (!isMounted) {
        return null;
    }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">
            Upgrade to Pro
          </DialogTitle>
          <DialogDescription className="text-center space-y-2">
            Create
            <span className="text-sky-500 mx-1 font-medium">Custom AI</span>
            Companions!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between">
          <p className="text-2xl font-medium">
            $9<span className="text-sm font-normal">.99 / mo</span>
          </p>
          <Button
           onClick={onSubscribe} 
           disabled={loading} 
           variant="premium">
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal
"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { X, Download } from "lucide-react"
import { toPng } from "html-to-image"
import { cn } from "@/lib/utils"

export interface Transaction {
  id: string
  customer: string
  email: string
  plan: string
  amount: string
  method: {
    type: string
    details: string
    icon?: React.ElementType
  }
  date: string
  status: "Approved" | "Failed" | "Pending"
  avatar: string
}

interface ReceiptModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
}

export function ReceiptModal({ isOpen, onClose, transaction }: ReceiptModalProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const receiptRef = React.useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (receiptRef.current === null || !transaction) return

    try {
      const dataUrl = await toPng(receiptRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        style: {
          borderRadius: '0',
          overflow: 'visible',
        }
      })
      
      const link = document.createElement("a")
      link.download = `receipt-${transaction.id}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error("Failed to download receipt:", err)
    }
  }

  if (!isOpen || !transaction || !mounted) return null

  const modalContent = (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          /* ABSOLUTE ISOLATION */
          body > *:not(.print-modal-container) {
            display: none !important;
          }
          
          html, body {
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            overflow: visible !important;
          }
          
          .print-modal-container {
            position: static !important;
            display: block !important;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
            z-index: auto !important;
          }
          
          .print-modal-container > div {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            max-height: none !important;
            border-radius: 0 !important;
            width: 100% !important;
            display: block !important;
            position: relative !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}} />
      
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm overflow-y-auto custom-scrollbar p-0 sm:p-4 print-modal-container">
        {/* Overlay Close Trigger */}
        <div className="fixed inset-0 z-0 print:hidden no-print" onClick={onClose} />
        
        {/* Modal Content container */}
        <div className="relative z-10 w-full max-w-md bg-white rounded-xl sm:rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 print:shadow-none print:rounded-none flex flex-col h-auto max-h-[95vh] print:max-h-none my-0 print:my-0 print:block">
          
          {/* Controls */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-[1100] print:hidden no-print">
            <button 
              onClick={handleDownload}
              className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/20 hover:border-white/30 hover:shadow-lg cursor-pointer"
              title="Download Receipt"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md border border-white/20 hover:border-white/30 hover:shadow-lg cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div 
            ref={receiptRef}
            className="flex-1 overflow-y-auto no-scrollbar rounded-xl sm:rounded-3xl print:overflow-visible print:block bg-white"
          >
            {/* Gradient Header */}
            <div className="relative p-8 sm:p-12 overflow-hidden print:bg-white print:text-slate-900" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)" }}>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay print:hidden" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl print:hidden" />
              <div className="absolute top-[-50px] left-[-20px] w-48 h-48 bg-purple-400/30 rounded-full blur-2xl print:hidden" />
              
              <div className="relative z-10 text-center mb-6 print:mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center p-3 shadow-xl transform rotate-3 print:rotate-0 print:shadow-none mb-6 print:mb-4 border border-white/20">
                  <Image src="/logo_dark.svg" alt="Recura" width={48} height={48} className="object-contain brightness-0 invert" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">Payment Receipt</h2>
                
                {/* Status Badge */}
                <div className={cn(
                  "inline-flex items-center gap-3 px-5 py-2 rounded-full border backdrop-blur-md transition-all mb-4",
                  transaction.status === "Approved" && "bg-emerald-500/20 text-white border-emerald-500/30",
                  transaction.status === "Failed" && "bg-rose-500/20 text-white border-rose-500/30",
                  transaction.status === "Pending" && "bg-blue-500/20 text-white border-blue-500/30"
                )}>
                  <span className={cn(
                    "w-2.5 h-2.5 rounded-full animate-pulse",
                    transaction.status === "Approved" && "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]",
                    transaction.status === "Failed" && "bg-rose-400 shadow-[0_0_10px_rgba(248,113,113,0.6)]",
                    transaction.status === "Pending" && "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.6)]"
                  )} />
                  <span className="text-[11px] font-black uppercase tracking-[0.1em]">{transaction.status}</span>
                </div>
              </div>

              <div className="relative z-10 text-center space-y-1">
                <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">Amount Paid</p>
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter mix-blend-overlay print:mix-blend-normal">{transaction.amount}</h1>
              </div>
            </div>

            {/* Receipt Body */}
            <div className="bg-white p-8 sm:p-12 pt-10 space-y-8 sm:space-y-10">
              
              {/* Receipt Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Date Paid</p>
                  <p className="text-xs font-bold text-slate-900">{transaction.date}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Receipt ID</p>
                  <p className="text-xs font-bold text-slate-900 truncate">#${transaction.id}</p>
                </div>
              </div>

              {/* Customer & Plan Details */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] flex items-center gap-4">
                  Details
                  <span className="flex-1 h-px bg-slate-100" />
                </h3>
                
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-slate-500">Customer</span>
                     <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-900">{transaction.customer}</p>
                          <p className="text-[9px] font-bold text-slate-400 lowercase">{transaction.email}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
                          <Image src={transaction.avatar} alt={transaction.customer} width={32} height={32} className="object-cover" />
                        </div>
                     </div>
                   </div>

                   <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-slate-500">Description</span>
                     <span className="text-xs font-black text-slate-900">{transaction.plan} Plan</span>
                   </div>

                   <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-slate-500">Method</span>
                     <div className="flex items-center gap-2">
                        {transaction.method.icon && <transaction.method.icon className="w-3.5 h-3.5 text-slate-400" />}
                        <span className="text-xs font-bold text-slate-900">{transaction.method.type}</span>
                     </div>
                   </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-10 border-t border-dashed border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 leading-relaxed max-w-[240px] mx-auto mb-8">
                  Questions? Reach out to our billing team at <span className="text-slate-900 underline pointer-events-auto cursor-pointer">billing@recura.tech</span>
                </p>
                
                <div className="relative w-20 h-20 mx-auto opacity-20 grayscale">
                    <Image src="/logo_dark.svg" alt="Recura" fill className="object-contain" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  )

  return createPortal(modalContent, document.body)
}

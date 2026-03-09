"use client"

import * as React from "react"
import Image from "next/image"
import { 
  Search, 
  ListFilter, 
  Printer, 
  FileSpreadsheet, 
  Eye, 
  Folder,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { billingInvoices, type Invoice } from "./mock-data"
import dynamic from "next/dynamic"

const InvoiceModal = dynamic(() => import("@/components/dashboard/shared/invoice-modal").then(mod => mod.InvoiceModal), {
  ssr: false,
})

const statusStyles = {
  Paid: "status-badge-active",
  Unpaid: "status-badge-canceled",
  Refund: "bg-indigo-50 text-indigo-600",
}

export function BillingTable() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [activeTab, setActiveTab] = React.useState("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const [showActions, setShowActions] = React.useState(false)
  
  // Invoice Modal State
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null)
  const [autoDownload, setAutoDownload] = React.useState(false)

  const itemsPerPage = 6

  const counts = {
    All: billingInvoices.length,
    Paid: billingInvoices.filter(i => i.status === "Paid").length,
    Unpaid: billingInvoices.filter(i => i.status === "Unpaid").length,
    Refunds: billingInvoices.filter(i => i.status === "Refund").length,
  }

  const filteredInvoices = billingInvoices.filter((item) => {
    const matchesTab = activeTab === "All" || (activeTab === "Refunds" ? item.status === "Refund" : item.status === activeTab)
    const matchesSearch = 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage)

  const handleTabChange = (label: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(label)
      setCurrentPage(1)
      setIsTransitioning(false)
    }, 200)
  }

  const handlePageChange = (page: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage(page)
      setIsTransitioning(false)
    }, 200)
  }

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsModalOpen(true)
    setAutoDownload(false)
  }

  const handlePrint = () => {
    const tableHeader = ["Invoice", "Customer", "Plan", "Amount", "Date", "Status"];
    const rows = filteredInvoices.map(i => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">${i.id}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: bold;">${i.customer}</span>
            <span style="font-size: 11px; color: #64748b;">${i.email}</span>
          </div>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${i.plan}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">${i.amount}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${i.date}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${i.status}</td>
      </tr>
    `).join("");

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice List - Print</title>
            <style>
              body { font-family: sans-serif; padding: 40px; color: #1e293b; }
              table { width: 100%; border-collapse: collapse; margin-top: 30px; }
              th { text-align: left; background: #f8fafc; padding: 14px; border-bottom: 2px solid #e2e8f0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; }
              td { font-size: 13px; }
              h1 { font-size: 28px; margin-bottom: 5px; color: #0f172a; }
              .logo { font-weight: 800; color: #7c3aed; font-size: 24px; margin-bottom: 20px; letter-spacing: -0.02em; }
              .meta { font-size: 12px; color: #94a3b8; margin-bottom: 30px; }
            </style>
          </head>
          <body>
            <div class="logo">Recura</div>
            <h1>Invoice List</h1>
            <div class="meta">Status: ${activeTab} • Generated on ${new Date().toLocaleDateString()}</div>
            <table>
              <thead>
                <tr>${tableHeader.map(h => `<th>${h}</th>`).join("")}</tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  const handleExport = () => {
    const headers = ["Invoice", "Customer", "Email", "Plan", "Amount", "Date", "Due Date", "Status"]
    const csvContent = [
      headers.join(","),
      ...filteredInvoices.map(i => [
        i.id,
        `"${i.customer}"`,
        `"${i.email}"`,
        `"${i.plan}"`,
        `"${i.amount}"`,
        i.date,
        i.dueDate,
        i.status
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `recura_invoices_${activeTab.toLowerCase()}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="dashboard-card bg-white border border-slate-100 rounded-3xl p-0 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="dashboard-search-container">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search customers, subscriptions, invoice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dashboard-search-input"
            />
          </div>
          
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <button 
              onClick={() => setShowActions(!showActions)}
              className={cn(
                "dashboard-action-toggle",
                showActions 
                  ? "dashboard-action-toggle-active" 
                  : "dashboard-action-toggle-inactive"
              )}
            >
              <ListFilter className="w-5 h-5" />
            </button>
            <div className={cn(
              "flex items-center gap-2 md:gap-3 transition-all duration-300 origin-right flex-wrap",
              showActions ? "opacity-100 translate-x-0 w-auto" : "opacity-0 translate-x-4 w-0 overflow-hidden"
            )}>
              <button onClick={handlePrint} className="dashboard-action-btn dashboard-action-btn-secondary">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button onClick={handleExport} className="dashboard-action-btn dashboard-action-btn-primary">
                <FileSpreadsheet className="w-4 h-4" /> Convert to Sheets
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {["All", "Paid", "Unpaid", "Refunds"].map((label) => (
            <button
              key={label}
              onClick={() => handleTabChange(label)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                activeTab === label 
                  ? "bg-purple-50 text-purple-600 shadow-sm shadow-purple-100" 
                  : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {label} ({counts[label as keyof typeof counts]})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-container border-t border-slate-50">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header-cell">
                <input 
                  type="checkbox" 
                  className="checkbox-custom"
                  checked={paginatedInvoices.length > 0 && paginatedInvoices.every(i => selectedIds.includes(i.id))}
                  onChange={(e) => {
                    const pageIds = paginatedInvoices.map(i => i.id)
                    if (e.target.checked) {
                      setSelectedIds(prev => [...new Set([...prev, ...pageIds])])
                    } else {
                      setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)))
                    }
                  }}
                />
              </th>
              <th className="table-header-cell">Invoice</th>
              <th className="table-header-cell">Customer</th>
              <th className="table-header-cell hidden lg:table-cell">Plan</th>
              <th className="table-header-cell">Amount</th>
              <th className="table-header-cell hidden md:table-cell">Date</th>
              <th className="table-header-cell hidden xl:table-cell">Due Date</th>
              <th className="table-header-cell">Status</th>
              <th className="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody className={cn(
            "divide-y divide-slate-50 transition-opacity duration-200",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}>
            {paginatedInvoices.map((invoice) => {
              const isSelected = selectedIds.includes(invoice.id)
              return (
                <tr key={invoice.id} className={cn(
                  "table-row-hover",
                  isSelected && "table-row-selected"
                )}>
                  <td className="table-data-cell">
                    <input 
                      type="checkbox" 
                      className="checkbox-custom"
                      checked={isSelected}
                      onChange={() => {
                        setSelectedIds(prev => 
                          isSelected 
                            ? prev.filter(id => id !== invoice.id)
                            : [...prev, invoice.id]
                        )
                      }}
                    />
                  </td>
                  <td className="table-data-cell font-bold text-slate-900">{invoice.id}</td>
                  <td className="table-data-cell">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                        {invoice.avatar ? (
                          <Image 
                            src={invoice.avatar} 
                            alt={invoice.customer} 
                            fill 
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-purple-100 text-purple-600 text-[10px] font-bold">
                            {invoice.customer.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-900 truncate">{invoice.customer}</span>
                        <span className="text-[10px] font-bold text-slate-400 lowercase truncate">{invoice.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="table-data-cell font-bold text-slate-600 hidden lg:table-cell">{invoice.plan}</td>
                  <td className="table-data-cell font-bold text-slate-900">{invoice.amount}</td>
                  <td className="table-data-cell font-bold text-slate-500 hidden md:table-cell">{invoice.date}</td>
                  <td className="table-data-cell font-bold text-slate-500 hidden xl:table-cell">{invoice.dueDate}</td>
                  <td className="table-data-cell">
                    <span className={cn("status-badge", statusStyles[invoice.status as keyof typeof statusStyles])}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="table-data-cell px-2 sm:px-6">
                    <div className="flex items-center gap-2 sm:gap-4 text-slate-400">
                      <button 
                        onClick={() => handleViewInvoice(invoice)}
                        className="hover:text-purple-600 transition-colors cursor-pointer p-1"
                        title="View Invoice"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {/* <button className="hover:text-purple-600 transition-colors cursor-pointer p-1 hidden sm:block" title="Archive">
                        <Folder className="w-5 h-5" />
                      </button> */}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {!isTransitioning && paginatedInvoices.length === 0 && (
          <div className="p-20 text-center text-slate-400 font-bold">No invoices found.</div>
        )}
      </div>

      {/* Pagination */}
      <div className="p-8 border-t border-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isTransitioning}
            className="pagination-btn"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={isTransitioning}
              className={cn(
                "pagination-page-btn",
                page === currentPage && "pagination-page-btn-active"
              )}
            >
              {page}
            </button>
          ))}
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isTransitioning}
            className="pagination-btn"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <InvoiceModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false)
          setAutoDownload(false)
        }} 
        invoice={selectedInvoice} 
        autoDownload={autoDownload}
      />
    </div>
  )
}

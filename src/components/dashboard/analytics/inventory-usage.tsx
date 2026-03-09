"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface InventoryData {
  name: string
  percentage: number
  sold: string
  stock: string
}

const data: InventoryData[] = [
  {
    name: "Premium Plan License",
    percentage: 99.7,
    sold: "1456",
    stock: "5"
  },
  {
    name: "Basic Plan License",
    percentage: 96.5,
    sold: "1245",
    stock: "45"
  },
  {
    name: "Enterprise Package",
    percentage: 98,
    sold: "146",
    stock: "3"
  },
  {
    name: "Professional Tools Pack",
    percentage: 88,
    sold: "234",
    stock: "32"
  }
]

export function InventoryUsage() {
  return (
    <div className="dashboard-card h-full">
      <h3 className="dashboard-title text-base md:text-lg mb-6">Inventory Usage Analytics</h3>
      
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-purple-600">{item.name}</span>
              <span className="text-slate-900">{item.percentage}%</span>
            </div>
            
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span>{item.sold} sold</span>
              <span>{item.stock} in stock</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

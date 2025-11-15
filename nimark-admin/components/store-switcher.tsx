"use client";

import React, { useState, useRef, useEffect } from "react";
import { Store } from "@prisma/client";
import { Search, Plus, ChevronDown, Check, Building2 } from "lucide-react";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface StoreSwitcherProps {
  items: Store[];
}

export default function StoreSwitcher({ items = [] }: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentStore = formattedItems.find((item) => item.value === params.storeId);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const filteredStores = formattedItems.filter((store) =>
    store.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onStoreSelect = (store: { value: string, label: string }) => {
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
    router.push(`/${store.value}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredStores.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredStores.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredStores.length) {
          onStoreSelect(filteredStores[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center justify-between w-72 px-4 py-3 text-left bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen ? "true" : "false"}
      >
        <div className="flex items-center space-x-3">
          <Building2 className="w-5 h-5 text-slate-500" />
          <span className="font-semibold text-slate-700 truncate">
            {currentStore?.label || "Select a store"}
          </span>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-72 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
            role="listbox"
          >
            <div className="p-3 border-b border-slate-100">
              <div className="flex items-center px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search stores..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setHighlightedIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent focus:outline-none text-sm text-slate-700 placeholder-slate-400"
                  autoFocus
                />
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {filteredStores.length === 0 ? (
                <div className="px-4 py-3 text-sm text-slate-500 text-center">
                  No stores found
                </div>
              ) : (
                filteredStores.map((store, index) => (
                  <button
                    key={store.value}
                    onClick={() => onStoreSelect(store)}
                    className={`flex items-center w-full px-4 py-3 text-sm text-left hover:bg-slate-50 transition-colors duration-150 ${
                      index === highlightedIndex ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
                    }`}
                    role="option"
                    aria-selected={index === highlightedIndex ? "true" : "false"}
                  >
                    <Building2 className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
                    <span className="flex-grow truncate">{store.label}</span>
                    {currentStore?.value === store.value && (
                      <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    )}
                  </button>
                ))
              )}
            </div>

            <div className="p-3 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchTerm("");
                  setHighlightedIndex(-1);
                  storeModal.onOpen();
                }}
                className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Store
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
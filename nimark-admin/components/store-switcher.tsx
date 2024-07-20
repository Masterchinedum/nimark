"use client";

import React, { useState, useRef, useEffect } from "react";
import { Store } from "@prisma/client";
import { Search, Plus, ChevronDown } from "lucide-react";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";

interface StoreSwitcherProps {
  items: Store[];
}

export default function StoreSwitcher({ items = [] }: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentStore = formattedItems.find((item) => item.value === params.storeId);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onStoreSelect = (store: { value: string, label: string }) => {
    setIsOpen(false);
    router.push(`/${store.value}`);
  };

  const filteredStores = formattedItems.filter((store) =>
    store.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-64 px-4 py-2 text-left bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <span className="font-medium text-gray-700 truncate">
          {currentStore?.label || "Select a store"}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-64 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out">
          <div className="p-2">
            <div className="flex items-center px-3 py-2 bg-gray-50 rounded-md">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredStores.map((store) => (
              <button
                key={store.value}
                onClick={() => onStoreSelect(store)}
                className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-blue-50 transition-colors duration-150"
              >
                <span className="flex-grow truncate">{store.label}</span>
                {currentStore?.value === store.value && (
                  <span className="ml-2 text-blue-600 font-medium">Active</span>
                )}
              </button>
            ))}
          </div>

          <div className="p-2 border-t border-gray-100">
            <button
              onClick={() => {
                setIsOpen(false);
                storeModal.onOpen();
              }}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Store
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
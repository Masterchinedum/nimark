"use client";

import React, { useState } from "react";
import { Store } from "@prisma/client";
import { Search, Plus, ChevronDown, Check } from "lucide-react";
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

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentStore = formattedItems.find((item) => item.value === params.storeId);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const onStoreSelect = (store: { value: string, label: string }) => {
    setIsOpen(false);
    router.push(`/${store.value}`);
  };

  const filteredStores = formattedItems.filter((store) =>
    store.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-64 px-4 py-2 text-left bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <span className="font-medium text-gray-700">
          {currentStore?.label || "Select a store"}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-64 mt-2 bg-white rounded-lg shadow-xl"
          >
            <div className="p-2">
              <div className="flex items-center px-3 py-2 bg-gray-100 rounded-md">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search stores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-sm text-gray-700"
                />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto">
              {filteredStores.map((store) => (
                <button
                  key={store.value}
                  onClick={() => onStoreSelect(store)}
                  className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors duration-150"
                >
                  <span className="flex-grow">{store.label}</span>
                  {currentStore?.value === store.value && (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                </button>
              ))};
            </div>

            <div className="p-2 border-t">
              <button
                onClick={() => {
                  setIsOpen(false);
                  storeModal.onOpen();
                }}
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-150"
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
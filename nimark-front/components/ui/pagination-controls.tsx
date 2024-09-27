import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  categoryId: string;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  categoryId,
}) => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <Link href={`/products/${categoryId}?page=${currentPage - 1}`} passHref>
        <Button
          disabled={currentPage <= 1}
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
      </Link>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <Link href={`/products/${categoryId}?page=${currentPage + 1}`} passHref>
        <Button
          disabled={currentPage >= totalPages}
          variant="outline"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
};

export default PaginationControls;
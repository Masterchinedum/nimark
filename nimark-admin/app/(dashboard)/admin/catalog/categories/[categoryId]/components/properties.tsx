import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from 'lucide-react';

interface PropertiesProps {
  properties: {name: string, values: string}[];
  onAddProperty: () => void;
  onRemoveProperty: (index: number) => void;
  onNameChange: (index: number, property: {name: string, values: string}, name: string) => void;
  onValuesChange: (index: number, property: {name: string, values: string}, values: string) => void;
}

const Properties: React.FC<PropertiesProps> = ({ 
  properties, 
  onAddProperty, 
  onRemoveProperty, 
  onNameChange, 
  onValuesChange 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Properties</h3>
        <Button
          onClick={onAddProperty}
          type="button"
          variant="outline"
          size="sm"
        >
          Add new property
        </Button>
      </div>
      {properties.length > 0 && properties.map((property, index) => (
        <div key={index} className="flex gap-2">
          <Input
            type="text"
            value={property.name}
            onChange={ev => onNameChange(index, property, ev.target.value)}
            placeholder="property name (example: color)"
          />
          <Input
            type="text"
            onChange={ev => onValuesChange(index, property, ev.target.value)}
            value={property.values}
            placeholder="values, comma separated"
          />
          <Button
            onClick={() => onRemoveProperty(index)}
            type="button"
            variant="destructive"
            size="icon"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

export default Properties;
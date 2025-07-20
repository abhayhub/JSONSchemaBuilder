import { useState } from "react";
import type { Field } from "@/types";
import { FieldItem } from "@/components/FieldItem";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SchemaBuilder() {
  const [values, setValues] = useState<Field[]>([]);
  
  // adding fields
  const AddField = () => {
    setValues([
      ...values,
      {
        id: uuid(),
        name: "",
        type: "string",
        required: false,
      },
    ]);
  };
  
  // delete fields
  const deleteField = (idx: number) => {
  const updated = values.filter((_, i) => i !== idx);
  setValues(updated);
};

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 p-6">
        <h2 className="text-xl font-semibold mb-4">Schema Builder</h2>
        {values.map((field, idx) => (
          <FieldItem
          key={field.id}
          field={field}
          onChange={() => ()}
          onDelete={() => deleteField(idx)}
          />
          ))}
        <Button onClick={() => {AddField}}>+ Add Item</Button>
      </div>
      
      {/* ouput section */}
      <div className="w-1/2 p-6 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Live JSON Preview</h2>
        <Card className="p-4">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
            {}
          </pre>
        </Card>
      </div>
    </div>
  );
}

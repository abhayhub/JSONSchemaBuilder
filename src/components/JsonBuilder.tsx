import { useState } from "react";
import type { Field } from "@/types";
import { FieldItem } from "@/components/FieldItem";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function JsonBuilder() {
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

// updatefield values
const updateField = (idx: number, updated: Field) => {
  const newValues = [...values];
  newValues[idx] = updated;
  setValues(newValues);
};

// Generate json
const CreateJSON = (fields: Field[]): any => {

  const Output: any = {};

  fields.forEach((v) => {
    if (!v.name) return;
    if (v.type === "nested") {
      Output[v.name] = CreateJSON(v.children || []);
    } else {
      Output[v.name] = v.type === "string" ? "STRING" : "number";
    }
  });
  // console.log(Output);
  return Output;
};

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 p-6">
        <h2 className="text-xl font-semibold mb-4">Model Maker</h2>
        {values.map((field, idx) => (
          <FieldItem
          key={field.id}
          field={field}
          onChange={(updated) => (updateField(idx, updated))}
          onDelete={() => deleteField(idx)}
          />
          ))}
        <Button onClick={AddField}>+ Add Item</Button>
      </div>
      
      {/* ouput section */}
      <div className="w-1/2 p-6 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">JSON Preview</h2>
        <Card className="p-4">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
            {JSON.stringify(CreateJSON(values), null, 2)}
          </pre>
        </Card>
      </div>
    </div>
  );
}

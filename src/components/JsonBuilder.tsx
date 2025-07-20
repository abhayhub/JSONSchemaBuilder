import { useState } from "react";
import type { Field } from "@/types";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SchemaBuilder() {
  const [values, setValues] = useState<Field[]>([]);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 p-6">
        <h2 className="text-xl font-semibold mb-4">Schema Builder</h2>
        <Button onClick={() => {}}>+ Add Item</Button>
      </div>

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

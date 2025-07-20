import type { Field, FieldType } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuid } from "uuid";

// defined a interface
interface FieldItemProps {
  field: Field;
  onChange: (updated: Field) => void;
  onDelete: () => void;
}

export const FieldItem = ({ field, onChange, onDelete }: FieldItemProps) => {
  
  const updateField = (key: keyof Field, value: any) => {
    onChange({ ...field, [key]: value });
  };

  // Update child field
const updateChild = (index: number, updatedChild: Field) => {
  const updatedChildren = [...(field.children || [])];
  updatedChildren[index] = updatedChild;
  onChange({ ...field, children: updatedChildren });
};

//Add child field
const addChild = () => {
  const newChild: Field = {
    id: uuid(),
    name: "",
    type: "string",
    required: false,
  };
  onChange({
    ...field,
    children: [...(field.children || []), newChild],
  });
  // console.log("child added successfulyy");
};

// Delete child field
const deleteChild = (index: number) => {
  const updatedChildren = field.children?.filter((_, i) => i !== index);
  onChange({ ...field, children: updatedChildren });
};

  return (
      <div className="ml-4 mb-4 border-l pl-4">
      {/* Horizontal input row */}
      <div className="flex items-center gap-2 mb-2">
        <Input
        placeholder="Field name"
        value={field.name}
        onChange={(e) => updateField("name", e.target.value)}
        className="w-[160px]"
        />
      
      <Select
      value={field.type}
      onValueChange={(value: FieldType) => updateField("type", value)}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="string">string</SelectItem>
        <SelectItem value="number">number</SelectItem>
        <SelectItem value="nested">nested</SelectItem>
      </SelectContent>
    </Select>

    <Switch
      checked={field.required}
      onCheckedChange={(checked) => updateField("required", checked)}
    />

    <Button variant="ghost" size="icon" onClick={onDelete}>
      <Trash2 className="w-4 h-4 text-red-500" />
    </Button>
  </div>

  {/* Render children recursively */}
  {field.type === "nested" && (
    <div className="ml-4 mt-2">
      {(field.children || []).map((child, index) => (
        <FieldItem
          key={child.id}
          field={child}
          onChange={(updated) => updateChild(index, updated)}
          onDelete={() => deleteChild(index)}
        />
      ))}
      <Button onClick={addChild} className="mt-2">
        <Plus className="mr-2 w-4 h-4" />
        Add Item
      </Button>
    </div>
  )}
</div>
  );
};



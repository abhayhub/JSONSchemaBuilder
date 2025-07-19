import type { Field, FieldType } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "./ui/input";
import { Switch } from "@/components/ui/switch";

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

  return (
      <div className="ml-4 mb-4 border-l pl-4">
      <div className="flex items-center gap-2 mb-2">

        {/* Field name input */}
        <Input
          placeholder="Field name"
          value={field.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-[160px]"
        />
        {/* Type selector */}
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

        {/* Required switch */}
        <Switch
          checked={field.required}
          onCheckedChange={(checked) => updateField("required", checked)}
        />
        </div>
      </div>
  );
};




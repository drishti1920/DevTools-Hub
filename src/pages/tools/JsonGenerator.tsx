
import { useState, useEffect } from "react";
import { Copy, Download, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {  Form, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FieldType = "string" | "number" | "boolean" | "array" | "object";

interface SchemaField {
  id: string;
  name: string;
  type: FieldType;
  arrayOf?: FieldType;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  options?: string[];
}

export default function JsonGenerator() {
  const [schema, setSchema] = useState<SchemaField[]>([
    { id: "1", name: "id", type: "number", minValue: 1, maxValue: 1000 },
    { id: "2", name: "name", type: "string", minLength: 5, maxLength: 20 },
    { id: "3", name: "email", type: "string", minLength: 10, maxLength: 30 },
    { id: "4", name: "isActive", type: "boolean" },
  ]);
  
  const [generatedJSON, setGeneratedJSON] = useState<string>("");
  const [count, setCount] = useState<number>(5);
  
  const form = useForm<{ count: number }>({
    defaultValues: { count: 5 },
  });

  // Generate JSON data based on schema
  useEffect(() => {
    generateJSON();
  }, [schema, count]);

  const generateJSON = () => {
    try {
      const result = Array.from({ length: count }, (_, index) => {
        const item: Record<string, any> = {};
        
        schema.forEach((field) => {
          item[field.name] = generateValue(field, index);
        });
        
        return item;
      });
      
      setGeneratedJSON(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("Error generating JSON:", error);
      setGeneratedJSON("Error generating JSON");
    }
  };

  const generateValue = (field: SchemaField, index: number): any => {
    switch (field.type) {
      case "string":
        return `Sample ${field.name} ${index + 1}`;
      case "number":
        const min = field.minValue || 0;
        const max = field.maxValue || 100;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      case "boolean":
        return Math.random() > 0.5;
      case "array":
        return Array.from({ length: 3 }, (_, i) => 
          field.arrayOf === "string" ? `Item ${i+1}` : i+1
        );
      case "object":
        return { subKey: `Value ${index}` };
      default:
        return null;
    }
  };

  const addField = () => {
    const newId = String(Date.now());
    setSchema([...schema, { id: newId, name: `field${schema.length + 1}`, type: "string" }]);
  };

  const updateField = (id: string, updates: Partial<SchemaField>) => {
    setSchema(schema.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id: string) => {
    if (schema.length <= 1) {
      toast.error("You must have at least one field");
      return;
    }
    setSchema(schema.filter(field => field.id !== id));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedJSON);
    toast.success("JSON copied to clipboard");
  };

  const downloadJSON = () => {
    const blob = new Blob([generatedJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("JSON file downloaded");
  };

  return (
    <Form {...form}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Schema Editor</h2>
          <Button onClick={addField} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Field
          </Button>
        </div>
        
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {schema.map((field) => (
            <div 
              key={field.id} 
              className="p-4 bg-card border border-border rounded-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Input
                    value={field.name}
                    onChange={(e) => updateField(field.id, { name: e.target.value })}
                    placeholder="Field name"
                    className="w-32 md:w-auto"
                  />
                  <Select
                    value={field.type}
                    onValueChange={(value) => updateField(field.id, { type: value as FieldType })}
                  >
                    <SelectTrigger className="w-28 md:w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="string">String</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="boolean">Boolean</SelectItem>
                      <SelectItem value="array">Array</SelectItem>
                      <SelectItem value="object">Object</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeField(field.id)}
                >
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              
              {field.type === "string" && (
                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Min Length</FormLabel>
                    <Input
                      type="number"
                      value={field.minLength || ""}
                      onChange={(e) => updateField(field.id, { minLength: parseInt(e.target.value) || undefined })}
                    />
                  </FormItem>
                  <FormItem>
                    <FormLabel>Max Length</FormLabel>
                    <Input
                      type="number"
                      value={field.maxLength || ""}
                      onChange={(e) => updateField(field.id, { maxLength: parseInt(e.target.value) || undefined })}
                    />
                  </FormItem>
                </div>
              )}
              
              {field.type === "number" && (
                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Min Value</FormLabel>
                    <Input
                      type="number"
                      value={field.minValue || ""}
                      onChange={(e) => updateField(field.id, { minValue: parseInt(e.target.value) || undefined })}
                    />
                  </FormItem>
                  <FormItem>
                    <FormLabel>Max Value</FormLabel>
                    <Input
                      type="number"
                      value={field.maxValue || ""}
                      onChange={(e) => updateField(field.id, { maxValue: parseInt(e.target.value) || undefined })}
                    />
                  </FormItem>
                </div>
              )}
              
              {field.type === "array" && (
                <div className="grid grid-cols-1 gap-4">
                  <FormItem>
                    <FormLabel>Array Of</FormLabel>
                    <Select
                      value={field.arrayOf || "string"}
                      onValueChange={(value) => updateField(field.id, { arrayOf: value as FieldType })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div>
          <FormItem>
            <FormLabel>Number of Items</FormLabel>
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              />
              <Button variant="outline" onClick={generateJSON}>Regenerate</Button>
            </div>
          </FormItem>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Generated JSON</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-1" /> Copy
            </Button>
            <Button variant="outline" size="sm" onClick={downloadJSON}>
              <Download className="h-4 w-4 mr-1" /> Download
            </Button>
          </div>
        </div>
        
        <div className="bg-background border border-border rounded-lg p-4 overflow-auto max-h-[650px]">
          <pre className="text-sm font-mono whitespace-pre-wrap">{generatedJSON}</pre>
        </div>
      </div>
    </div>
    </Form>
  );
}

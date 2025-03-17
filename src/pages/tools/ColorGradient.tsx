import { useState, useEffect } from "react";
import { Copy, Plus, Trash, RotateCcw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

type GradientType = "linear" | "radial";
type Direction =
  | "to right"
  | "to left"
  | "to top"
  | "to bottom"
  | "to top right"
  | "to top left"
  | "to bottom right"
  | "to bottom left"
  | "45deg"
  | "90deg"
  | "135deg"
  | "180deg"
  | "225deg"
  | "270deg"
  | "315deg"
  | "0deg";

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export default function ColorGradient() {
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [direction, setDirection] = useState<Direction>("to right");
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: "1", color: "#9b87f5", position: 0 },
    { id: "2", color: "#6E59A5", position: 100 },
  ]);

  const [cssCode, setCssCode] = useState<string>("");
  const [gradientPreview, setGradientPreview] = useState<string>("");
  const form = useForm();

  useEffect(() => {
    updateGradient();
  }, [gradientType, direction, colorStops]);

  const updateGradient = () => {
    // Sort color stops by position
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);

    // Generate gradient CSS
    const stopsString = sortedStops
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(", ");

    let gradientCSS = "";
    if (gradientType === "linear") {
      gradientCSS = `linear-gradient(${direction}, ${stopsString})`;
    } else {
      gradientCSS = `radial-gradient(circle, ${stopsString})`;
    }

    setGradientPreview(gradientCSS);
    setCssCode(`background: ${gradientCSS};`);
  };

  const addColorStop = () => {
    if (colorStops.length >= 10) {
      toast.error("Maximum 10 color stops allowed");
      return;
    }

    const newId = String(Date.now());
    const lastPosition =
      colorStops.length > 0 ? colorStops[colorStops.length - 1].position : 0;

    const newPosition = Math.min(lastPosition + 25, 100);
    const newColor = getRandomColor();

    setColorStops([
      ...colorStops,
      { id: newId, color: newColor, position: newPosition },
    ]);
  };

  const updateColorStop = (id: string, updates: Partial<ColorStop>) => {
    setColorStops(
      colorStops.map((stop) =>
        stop.id === id ? { ...stop, ...updates } : stop
      )
    );
  };

  const removeColorStop = (id: string) => {
    if (colorStops.length <= 2) {
      toast.error("At least two color stops are required");
      return;
    }

    setColorStops(colorStops.filter((stop) => stop.id !== id));
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const resetGradient = () => {
    setGradientType("linear");
    setDirection("to right");
    setColorStops([
      { id: "1", color: "#9b87f5", position: 0 },
      { id: "2", color: "#6E59A5", position: 100 },
    ]);
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(cssCode);
    toast.success("CSS copied to clipboard");
  };

  const downloadSVG = () => {
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
        <defs>
          <${gradientType}Gradient id="grad1" ${
      gradientType === "linear"
        ? 'x1="0%" y1="0%" x2="100%" y2="0%"'
        : 'cx="50%" cy="50%" r="50%"'
    }>
            ${colorStops
              .sort((a, b) => a.position - b.position)
              .map(
                (stop) =>
                  `<stop offset="${stop.position}%" style="stop-color:${stop.color}" />`
              )
              .join("")}
          </${gradientType}Gradient>
        </defs>
        <rect width="800" height="600" fill="url(#grad1)" />
      </svg>
    `;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gradient.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("SVG file downloaded");
  };

  return (
    <Form {...form}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Gradient Editor</h2>
            <Button variant="ghost" size="sm" onClick={resetGradient}>
              <RotateCcw className="h-4 w-4 mr-1" /> Reset
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>Gradient Type</FormLabel>
                <Select
                  value={gradientType}
                  onValueChange={(value) =>
                    setGradientType(value as GradientType)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="radial">Radial</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>

              {gradientType === "linear" && (
                <FormItem>
                  <FormLabel>Direction</FormLabel>
                  <Select
                    value={direction}
                    onValueChange={(value) => setDirection(value as Direction)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="to right">Right</SelectItem>
                      <SelectItem value="to left">Left</SelectItem>
                      <SelectItem value="to top">Top</SelectItem>
                      <SelectItem value="to bottom">Bottom</SelectItem>
                      <SelectItem value="to top right">Top Right</SelectItem>
                      <SelectItem value="to top left">Top Left</SelectItem>
                      <SelectItem value="to bottom right">
                        Bottom Right
                      </SelectItem>
                      <SelectItem value="to bottom left">
                        Bottom Left
                      </SelectItem>
                      <SelectItem value="45deg">45°</SelectItem>
                      <SelectItem value="90deg">90°</SelectItem>
                      <SelectItem value="135deg">135°</SelectItem>
                      <SelectItem value="180deg">180°</SelectItem>
                      <SelectItem value="225deg">225°</SelectItem>
                      <SelectItem value="270deg">270°</SelectItem>
                      <SelectItem value="315deg">315°</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Color Stops</h3>
                <Button size="sm" onClick={addColorStop}>
                  <Plus className="h-4 w-4 mr-1" /> Add Color
                </Button>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {colorStops.map((stop) => (
                  <div
                    key={stop.id}
                    className="flex items-center gap-2 p-3 bg-card border border-border rounded-lg"
                  >
                    <div
                      className="w-10 h-10 rounded-md border border-border flex-shrink-0"
                      style={{ backgroundColor: stop.color }}
                    />

                    <Input
                      type="color"
                      value={stop.color}
                      onChange={(e) =>
                        updateColorStop(stop.id, { color: e.target.value })
                      }
                      className="w-16 h-10 p-1"
                    />

                    <div className="flex-grow">
                      <Input
                        type="text"
                        value={stop.color}
                        onChange={(e) =>
                          updateColorStop(stop.id, { color: e.target.value })
                        }
                        className="font-mono text-sm"
                      />
                    </div>

                    <div className="w-24 flex-shrink-0">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={stop.position}
                        onChange={(e) =>
                          updateColorStop(stop.id, {
                            position: Number(e.target.value),
                          })
                        }
                      />
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeColorStop(stop.id)}
                      className="flex-shrink-0"
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Preview</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyCSS}>
                <Copy className="h-4 w-4 mr-1" /> Copy CSS
              </Button>
              <Button variant="outline" size="sm" onClick={downloadSVG}>
                <Download className="h-4 w-4 mr-1" /> Download SVG
              </Button>
            </div>
          </div>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="w-full md:w-auto mb-4 p-1 bg-card">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="css">CSS Code</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-0">
              <div
                className="h-[400px] rounded-xl border border-border flex items-center justify-center overflow-hidden"
                style={{ background: gradientPreview }}
              >
                <div className="bg-card/40 backdrop-blur-sm px-6 py-3 rounded-lg text-center">
                  <h3 className="font-semibold">Your Gradient</h3>
                  <p className="text-sm text-muted-foreground">
                    {colorStops.length} color stops
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="css" className="mt-0">
              <div className="bg-background border border-border rounded-lg p-4 h-[400px] overflow-auto">
                <pre className="text-sm font-mono whitespace-pre-wrap">
                  {cssCode}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Form>
  );
}

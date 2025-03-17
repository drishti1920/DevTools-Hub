
import { Code, FileJson, PaintBucket, Scissors, Slash, FileCode, Image, FileUp, TerminalSquare } from "lucide-react";
import ToolCard from "../ToolCard";

export default function ToolGrid() {
  const tools = [
    {
      title: "JSON Generator",
      description: "Generate structured fake JSON data for testing and development.",
      icon: <FileJson className="h-6 w-6" />,
      href: "/tools/json-generator",
      available: true,
    },
    {
      title: "SVG to JSX",
      description: "Convert SVG files to React JSX components with one click.",
      icon: <Code className="h-6 w-6" />,
      href: "/tools/svg-jsx",
      available: true,
    },
    {
      title: "Color Gradient",
      description: "Create beautiful gradients for your web projects.",
      icon: <PaintBucket className="h-6 w-6" />,
      href: "/tools/gradient",
      available: true,
    },
    {
      title: "Background Remover",
      description: "Remove backgrounds from images using AI technology.",
      icon: <Scissors className="h-6 w-6" />,
      href: "/tools/background-remover",
      available: false,
    },
    {
      title: "Base64 Encoder",
      description: "Encode and decode Base64 strings and files.",
      icon: <Slash className="h-6 w-6" />,
      href: "/tools/base64",
      available: true,
    },
    {
      title: "Code Formatter",
      description: "Format your code with different styling options.",
      icon: <FileCode className="h-6 w-6" />,
      href: "/tools/formatter",
      available: false,
    },
    {
      title: "Image Optimizer",
      description: "Compress and optimize images for web use.",
      icon: <Image className="h-6 w-6" />,
      href: "/tools/image-optimizer",
      available: false,
    },
    {
      title: "File Converter",
      description: "Convert between various file formats.",
      icon: <FileUp className="h-6 w-6" />,
      href: "/tools/converter",
      available: false,
    },
    {
      title: "RegEx Tester",
      description: "Test and debug regular expressions with live validation.",
      icon: <TerminalSquare className="h-6 w-6" />,
      href: "/tools/regex",
      available: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard
          key={tool.title}
          title={tool.title}
          description={tool.description}
          icon={tool.icon}
          href={tool.href}
          available={tool.available}
        />
      ))}
    </div>
  );
}

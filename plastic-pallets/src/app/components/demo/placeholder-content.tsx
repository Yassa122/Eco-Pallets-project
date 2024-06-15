// components/demo/placeholder-content.tsx
import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PlaceholderContentProps {
  children?: ReactNode;
}

const PlaceholderContent: React.FC<PlaceholderContentProps> = ({
  children,
}) => {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="flex flex-col relative w-full">{children}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceholderContent;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SummaryCard({ summary }: { summary: string }) {
  return (
    <Card>
      <CardHeader>
         <CardTitle className="text-green-700">English Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{summary}</p>
      </CardContent>
    </Card>
  );
}

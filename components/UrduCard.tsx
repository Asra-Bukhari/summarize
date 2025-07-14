import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UrduCard({ summary }: { summary: string }) {
  return (
    <Card dir="rtl">
  <CardHeader>
    <CardTitle className="text-green-700">اردو خلاصہ</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-gray-900 font-urdu text-right leading-loose whitespace-pre-line" dir="rtl">
      {summary}
    </p>
  </CardContent>
</Card>
  );
}


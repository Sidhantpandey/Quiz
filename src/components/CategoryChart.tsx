import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

interface CategoryChartProps {
  data: {
    anxiety: number;
    depression: number;
    stress: number;
    social: number;
    emotional: number;
  };
}

export default function CategoryChart({ data }: CategoryChartProps) {
  const chartData = [
    { category: 'Anxiety', value: data.anxiety, fullMark: 100 },
    { category: 'Depression', value: data.depression, fullMark: 100 },
    { category: 'Stress', value: data.stress, fullMark: 100 },
    { category: 'Social', value: data.social, fullMark: 100 },
    { category: 'Emotional', value: data.emotional, fullMark: 100 },
  ];

  return (
    <div className="h-[400px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid 
            gridType="polygon" 
            stroke="hsl(var(--muted-foreground))"
            opacity={0.2}
          />
          <PolarAngleAxis
            dataKey="category"
            tick={{ 
              fill: 'hsl(var(--card-foreground))',
              fontSize: 14
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ 
              fill: 'hsl(var(--card-foreground))'
            }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Score']}
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--card-foreground))'
            }}
          />
          <Radar
            name="Category Score"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
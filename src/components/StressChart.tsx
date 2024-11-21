import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';

interface StressChartProps {
  data: number[];
}

export default function StressChart({ data }: StressChartProps) {
  // Convert raw answers to stress scores (inverted and normalized to 100%)
  const chartData = data.map((value, index) => ({
    question: index + 1,
    stress: value !== undefined ? ((3 - value) / 3) * 100 : null,
    average: data.reduce((acc, curr) => curr !== undefined ? acc + ((3 - curr) / 3) * 100 : acc, 0) / data.filter(v => v !== undefined).length
  }));

  const stressLevels = [
    { value: 75, label: 'High Stress', color: '#ef4444' },
    { value: 50, label: 'Moderate Stress', color: '#f59e0b' },
    { value: 25, label: 'Low Stress', color: '#10b981' }
  ];

  return (
    <div className="h-[400px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.1} />
          <XAxis 
            dataKey="question" 
            label={{ 
              value: 'Question Number', 
              position: 'insideBottom', 
              offset: -10,
              style: { fill: 'hsl(var(--muted-foreground))' }
            }}
            stroke="hsl(var(--muted-foreground))"
            tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            label={{ 
              value: 'Stress Level (%)', 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: 'hsl(var(--muted-foreground))' }
            }}
            domain={[0, 100]}
            stroke="hsl(var(--muted-foreground))"
            tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip 
            formatter={(value: number) => [`${value?.toFixed(1)}%`, 'Stress Level']}
            labelFormatter={(label) => `Question ${label}`}
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--card-foreground))'
            }}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{
              color: 'hsl(var(--card-foreground))'
            }}
          />
          
          {/* Reference lines for stress levels */}
          {stressLevels.map(({ value, label, color }) => (
            <ReferenceLine 
              key={label}
              y={value}
              label={{ 
                value: label,
                fill: color,
                position: 'right'
              }}
              stroke={color}
              strokeDasharray="3 3"
              opacity={0.6}
            />
          ))}

          {/* Average stress line */}
          <ReferenceLine 
            y={chartData[0]?.average} 
            label={{ 
              value: "Average",
              fill: "hsl(var(--primary))",
              position: 'right'
            }}
            stroke="hsl(var(--primary))"
            strokeDasharray="3 3"
          />

          {/* Main stress level line */}
          <Line 
            name="Stress Level"
            type="monotone" 
            dataKey="stress" 
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ 
              r: 6, 
              strokeWidth: 2, 
              fill: "hsl(var(--card))",
              stroke: "hsl(var(--primary))"
            }}
            activeDot={{ 
              r: 8, 
              stroke: "hsl(var(--primary))",
              strokeWidth: 2
            }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
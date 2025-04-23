import React from 'react';
import { Card } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { calculateRiskScore } from '../utils/scoring';
import { Customer } from '../types';

interface Props {
  data: Customer[];
}

const COLORS = ['#f5222d', '#faad14', '#52c41a'];

const RiskDistributionChart = ({ data }: Props) => {
  const scoreDistribution = data.reduce<{ [key: string]: number }>((acc, c) => {
    const score = calculateRiskScore(c);
    const bucket = score < 40 ? 'High' : score < 70 ? 'Medium' : 'Low';
    acc[bucket] = (acc[bucket] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(scoreDistribution).map(([name, value]) => ({ name, value }));

  return (
    <Card title="Risk Score Distribution">
      <PieChart width={320} height={320}>
        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
          {pieData.map((_, i) => <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Card>
  );
};

export default RiskDistributionChart;
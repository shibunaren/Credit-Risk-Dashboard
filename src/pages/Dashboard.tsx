import React, { useEffect, useState, useMemo } from 'react';
import { Card, Col, Row, Statistic, Table, Tag, Select, Input } from 'antd';
import { fetchCustomers, updateCustomerStatus } from '../services/api';
import { calculateRiskScore, getScoreTagColor } from '../utils/scoring';
import { Customer } from '../types';
import RiskDistributionChart from '../components/RiskDistributionChart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers().then(setData);
  }, []);

  const handleStatusChange = async (value: string, customerId: string) => {
    await updateCustomerStatus(customerId, value);
    setData(prev =>
      prev.map(c =>
        c.customerId === customerId ? { ...c, status: value as 'Review' | 'Approved' | 'Rejected' } : c
      )
    );
  };

  const filteredData = useMemo(
    () => data.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [data, searchTerm]
  );

  const columns = [
    { title: 'Customer ID', dataIndex: 'customerId', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Income', dataIndex: 'monthlyIncome', key: 'income' },
    { title: 'Expenses', dataIndex: 'monthlyExpenses', key: 'expenses' },
    { title: 'Credit Score', dataIndex: 'creditScore', key: 'credit' },
    {
      title: 'Risk Score',
      key: 'riskScore',
      render: (_: unknown, record: Customer) => {
        const score = calculateRiskScore(record);
        return <Tag color={getScoreTagColor(score)}>{score.toFixed(2)}</Tag>;
      },
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: unknown, record: Customer) => (
        <Select
          defaultValue={record.status}
          onChange={value => handleStatusChange(value, record.customerId)}
          style={{ minWidth: 120 }}
        >
          <Select.Option value="Review">Review</Select.Option>
          <Select.Option value="Approved">Approved</Select.Option>
          <Select.Option value="Rejected">Rejected</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card><Statistic title="Total Customers" value={data.length} /></Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card><Statistic title="Avg. Credit Score" value={(data.reduce((a, b) => a + b.creditScore, 0) / data.length || 0).toFixed(0)} /></Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card><Statistic title="Total Loans" value={data.reduce((a, b) => a + b.outstandingLoans, 0)} /></Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card><Statistic title="Total Balance" value={data.reduce((a, b) => a + b.accountBalance, 0)} /></Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} md={12}>
          <RiskDistributionChart data={data} />
        </Col>
        <Col xs={24} md={12}>
          <Card title="Income vs Expenses (Dummy Time Series)">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.map(c => ({ name: c.name, income: c.monthlyIncome, expenses: c.monthlyExpenses }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#1890ff" />
                <Line type="monotone" dataKey="expenses" stroke="#f5222d" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4" title="Customer Data">
        <Input.Search
          placeholder="Search by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ marginBottom: '1rem', width: '100%', maxWidth: 400 }}
        />
        <Table
          rowKey="customerId"
          columns={columns}
          dataSource={filteredData}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;

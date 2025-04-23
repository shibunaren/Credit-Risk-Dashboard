import { Customer } from '../types';

export function calculateRiskScore(customer: Customer): number {
  const { creditScore, loanRepaymentHistory, outstandingLoans, monthlyIncome } = customer;
  const repaymentRatio = loanRepaymentHistory.filter(p => p === 1).length / loanRepaymentHistory.length;
  const loanToIncome = outstandingLoans / (monthlyIncome || 1);
  return Math.min(100, (700 - creditScore) / 10 + (1 - repaymentRatio) * 40 + loanToIncome * 20);
}

export function getScoreTagColor(score: number): string {
  if (score > 70) return 'red';
  if (score > 40) return 'gold';
  return 'green';
}
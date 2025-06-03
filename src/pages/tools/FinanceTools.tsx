import React, { useState } from 'react';

function FinanceTools() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Finance Tools</h1>
        
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Loan Calculator</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Amount
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter loan amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter interest rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Term (years)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter loan term"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                />
              </div>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                Calculate
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Currency Converter</h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Currency
                  </label>
                  <select className="w-full p-2 border rounded">
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To Currency
                  </label>
                  <select className="w-full p-2 border rounded">
                    <option value="EUR">EUR - Euro</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter amount"
                />
              </div>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                Convert
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Compound Interest Calculator</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Principal Amount
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter principal amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter interest rate"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Period (years)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  placeholder="Enter time period"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compound Frequency
                </label>
                <select className="w-full p-2 border rounded">
                  <option value="1">Annually</option>
                  <option value="2">Semi-annually</option>
                  <option value="4">Quarterly</option>
                  <option value="12">Monthly</option>
                </select>
              </div>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                Calculate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinanceTools;
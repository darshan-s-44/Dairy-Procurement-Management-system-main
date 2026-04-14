import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronUp, ChevronDown, Download } from 'lucide-react';
import GlassCard from './GlassCard';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
  isDarkMode?: boolean;
  onExport?: () => void;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  isDarkMode = false,
  onExport
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item =>
      columns.some(column =>
        String(item[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, sortConfig, columns]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard isDarkMode={isDarkMode} className="overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h3>
            
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg border transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-white/20' 
                      : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-white/50'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              
              {/* Export Button */}
              {onExport && (
                <motion.button
                  onClick={onExport}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' 
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Export</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-4 text-left text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    } ${column.sortable ? 'cursor-pointer hover:text-blue-500' : ''}`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {column.sortable && (
                        <div className="flex flex-col">
                          <ChevronUp 
                            className={`w-3 h-3 ${
                              sortConfig?.key === column.key && sortConfig.direction === 'asc'
                                ? 'text-blue-500' 
                                : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`} 
                          />
                          <ChevronDown 
                            className={`w-3 h-3 -mt-1 ${
                              sortConfig?.key === column.key && sortConfig.direction === 'desc'
                                ? 'text-blue-500' 
                                : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                            }`} 
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className={`text-5xl mb-4 ${isDarkMode ? 'opacity-30' : 'opacity-20'}`}>📊</div>
                      <p className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        No Data Found
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {data.length === 0
                          ? 'No records available yet'
                          : 'No results match your search criteria'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAndSortedData.map((row, index) => (
                  <motion.tr
                    key={index}
                    className={`border-b transition-colors duration-200 ${
                      isDarkMode
                        ? 'border-white/5 hover:bg-white/5'
                        : 'border-black/5 hover:bg-black/5'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        {row[column.key]}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing {filteredAndSortedData.length} of {data.length} entries
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default DataTable;
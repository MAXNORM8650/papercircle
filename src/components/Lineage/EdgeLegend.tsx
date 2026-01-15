import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface EdgeLegendProps {
  onFilterChange?: (selectedTypes: string[]) => void;
  showAIFilter?: boolean;
  aiFilterEnabled?: boolean;
  onAIFilterToggle?: (enabled: boolean) => void;
}

interface EdgeTypeInfo {
  type: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

const EDGE_TYPES: EdgeTypeInfo[] = [
  {
    type: 'extends',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    description: 'Builds upon or extends previous work',
  },
  {
    type: 'applies',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300',
    description: 'Applies methods/techniques to new domain',
  },
  {
    type: 'evaluates',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
    description: 'Compares or evaluates existing approach',
  },
  {
    type: 'contradicts',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    description: 'Challenges or contradicts findings',
  },
  {
    type: 'survey',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    description: 'Surveys or reviews an area',
  },
  {
    type: 'prerequisite',
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-300',
    description: 'Required background knowledge',
  },
];

export function EdgeLegend({
  onFilterChange,
  showAIFilter = true,
  aiFilterEnabled = true,
  onAIFilterToggle,
}: EdgeLegendProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(
    new Set(EDGE_TYPES.map((e) => e.type))
  );

  const handleTypeToggle = (type: string) => {
    const newSelected = new Set(selectedTypes);
    if (newSelected.has(type)) {
      newSelected.delete(type);
    } else {
      newSelected.add(type);
    }
    setSelectedTypes(newSelected);
    onFilterChange?.(Array.from(newSelected));
  };

  const handleSelectAll = () => {
    const allTypes = new Set(EDGE_TYPES.map((e) => e.type));
    setSelectedTypes(allTypes);
    onFilterChange?.(Array.from(allTypes));
  };

  const handleDeselectAll = () => {
    setSelectedTypes(new Set());
    onFilterChange?.([]);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-lg"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-semibold text-gray-900">
            Relationship Types
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* Quick Actions */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSelectAll}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Select All
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={handleDeselectAll}
              className="text-xs text-gray-600 hover:text-gray-700 font-medium"
            >
              Deselect All
            </button>
          </div>

          {/* Edge Types */}
          <div className="space-y-2">
            {EDGE_TYPES.map((edgeType) => {
              const isSelected = selectedTypes.has(edgeType.type);
              return (
                <div
                  key={edgeType.type}
                  onClick={() => handleTypeToggle(edgeType.type)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? `${edgeType.bgColor} ${edgeType.borderColor}`
                      : 'bg-gray-50 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-sm font-semibold capitalize ${
                        isSelected ? edgeType.color : 'text-gray-500'
                      }`}
                    >
                      {edgeType.type}
                    </span>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    {edgeType.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* AI-Generated Filter */}
          {showAIFilter && (
            <>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-0.5 border-t-2 border-dashed border-blue-400"></div>
                      <span className="text-sm font-semibold text-blue-900">
                        AI-Generated
                      </span>
                    </div>
                    <p className="text-xs text-blue-700">
                      Relationships discovered by analysis
                    </p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiFilterEnabled}
                      onChange={(e) => onAIFilterToggle?.(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              {/* Confidence Indicators */}
              <div className="border-t border-gray-200 pt-3">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Confidence Levels
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">
                      High (&gt; 80%)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">
                      Medium (50-80%)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">
                      Low (&lt; 50%)
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { ChevronDown, ChevronUp, Tag, Filter, Sparkles, BookOpen, Building2, Brain } from 'lucide-react';

export interface SearchTag {
  id: string;
  label: string;
  category: 'quality' | 'type' | 'venue' | 'area';
  prompt_modifier: string;
  description: string;
}

interface SearchTagsSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

// Predefined tags organized by category
const PREDEFINED_TAGS: SearchTag[] = [
  // Quality Filters
  {
    id: 'high_citations',
    label: 'High Citations',
    category: 'quality',
    prompt_modifier: 'with high citation counts',
    description: 'Prioritize highly cited papers'
  },
  {
    id: 'recent',
    label: 'Recent Papers (2024+)',
    category: 'quality',
    prompt_modifier: 'published in 2024-2026',
    description: 'Focus on papers from 2024 onwards'
  },
  {
    id: 'novel',
    label: 'Novel Approaches',
    category: 'quality',
    prompt_modifier: 'with novel approaches',
    description: 'Emphasize papers with innovative methods'
  },

  // Paper Types
  {
    id: 'survey',
    label: 'Survey Papers',
    category: 'type',
    prompt_modifier: 'survey or review papers',
    description: 'Survey and review papers only'
  },
  {
    id: 'empirical',
    label: 'Empirical Studies',
    category: 'type',
    prompt_modifier: 'empirical studies with experiments',
    description: 'Papers with experimental validation'
  },
  {
    id: 'theoretical',
    label: 'Theoretical',
    category: 'type',
    prompt_modifier: 'theoretical papers',
    description: 'Theory-focused papers'
  },
  {
    id: 'position',
    label: 'Position Papers',
    category: 'type',
    prompt_modifier: 'position papers',
    description: 'Opinion and perspective papers'
  },

  // Venues
  {
    id: 'top_conferences',
    label: 'Top Conferences',
    category: 'venue',
    prompt_modifier: 'from top conferences (CVPR, NeurIPS, ICLR, ICML, ACL, EMNLP, etc.)',
    description: 'Papers from premier conferences'
  },
  {
    id: 'journals',
    label: 'Journals',
    category: 'venue',
    prompt_modifier: 'from peer-reviewed journals',
    description: 'Journal publications only'
  },
  {
    id: 'workshops',
    label: 'Workshops',
    category: 'venue',
    prompt_modifier: 'from workshops',
    description: 'Workshop papers'
  },
  {
    id: 'preprints',
    label: 'Preprints',
    category: 'venue',
    prompt_modifier: 'from arXiv or other preprint servers',
    description: 'Preprint papers (arXiv, bioRxiv, etc.)'
  },

  // Research Areas
  {
    id: 'computer_vision',
    label: 'Computer Vision',
    category: 'area',
    prompt_modifier: 'in computer vision',
    description: 'Computer vision research'
  },
  {
    id: 'nlp',
    label: 'Natural Language Processing',
    category: 'area',
    prompt_modifier: 'in natural language processing',
    description: 'NLP and language models'
  },
  {
    id: 'machine_learning',
    label: 'Machine Learning',
    category: 'area',
    prompt_modifier: 'in machine learning',
    description: 'General machine learning'
  },
  {
    id: 'robotics',
    label: 'Robotics',
    category: 'area',
    prompt_modifier: 'in robotics',
    description: 'Robotics and autonomous systems'
  },
  {
    id: 'hci',
    label: 'Human-Computer Interaction',
    category: 'area',
    prompt_modifier: 'in human-computer interaction',
    description: 'HCI and user interfaces'
  },
  {
    id: 'systems',
    label: 'Systems & Architecture',
    category: 'area',
    prompt_modifier: 'in computer systems and architecture',
    description: 'Systems, architecture, and infrastructure'
  }
];

const CATEGORY_CONFIG = {
  quality: {
    icon: Sparkles,
    label: 'Quality Filters',
    color: 'blue'
  },
  type: {
    icon: BookOpen,
    label: 'Paper Types',
    color: 'purple'
  },
  venue: {
    icon: Building2,
    label: 'Venues',
    color: 'green'
  },
  area: {
    icon: Brain,
    label: 'Research Areas',
    color: 'orange'
  }
};

export function SearchTagsSelector({ selectedTags, onTagsChange }: SearchTagsSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onTagsChange(selectedTags.filter(id => id !== tagId));
    } else {
      onTagsChange([...selectedTags, tagId]);
    }
  };

  const clearAllTags = () => {
    onTagsChange([]);
  };

  const getTagsByCategory = (category: SearchTag['category']) => {
    return PREDEFINED_TAGS.filter(tag => tag.category === category);
  };

  const renderCategory = (category: SearchTag['category']) => {
    const tags = getTagsByCategory(category);
    const config = CATEGORY_CONFIG[category];
    const Icon = config.icon;
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200',
      green: 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200'
    };
    const selectedColorClasses = {
      blue: 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700',
      purple: 'bg-purple-600 text-white border-purple-700 hover:bg-purple-700',
      green: 'bg-green-600 text-white border-green-700 hover:bg-green-700',
      orange: 'bg-orange-600 text-white border-orange-700 hover:bg-orange-700'
    };

    return (
      <div key={category} className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-gray-600" />
          <h4 className="text-sm font-semibold text-gray-700">{config.label}</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => {
            const isSelected = selectedTags.includes(tag.id);
            return (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  isSelected
                    ? selectedColorClasses[config.color]
                    : colorClasses[config.color]
                }`}
                title={tag.description}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      {/* Header - Collapsible Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-700">Advanced Search Options</span>
          {selectedTags.length > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              {selectedTags.length} selected
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4 mt-4">
            <p className="text-sm text-gray-600">
              Select tags to enhance your research discovery with specific criteria
            </p>
            {selectedTags.length > 0 && (
              <button
                onClick={clearAllTags}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Tag Categories */}
          <div className="space-y-4">
            {renderCategory('quality')}
            {renderCategory('type')}
            {renderCategory('venue')}
            {renderCategory('area')}
          </div>

          {/* Selected Tags Preview */}
          {selectedTags.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Selected Filters ({selectedTags.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map(tagId => {
                  const tag = PREDEFINED_TAGS.find(t => t.id === tagId);
                  if (!tag) return null;
                  const config = CATEGORY_CONFIG[tag.category];
                  return (
                    <span
                      key={tagId}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag.label}
                      <button
                        onClick={() => toggleTag(tagId)}
                        className="hover:bg-gray-200 rounded-full p-0.5"
                      >
                        <span className="text-xs">×</span>
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Export helper to get prompt modifiers for selected tags
export function getPromptModifiers(selectedTagIds: string[]): string[] {
  return selectedTagIds
    .map(id => PREDEFINED_TAGS.find(tag => tag.id === id)?.prompt_modifier)
    .filter((modifier): modifier is string => Boolean(modifier));
}

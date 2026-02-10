import { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Hash, MessageCircle, Type, Smile, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  getAllSigns,
  searchSigns,
  type ExtendedSignData,
} from '@/data/extendedSignData';
import { getAllISLSigns, searchISLSigns } from '@/data/islSignData';
import type { SignLanguageType } from '@/components/LanguageToggle';

const categoryIcons = {
  letter: Type,
  number: Hash,
  phrase: MessageCircle,
  word: BookOpen,
  expression: Smile,
};

const categoryLabels = {
  letter: 'Letters',
  number: 'Numbers',
  phrase: 'Phrases',
  word: 'Words',
  expression: 'Expressions',
};

const difficultyColors = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
};

interface SignLibraryProps {
  language: SignLanguageType;
}

const SignLibrary = ({ language }: SignLibraryProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExtendedSignData['category'] | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<ExtendedSignData['difficulty'] | 'all'>('all');
  const [expandedSign, setExpandedSign] = useState<string | null>(null);

  const filteredSigns = useMemo(() => {
    let signs = language === 'ISL' ? getAllISLSigns() : getAllSigns();

    if (searchQuery) {
      signs = language === 'ISL' ? searchISLSigns(searchQuery) : searchSigns(searchQuery);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      signs = signs.filter(sign => sign.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      signs = signs.filter(sign => sign.difficulty === selectedDifficulty);
    }

    return signs;
  }, [searchQuery, selectedCategory, selectedDifficulty, language]);

  const categoryCounts = useMemo(() => {
    const allSigns = language === 'ISL' ? getAllISLSigns() : getAllSigns();
    return {
      all: allSigns.length,
      letter: allSigns.filter(s => s.category === 'letter').length,
      number: allSigns.filter(s => s.category === 'number').length,
      phrase: allSigns.filter(s => s.category === 'phrase').length,
      word: allSigns.filter(s => s.category === 'word').length,
      expression: allSigns.filter(s => s.category === 'expression').length,
    };
  }, [language]);

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl font-bold mb-4">
          {language === 'ISL' ? 'ISL' : 'ASL'} Sign Language <span className="gradient-text">Library</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our comprehensive collection of {language === 'ISL' ? 'Indian' : 'American'} Sign Language signs including the alphabet, numbers, phrases, and expressions.
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search signs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 border-white/10"
            />
          </div>

          {/* Category Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 min-w-[160px] justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  {selectedCategory === 'all' ? 'All Categories' : categoryLabels[selectedCategory]}
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-card border-white/10">
              <DropdownMenuItem onClick={() => setSelectedCategory('all')}>
                All Categories ({categoryCounts.all})
              </DropdownMenuItem>
              {(Object.keys(categoryLabels) as ExtendedSignData['category'][]).map(cat => {
                const Icon = categoryIcons[cat];
                return (
                  <DropdownMenuItem key={cat} onClick={() => setSelectedCategory(cat)}>
                    <Icon className="w-4 h-4 mr-2" />
                    {categoryLabels[cat]} ({categoryCounts[cat]})
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Difficulty Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 min-w-[140px] justify-between">
                <span>
                  {selectedDifficulty === 'all' ? 'All Levels' : selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
                </span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-card border-white/10">
              <DropdownMenuItem onClick={() => setSelectedDifficulty('all')}>
                All Levels
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDifficulty('beginner')}>
                Beginner
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDifficulty('intermediate')}>
                Intermediate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDifficulty('advanced')}>
                Advanced
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredSigns.length} signs
        </div>
      </div>

      {/* Category Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
          className="gap-2"
        >
          All
          <Badge variant="secondary" className="ml-1">{categoryCounts.all}</Badge>
        </Button>
        {(Object.keys(categoryLabels) as ExtendedSignData['category'][]).map(cat => {
          const Icon = categoryIcons[cat];
          return (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="gap-2"
            >
              <Icon className="w-4 h-4" />
              {categoryLabels[cat]}
              <Badge variant="secondary" className="ml-1">{categoryCounts[cat]}</Badge>
            </Button>
          );
        })}
      </div>

      {/* Signs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredSigns.map((sign) => {
          const Icon = categoryIcons[sign.category];
          const isExpanded = expandedSign === sign.sign;
          
          return (
            <div
              key={`${sign.category}-${sign.sign}`}
              className={`glass-card p-4 cursor-pointer transition-all duration-300 hover:border-primary/30 ${
                isExpanded ? 'col-span-2 row-span-2 md:col-span-2' : ''
              }`}
              onClick={() => setExpandedSign(isExpanded ? null : sign.sign)}
            >
              {/* Sign Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="font-display font-bold text-lg text-primary">{sign.sign}</span>
                  </div>
                </div>
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>

              {/* Difficulty Badge */}
              <Badge className={`${difficultyColors[sign.difficulty]} text-xs mb-2`}>
                {sign.difficulty}
              </Badge>

              {/* Description - Always visible */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {sign.description}
              </p>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-3 animate-fade-in">
                  <div>
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Hand Shape</span>
                    <p className="text-sm text-muted-foreground">{sign.handShape}</p>
                  </div>
                  {sign.movement && (
                    <div>
                      <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Movement</span>
                      <p className="text-sm text-muted-foreground">{sign.movement}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Category</span>
                    <p className="text-sm text-muted-foreground capitalize">{sign.category}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredSigns.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="font-display text-xl font-semibold mb-2">No signs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </section>
  );
};

export default SignLibrary;

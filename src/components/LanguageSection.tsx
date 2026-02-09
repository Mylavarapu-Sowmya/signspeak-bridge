import { useState } from 'react';
import { Globe, Users, Check, Lock, Info, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { signLanguages, type SignLanguageInfo } from '@/data/extendedSignData';

const LanguageSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<SignLanguageInfo | null>(null);

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl font-bold mb-4">
          Sign Language <span className="gradient-text">Systems</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Sign languages vary around the world. Each country and region has developed its own unique sign language with distinct grammar and vocabulary.
        </p>
      </div>

      {/* Language Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {signLanguages.map((language) => (
          <div
            key={language.code}
            className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
              language.supported ? 'hover:border-primary/30' : 'opacity-75 hover:border-white/20'
            }`}
            onClick={() => setSelectedLanguage(language)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5">
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                  <span className="font-display font-bold text-sm">{language.code}</span>
                </div>
              </div>
              {language.supported ? (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Check className="w-3 h-3 mr-1" />
                  Supported
                </Badge>
              ) : (
                <Badge className="bg-muted text-muted-foreground">
                  <Lock className="w-3 h-3 mr-1" />
                  Coming Soon
                </Badge>
              )}
            </div>

            {/* Name & Region */}
            <h3 className="font-display font-semibold text-lg mb-1">{language.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Globe className="w-4 h-4" />
              {language.region}
            </div>

            {/* Users */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Users className="w-4 h-4" />
              {language.users} users
            </div>

            {/* Learn More */}
            <Button 
              variant="ghost" 
              className="w-full gap-2 group"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLanguage(language);
              }}
            >
              Learn More
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-12 glass-card p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Info className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold mb-2">About Sign Language Diversity</h3>
          <p className="text-muted-foreground text-sm">
            There are over 300 different sign languages used around the world. Unlike spoken languages, 
            sign languages are not universal - American Sign Language (ASL) is completely different from 
            British Sign Language (BSL), even though both countries speak English. Each sign language has 
            its own grammar, syntax, and cultural nuances. We're starting with ASL as it's one of the most 
            widely used sign languages, with plans to add more in the future.
          </p>
        </div>
      </div>

      {/* Language Detail Modal */}
      <Dialog open={!!selectedLanguage} onOpenChange={() => setSelectedLanguage(null)}>
        <DialogContent className="max-w-xl glass-card border-white/10">
          {selectedLanguage && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5">
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <span className="font-display font-bold text-xl">{selectedLanguage.code}</span>
                    </div>
                  </div>
                  <div>
                    <DialogTitle className="font-display text-2xl flex items-center gap-3">
                      {selectedLanguage.name}
                      {selectedLanguage.supported ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Supported
                        </Badge>
                      ) : (
                        <Badge className="bg-muted text-muted-foreground">
                          Coming Soon
                        </Badge>
                      )}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-2 mt-1">
                      <Globe className="w-4 h-4" />
                      {selectedLanguage.region}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Description */}
                <div>
                  <p className="text-muted-foreground">{selectedLanguage.description}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold">{selectedLanguage.users}</div>
                      <div className="text-xs text-muted-foreground">Estimated Users</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedLanguage.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support Status */}
                {!selectedLanguage.supported && (
                  <div className="bg-muted/30 rounded-xl p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Coming Soon
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      We're working on adding support for {selectedLanguage.name}. This will include 
                      the full alphabet, numbers, and common phrases specific to this sign language system.
                    </p>
                  </div>
                )}

                {selectedLanguage.supported && (
                  <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-400">
                      <Check className="w-4 h-4" />
                      Fully Supported
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedLanguage.name} is fully supported with the complete alphabet (A-Z), 
                      numbers (0-20), and 50+ common phrases and expressions.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default LanguageSection;

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Clock, Zap, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface Supplement {
  id: string;
  name: string;
  category: string;
  purpose: string;
  timing: string;
  dosage: string;
  pros: string[];
  cons: string[];
  icon: string;
  goals: string[];
  description: string;
  faqs: { question: string; answer: string; }[];
}

const SupplementGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('all');

  const supplements: Supplement[] = [
    {
      id: '1',
      name: 'Whey Protein',
      category: 'Protein',
      purpose: 'Muscle building and recovery',
      timing: 'Post-workout or between meals',
      dosage: '25-30g per serving, 1-2 times daily',
      pros: ['Fast absorption', 'Complete amino acid profile', 'Convenient', 'Well-researched'],
      cons: ['Dairy-based (lactose)', 'Can be expensive', 'Not suitable for vegans'],
      icon: '🥛',
      goals: ['bulking', 'general'],
      description: 'High-quality complete protein derived from milk, ideal for muscle building and recovery.',
      faqs: [
        { question: 'When is the best time to take whey protein?', answer: 'Within 30 minutes post-workout for optimal muscle protein synthesis.' },
        { question: 'Can I take whey protein on rest days?', answer: 'Yes, it helps maintain protein intake and muscle recovery.' }
      ]
    },
    {
      id: '2',
      name: 'Creatine Monohydrate',
      category: 'Performance',
      purpose: 'Increased strength, power, and muscle volume',
      timing: 'Anytime (consistency matters more than timing)',
      dosage: '3-5g daily, loading phase optional (20g for 5 days)',
      pros: ['Proven effective', 'Increases strength', 'Improves power output', 'Inexpensive'],
      cons: ['Water retention', 'Some non-responders', 'Requires consistent use'],
      icon: '⚡',
      goals: ['bulking', 'general'],
      description: 'The most researched supplement for improving strength, power, and muscle mass.',
      faqs: [
        { question: 'Do I need to load creatine?', answer: 'Loading is optional. 3-5g daily will saturate muscles over 3-4 weeks.' },
        { question: 'Does creatine cause hair loss?', answer: 'Limited evidence suggests this. Most studies show no connection.' }
      ]
    },
    {
      id: '3',
      name: 'BCAAs',
      category: 'Amino Acids',
      purpose: 'Muscle preservation during training',
      timing: 'During or post-workout',
      dosage: '10-15g with 2:1:1 ratio (leucine:isoleucine:valine)',
      pros: ['May reduce muscle soreness', 'Can prevent muscle breakdown', 'Good taste'],
      cons: ['Less effective than complete proteins', 'Expensive per gram of protein', 'Limited benefits if eating enough protein'],
      icon: '🔗',
      goals: ['cutting', 'general'],
      description: 'Branched-chain amino acids that may help with muscle preservation and recovery.',
      faqs: [
        { question: 'Are BCAAs better than whey protein?', answer: 'No, whey contains BCAAs plus other essential amino acids.' },
        { question: 'Should I take BCAAs if I eat enough protein?', answer: 'Probably not necessary if meeting daily protein needs.' }
      ]
    },
    {
      id: '4',
      name: 'Pre-Workout',
      category: 'Performance',
      purpose: 'Increased energy, focus, and workout performance',
      timing: '15-30 minutes before training',
      dosage: 'Follow product instructions (typically 1 scoop)',
      pros: ['Increased energy and focus', 'Better pumps', 'Improved performance', 'Motivation boost'],
      cons: ['Can cause jitters', 'Tolerance buildup', 'May affect sleep', 'Expensive'],
      icon: '🚀',
      goals: ['bulking', 'cutting', 'general'],
      description: 'Combination of caffeine, amino acids, and other compounds to enhance workout performance.',
      faqs: [
        { question: 'Can I take pre-workout every day?', answer: 'Best to cycle on and off to prevent tolerance buildup.' },
        { question: 'Will pre-workout affect my sleep?', answer: 'Avoid within 6 hours of bedtime due to caffeine content.' }
      ]
    },
    {
      id: '5',
      name: 'Fish Oil',
      category: 'Health',
      purpose: 'Heart health, brain function, and inflammation reduction',
      timing: 'With meals to improve absorption',
      dosage: '1-3g of combined EPA/DHA daily',
      pros: ['Heart health benefits', 'Reduces inflammation', 'Brain health', 'Joint health'],
      cons: ['Fishy aftertaste', 'Quality varies', 'Can go rancid', 'Blood thinning effects'],
      icon: '🐟',
      goals: ['general', 'cutting'],
      description: 'Essential fatty acids important for overall health, inflammation control, and recovery.',
      faqs: [
        { question: 'Can I get enough omega-3s from food?', answer: 'Possible but difficult without regular fatty fish consumption.' },
        { question: 'How do I avoid fishy burps?', answer: 'Take with meals, freeze capsules, or choose enteric-coated versions.' }
      ]
    },
    {
      id: '6',
      name: 'Multivitamins',
      category: 'Health',
      purpose: 'Fill nutritional gaps and support overall health',
      timing: 'With breakfast or as directed',
      dosage: 'As per product instructions (usually 1-2 tablets)',
      pros: ['Insurance against deficiencies', 'Convenient', 'Broad spectrum coverage', 'Peace of mind'],
      cons: ['Not a substitute for good diet', 'Absorption issues', 'Expensive urine', 'Quality varies'],
      icon: '💊',
      goals: ['general', 'cutting'],
      description: 'Comprehensive vitamin and mineral formula to support overall health and fill dietary gaps.',
      faqs: [
        { question: 'Do I need a multivitamin if I eat well?', answer: 'Probably not, but can serve as insurance for micronutrient gaps.' },
        { question: 'When is the best time to take multivitamins?', answer: 'With food to improve absorption and reduce stomach upset.' }
      ]
    },
    {
      id: '7',
      name: 'Beta-Alanine',
      category: 'Performance',
      purpose: 'Improved muscular endurance and reduced fatigue',
      timing: 'Pre-workout or throughout the day',
      dosage: '3-5g daily, split into smaller doses',
      pros: ['Improves muscular endurance', 'Reduces fatigue', 'Well-researched', 'Synergistic with creatine'],
      cons: ['Tingling sensation', 'Must be taken consistently', 'Benefits take weeks to appear'],
      icon: '🏃',
      goals: ['bulking', 'general'],
      description: 'Amino acid that buffers lactic acid buildup, improving muscular endurance.',
      faqs: [
        { question: 'Why does beta-alanine make me tingle?', answer: 'Harmless paresthesia effect. Take smaller doses to minimize.' },
        { question: 'How long until I see benefits?', answer: 'Typically 2-4 weeks of consistent use.' }
      ]
    },
    {
      id: '8',
      name: 'Glutamine',
      category: 'Recovery',
      purpose: 'Recovery and immune system support',
      timing: 'Post-workout or before bed',
      dosage: '5-10g per serving',
      pros: ['May aid recovery', 'Immune system support', 'Gut health', 'Generally safe'],
      cons: ['Limited evidence for healthy individuals', 'Expensive', 'Body produces naturally', 'Questionable necessity'],
      icon: '🛡️',
      goals: ['general'],
      description: 'Conditionally essential amino acid that may support recovery and immune function.',
      faqs: [
        { question: 'Do I need glutamine if I eat protein?', answer: 'Probably not, as protein sources contain glutamine.' },
        { question: 'Is glutamine worth the cost?', answer: 'Limited evidence for benefits in healthy, well-fed individuals.' }
      ]
    },
    {
      id: '9',
      name: 'Casein Protein',
      category: 'Protein',
      purpose: 'Slow-digesting protein for sustained amino acid release',
      timing: 'Before bed or between meals',
      dosage: '25-40g per serving',
      pros: ['Slow digestion', 'Sustained amino acid release', 'Good before bed', 'High in calcium'],
      cons: ['More expensive than whey', 'Thick texture', 'Dairy-based', 'Slower absorption'],
      icon: '🌙',
      goals: ['bulking', 'general'],
      description: 'Slow-digesting milk protein ideal for sustained protein release, especially overnight.',
      faqs: [
        { question: 'Is casein better than whey at night?', answer: 'May provide more sustained amino acid release for overnight recovery.' },
        { question: 'Can I mix casein and whey?', answer: 'Yes, this can provide both fast and slow protein release.' }
      ]
    },
    {
      id: '10',
      name: 'Mass Gainers',
      category: 'Weight Gain',
      purpose: 'High-calorie supplement for weight and muscle gain',
      timing: 'Between meals or post-workout',
      dosage: 'As needed to meet caloric goals (typically 1-2 servings)',
      pros: ['High calorie content', 'Convenient', 'Usually includes protein', 'Good for hard gainers'],
      cons: ['Often high in sugar', 'Expensive per calorie', 'May cause digestive issues', 'Not nutrient-dense'],
      icon: '📈',
      goals: ['bulking'],
      description: 'High-calorie powder designed to help increase daily caloric intake for weight gain.',
      faqs: [
        { question: 'Are mass gainers better than whole foods?', answer: 'No, whole foods are generally more nutritious and cost-effective.' },
        { question: 'Who should use mass gainers?', answer: 'Those struggling to eat enough calories despite eating frequent meals.' }
      ]
    }
  ];

  const goals = [
    { id: 'all', name: 'All Goals', icon: '🎯' },
    { id: 'bulking', name: 'Bulking', icon: '💪' },
    { id: 'cutting', name: 'Cutting', icon: '🔥' },
    { id: 'general', name: 'General Health', icon: '❤️' }
  ];

  const categories = ['All', 'Protein', 'Performance', 'Health', 'Amino Acids', 'Recovery', 'Weight Gain'];

  const filteredSupplements = supplements.filter(supplement => {
    const matchesSearch = supplement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplement.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGoal = selectedGoal === 'all' || supplement.goals.includes(selectedGoal);
    return matchesSearch && matchesGoal;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Supplement Guide
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Evidence-based information on fitness supplements to help you make informed decisions
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search supplements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-purple-400 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              {goals.map((goal) => (
                <Button
                  key={goal.id}
                  variant={selectedGoal === goal.id ? "default" : "outline"}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`${
                    selectedGoal === goal.id
                      ? 'bg-purple-600 text-white'
                      : 'border-gray-600 text-gray-400 hover:bg-gray-800'
                  } transition-all duration-200`}
                >
                  {goal.icon} {goal.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Supplements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSupplements.map((supplement, index) => (
              <Card key={supplement.id} className="bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{supplement.icon}</div>
                    <div>
                      <CardTitle className="text-lg text-white">{supplement.name}</CardTitle>
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300 mt-1">
                        {supplement.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">{supplement.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-blue-400 font-medium">Purpose: </span>
                        <span className="text-gray-300">{supplement.purpose}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-green-400 font-medium">Timing: </span>
                        <span className="text-gray-300">{supplement.timing}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-yellow-400 font-medium">Dosage: </span>
                        <span className="text-gray-300">{supplement.dosage}</span>
                      </div>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="pros-cons" className="border-gray-700">
                      <AccordionTrigger className="text-white hover:text-purple-400">
                        Pros & Cons
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <h5 className="text-green-400 font-medium mb-2">Pros:</h5>
                            <ul className="list-disc list-inside space-y-1">
                              {supplement.pros.map((pro, i) => (
                                <li key={i} className="text-gray-300 text-sm">{pro}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-red-400 font-medium mb-2">Cons:</h5>
                            <ul className="list-disc list-inside space-y-1">
                              {supplement.cons.map((con, i) => (
                                <li key={i} className="text-gray-300 text-sm">{con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="faqs" className="border-gray-700">
                      <AccordionTrigger className="text-white hover:text-purple-400">
                        FAQs
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {supplement.faqs.map((faq, i) => (
                            <div key={i}>
                              <h6 className="text-purple-400 font-medium text-sm mb-1">{faq.question}</h6>
                              <p className="text-gray-300 text-sm">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {supplement.goals.map((goal) => (
                      <Badge key={goal} variant="outline" className="text-xs border-purple-400 text-purple-400">
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSupplements.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No supplements found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SupplementGuide;

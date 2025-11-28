import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [activeSection, setActiveSection] = useState('products');

  const products = [
    {
      id: 411,
      name: 'Infernus',
      image: 'https://cdn.poehali.dev/projects/c6699cdc-ad48-4dfe-a891-2e69f50ec36b/files/d212d0a8-914a-45b5-a363-7b17b4f4d976.jpg',
      description: 'Данный автомобиль доступен только администрации но вы его можете купить у администрации за 20.000.000',
      price: '20.000.000',
      badge: null,
    },
    {
      id: 468,
      name: 'Sanchez',
      image: 'https://cdn.poehali.dev/projects/c6699cdc-ad48-4dfe-a891-2e69f50ec36b/files/06dfd094-7a58-4445-bd4e-3a79466723cd.jpg',
      description: 'Название данной модели Sanchez редкость 90 процентов',
      price: '15.000.000',
      badge: { text: 'Редкость 90%', color: 'secondary' },
    },
    {
      id: 470,
      name: 'Patriot',
      image: 'https://cdn.poehali.dev/projects/c6699cdc-ad48-4dfe-a891-2e69f50ec36b/files/0636a00a-c772-41ac-bdf1-dbbc5483fe96.jpg',
      description: 'Данный автомобиль очень редкий но на него сейчас акция 10 процентов из а этого он стоит 56.235.423 Миллионов',
      price: '56.235.423',
      badge: { text: 'АКЦИЯ -10%', color: 'destructive' },
    },
  ];

  const handleTelegramClick = () => {
    toast.info('В разработке', {
      description: 'Функция в разработке',
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-card/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Arizona <span className="text-primary">Legacy</span>
              </h1>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={activeSection === 'products' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('products')}
                className="font-display"
              >
                <Icon name="Car" size={18} className="mr-2" />
                Товары
              </Button>
              <Button
                variant={activeSection === 'donate' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('donate')}
                className="font-display"
              >
                <Icon name="Coins" size={18} className="mr-2" />
                Донат
              </Button>
              <Button
                variant={activeSection === 'telegram' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('telegram')}
                className="font-display"
              >
                <Icon name="Send" size={18} className="mr-2" />
                Телеграмм
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'products' && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-display font-bold mb-4 text-foreground">
                Эксклюзивные <span className="text-primary">Транспортные Средства</span>
              </h2>
              <p className="text-muted-foreground text-lg font-body">
                Премиальные автомобили для вашей коллекции
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card 
                  key={product.id} 
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary bg-card/50 backdrop-blur"
                >
                  <CardHeader className="relative p-0">
                    {product.badge && (
                      <Badge 
                        variant={product.badge.color as 'secondary' | 'destructive'}
                        className={`absolute top-4 right-4 z-10 text-sm font-display font-bold px-4 py-2 ${
                          product.badge.color === 'destructive' ? 'animate-pulse-glow' : ''
                        }`}
                      >
                        {product.badge.text}
                      </Badge>
                    )}
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <CardTitle className="text-2xl font-display font-bold mb-3 text-foreground flex items-center gap-2">
                      {product.name}
                      <Badge variant="outline" className="text-xs font-mono">
                        ID {product.id}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed font-body text-muted-foreground">
                      {product.description}
                    </CardDescription>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground font-body">Стоимость</span>
                      <span className="text-3xl font-display font-bold text-primary">
                        {product.price}
                      </span>
                    </div>
                    <Button size="lg" className="font-display font-semibold">
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      Купить
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'donate' && (
          <div className="animate-fade-in flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-2xl text-center p-12 bg-card/50 backdrop-blur border-2">
              <Icon name="Hammer" size={80} className="mx-auto mb-6 text-primary" />
              <h2 className="text-6xl font-display font-bold text-foreground mb-4">
                НА РАЗРАБОТКЕ
              </h2>
              <p className="text-xl text-muted-foreground font-body">
                Раздел доната скоро будет доступен
              </p>
            </Card>
          </div>
        )}

        {activeSection === 'telegram' && (
          <div className="animate-fade-in flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-3xl text-center p-16 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur border-2 border-primary relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NCAwLTE4IDguMDYtMTggMThzOC4wNiAxOCAxOCAxOCAxOC04LjA2IDE4LTE4LTguMDYtMTgtMTgtMTh6bTAtMzJDMTYuMTE4LTE0IDAgMi4xMTggMCAyMnMyLjExOCAzNiAzNiAzNiAzNi0xNi4xMTggMzYtMzZTNTUuODgyLTE0IDM2LTE0eiIgZmlsbD0iI0Y5NzMxNiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary mb-8">
                  <Icon name="Send" size={48} className="text-primary-foreground" />
                </div>
                
                <h2 className="text-6xl font-display font-extrabold text-foreground mb-4 tracking-tight">
                  МАГАЗИН<br />ARIZONA LEGACY
                </h2>
                
                <p className="text-xl text-muted-foreground mb-8 font-body max-w-lg mx-auto">
                  Присоединяйтесь к нашему официальному Telegram каналу для получения новостей и эксклюзивных предложений
                </p>
                
                <Button 
                  size="lg" 
                  className="font-display font-bold text-lg px-8 py-6 hover:scale-105 transition-transform"
                  onClick={handleTelegramClick}
                >
                  <Icon name="Send" size={24} className="mr-3" />
                  Телеграмм магазина
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground font-body">
            © 2024 Arizona Legacy. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

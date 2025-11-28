import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('products');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = [
    {
      id: 411,
      name: 'Infernus',
      image: 'https://cdn.poehali.dev/files/798517ea-2896-4082-a662-31fec6e6b1e6.jpg',
      description: 'Данный автомобиль доступен только администрации но вы его можете купить у администрации за 20.000.000',
      price: '20.000.000',
      badge: null,
    },
    {
      id: 468,
      name: 'Sanchez',
      image: 'https://cdn.poehali.dev/files/442748ac-dabf-4e5f-8f40-c2f8287d14de.jpg',
      description: 'Название данной модели Sanchez редкость 90 процентов',
      price: '15.000.000',
      badge: { text: 'Редкость 90%', color: 'secondary' },
    },
    {
      id: 470,
      name: 'Patriot',
      image: 'https://cdn.poehali.dev/files/a43069cf-7179-4453-9615-45929a47a7e6.jpg',
      description: 'Данный автомобиль очень редкий но на него сейчас акция 10 процентов из а этого он стоит 56.235.423 Миллионов',
      price: '56.235.423',
      badge: { text: 'АКЦИЯ -10%', color: 'destructive' },
    },
  ];

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      toast.success('Товар добавлен', {
        description: `${product.name} добавлен в корзину`,
      });
    } else {
      setCart([...cart, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.image,
        quantity: 1 
      }]);
      toast.success('Товар добавлен', {
        description: `${product.name} добавлен в корзину`,
      });
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
    toast.info('Товар удален из корзины');
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) {
          removeFromCart(id);
          return item;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

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
            
            <div className="flex gap-2 items-center">
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
              
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle className="font-display text-2xl">Корзина</SheetTitle>
                    <SheetDescription className="font-body">
                      {getTotalItems() > 0 ? `Товаров в корзине: ${getTotalItems()}` : 'Корзина пуста'}
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground font-body">Ваша корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        {cart.map((item) => (
                          <Card key={item.id} className="overflow-hidden">
                            <div className="flex gap-4 p-4">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-24 h-24 object-cover rounded-lg bg-muted"
                              />
                              <div className="flex-1">
                                <h3 className="font-display font-bold text-lg">{item.name}</h3>
                                <p className="text-primary font-display font-semibold">{item.price}</p>
                                
                                <div className="flex items-center gap-2 mt-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center font-display font-semibold">{item.quantity}</span>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto"
                                  >
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                        
                        <Separator className="my-4" />
                        
                        <div className="space-y-4">
                          <Button className="w-full font-display font-bold" size="lg">
                            Оформить заказ
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full font-display" 
                            onClick={() => setCart([])}
                          >
                            Очистить корзину
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
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
                    <Button 
                      size="lg" 
                      className="font-display font-semibold"
                      onClick={() => addToCart(product)}
                    >
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
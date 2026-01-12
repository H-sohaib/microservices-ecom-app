import { Link } from 'react-router-dom';
import { Package, ShoppingCart, ClipboardList, ArrowRight, Sparkles, Shield, Truck, Plus, Zap, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: Package,
    title: 'Wide Selection',
    description: 'Browse through our extensive catalog of quality products',
  },
  {
    icon: Shield,
    title: 'Secure Shopping',
    description: 'Your transactions are protected with enterprise-grade security',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your orders delivered quickly and reliably',
  },
];

const quickLinks = [
  {
    icon: Package,
    title: 'Manage Products',
    description: 'Add, edit, and organize your product catalog',
    path: '/products',
    color: 'from-primary to-primary/80',
  },
  {
    icon: Plus,
    title: 'Create Order',
    description: 'Create a new order by selecting products',
    path: '/new-order',
    color: 'from-success to-success/80',
  },
  {
    icon: ClipboardList,
    title: 'View Orders',
    description: 'Track and manage all customer orders',
    path: '/orders',
    color: 'from-info to-info/80',
  },
  {
    icon: ShoppingCart,
    title: 'Shopping Cart',
    description: 'Review items and complete your purchase',
    path: '/cart',
    color: 'from-accent to-accent/80',
  },
];

const stats = [
  { label: 'Products', value: '500+', icon: Package },
  { label: 'Orders', value: '10K+', icon: ClipboardList },
  { label: 'Customers', value: '2K+', icon: Users },
];

export default function Index() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero Section - Split Layout */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary)/0.12),transparent_60%)]" />

        <div className="relative container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <Badge variant="secondary" className="mb-4 gap-2 px-3 py-1.5">
                <Zap className="h-3.5 w-3.5" />
                Fast & Reliable Platform
              </Badge>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                Streamline Your
                <span className="text-gradient-primary"> E-Commerce </span>
                Operations
              </h1>

              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-xl">
                Manage inventory, process orders, and grow your business with our powerful and intuitive platform.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Link to="/products">
                  <Button size="lg" className="gap-2 bg-gradient-primary hover:opacity-90 transition-opacity">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/orders">
                  <Button size="lg" variant="outline">
                    View Orders
                  </Button>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-6 pt-4 border-t border-border">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <stat.icon className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4 animate-slide-up">
              {quickLinks.map((link, index) => (
                <Link key={link.path} to={link.path} className="group">
                  <Card
                    className={`h-full border bg-card/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300 ${index === 0 ? 'row-span-2' : ''}`}
                  >
                    <CardContent className="p-5 h-full flex flex-col">
                      <div className={`rounded-lg bg-gradient-to-br ${link.color} p-2.5 w-fit mb-3`}>
                        <link.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex-1">
                        {link.description}
                      </p>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-2" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Horizontal Strip */}
      <section className="py-8 bg-muted/50 border-y border-border">
        <div className="container">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="rounded-full bg-primary/10 p-2.5">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 flex-1 flex items-center">
        <div className="container">
          <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Ready to get started?
                  </h2>
                  <p className="text-muted-foreground">
                    Start managing your products and orders today.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to="/new-order">
                    <Button size="lg" className="gap-2 bg-gradient-primary hover:opacity-90">
                      <Plus className="h-4 w-4" />
                      Create Order
                    </Button>
                  </Link>
                  <Link to="/products">
                    <Button size="lg" variant="outline" className="gap-2">
                      <BarChart3 className="h-4 w-4" />
                      View Products
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card/50">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} E-Commerce Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

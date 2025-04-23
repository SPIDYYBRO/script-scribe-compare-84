
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Index() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">Script-Check</span>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {user ? (
              <Button asChild className="bg-scriptGreen hover:bg-scriptGreen/90">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button asChild className="bg-scriptGreen hover:bg-scriptGreen/90">
                <Link to="/login">Get Started</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-scriptYellow/20" />
          <div className="absolute right-0 top-0 h-full w-1/3 bg-scriptGreen/10 rounded-l-full transform translate-x-1/3" />
          
          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Analyze Your Handwriting with Precision
                </h1>
                <p className="text-xl text-muted-foreground">
                  Compare your handwriting to popular fonts or analyze it against other samples. Improve your style with detailed feedback.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild className="bg-scriptGreen hover:bg-scriptGreen/90 px-8 py-6 text-lg">
                    <Link to="/login">Get Started</Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-1 bg-scriptGreen/20 rounded-lg blur-lg" />
                <div className="relative bg-white p-6 border rounded-lg shadow-lg">
                  <div className="aspect-video w-full bg-muted rounded-md overflow-hidden flex items-center justify-center">
                    <img 
                      src="/placeholder.svg" 
                      alt="Handwriting analysis preview" 
                      className="w-full h-full object-cover opacity-90"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="text-lg font-medium">Handwriting Analysis</h3>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-scriptGreen h-2 rounded-full" style={{ width: "68%" }} />
                    </div>
                    <p className="text-sm text-muted-foreground">Similarity score: 68%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-scriptYellow/30 p-4 rounded-full mb-4">
                  <svg className="h-6 w-6 text-scriptGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Upload Your Sample</h3>
                <p className="text-muted-foreground">
                  Take a photo of your handwriting or upload an existing image.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-scriptYellow/30 p-4 rounded-full mb-4">
                  <svg className="h-6 w-6 text-scriptGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Choose Comparison</h3>
                <p className="text-muted-foreground">
                  Select a standard font or another image to compare against.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="bg-scriptYellow/30 p-4 rounded-full mb-4">
                  <svg className="h-6 w-6 text-scriptGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Get Analysis</h3>
                <p className="text-muted-foreground">
                  Receive detailed feedback on your handwriting style and similarity.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Analyze Your Handwriting?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join Script-Check today and start improving your penmanship with detailed analysis and comparisons.
              </p>
              <Button asChild className="bg-scriptGreen hover:bg-scriptGreen/90 px-8 py-6 text-lg">
                <Link to="/login">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 border-t">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Script-Check. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

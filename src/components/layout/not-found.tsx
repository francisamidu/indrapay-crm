"use client";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function NotFoundPage() {
  const navigate = useNavigate();
  const onNavigate = () => {
    navigate("/");
  };
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-card-foreground leading-tight">
              Whoops.
              <br />
              This page is
              <br />
              not available
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              The link you clicked maybe broken or the page may have been
              removed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onNavigate}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                navigate({
                  to: "/",
                })
              }
              className="gap-2 bg-transparent px-8 py-3 text-base"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            {/* Construction Scene */}
            <div className="relative h-80 flex items-end justify-center">
              {/* Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/20 rounded-lg"></div>

              {/* Traffic Cones */}
              <div className="absolute bottom-8 left-12">
                <div className="w-8 h-12 bg-orange-500 rounded-t-full relative">
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded"></div>
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded"></div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-gray-600 rounded"></div>
                </div>
              </div>

              <div className="absolute bottom-6 right-16">
                <div className="w-6 h-10 bg-orange-500 rounded-t-full relative">
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded"></div>
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded"></div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-600 rounded"></div>
                </div>
              </div>

              {/* Construction Barrier */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                <div className="w-32 h-16 bg-gray-800 rounded-lg relative overflow-hidden">
                  {/* Diagonal Stripes */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-black to-yellow-400 opacity-80">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          45deg,
                          #fbbf24 0px,
                          #fbbf24 8px,
                          #000000 8px,
                          #000000 16px
                        )`,
                      }}
                    ></div>
                  </div>

                  {/* Warning Lights */}
                  <div className="absolute -top-3 left-2">
                    <div className="w-4 h-6 bg-gray-700 rounded-t-full relative">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="absolute -top-3 right-2">
                    <div className="w-4 h-6 bg-gray-700 rounded-t-full relative">
                      <div
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Cone */}
              <div className="absolute bottom-4 left-1/4">
                <div className="w-5 h-8 bg-orange-500 rounded-t-full relative">
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-white rounded"></div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-7 h-1 bg-gray-600 rounded"></div>
                </div>
              </div>

              {/* Ground/Base */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-muted via-muted/80 to-muted rounded-b-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

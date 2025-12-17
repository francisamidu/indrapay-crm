"use client";

import type React from "react";

import { ArrowLeft } from "lucide-react";

import { Link, useLocation } from "@tanstack/react-router";

import { AuthFooter } from "../layout/auth/footer";
import { AuthHeader } from "../layout/auth/header";

interface AuthLayoutProps {
  children: React.ReactNode;
  headerTitle?: string;
  headerSubtitle?: string;
}

export function AuthLayout({
  children,
  headerTitle,
  headerSubtitle,
}: AuthLayoutProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const isSignup = pathname === "/auth/signup";
  const isLogin = pathname === "/auth/login";

  return (
    <>
      <AuthHeader />
      <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
        {/* Left Panel - Auth Forms */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 xl:p-24 bg-white">
          <div className="w-full max-w-md space-y-8">
            {/* Logo Header */}
            <div className="flex flex-col items-center text-center space-y-2 mb-8">
              {headerTitle && (
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  {headerTitle}
                </h1>
              )}
              {headerSubtitle && (
                <p className="text-slate-500 text-sm max-w-xs mx-auto">
                  {headerSubtitle}
                </p>
              )}
            </div>

            {/* Dynamic Form Content */}
            <div className="transition-all duration-300 ease-in-out">
              {children}
            </div>

            {/* Footer Links */}
            <div className="pt-6 text-center text-xs text-slate-400 space-y-4">
              {isSignup ? (
                <p>
                  By signing up, I agree to the Supademo{" "}
                  <Link to="/" className="underline hover:text-slate-600">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link to="/" className="underline hover:text-slate-600">
                    Terms of Service
                  </Link>
                  .
                </p>
              ) : (
                !isLogin && (
                  <Link
                    to="/auth/login"
                    className="text-indigo-600 font-medium hover:underline flex items-center justify-center w-full gap-2"
                  >
                    <ArrowLeft className="h-3 w-3" /> Back to Login
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Visual & Testimonials */}
        <div className="hidden lg:flex flex-1 bg-slate-50 items-center justify-center p-12 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          {/* Testimonial Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md border border-slate-100 relative z-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-slate-700 font-medium">
                "I absolutely love Indrapay.{" "}
                <span className="bg-yellow-200 px-1">
                  You have no idea how much it has changed my life.
                </span>{" "}
                It's not just for product demos but for tutorials, content
                creation, and more."
              </p>

              <div className="flex items-center gap-4 pt-2 border-t border-slate-50">
                <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Daniela</h4>
                  <p className="text-slate-500 text-xs">Head of Marketing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthFooter />
    </>
  );
}

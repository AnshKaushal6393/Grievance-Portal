import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";

function Home() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white">
      {/* hero */}
      <section className="relative bg-gradient-to-br from-[#2563eb] to-[#1e40af] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* left */}
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {t("hero.title")}
              </h1>
              <p className="text-lg lg:text-xl text-blue-100 leading-relaxed">
                {t("hero.subtitle")}
              </p>
              {/* cta */}

              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link to={"/dashboard"}>
                    <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#2563eb] font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center space-x-2">
                      <span>Go to dashboard</span>
                      <ArrowRight size={20} />
                    </button>
                  </Link>
                ) : (
                  <>
                    {" "}
                    <Link to={"/register"}>
                      <button className="w-full sm:w-auto px-8 py-4  bg-white text-[#2563eb] font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center space-x-2">
                        <span>{t("hero.fileComplaint")}</span>
                        <ArrowRight size={20} />
                      </button>
                    </Link>
                    <Link to="/track-complaint">
                      <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all flex items-center justify-center space-x-2">
                        <span>{t("hero.trackComplaint")}</span>
                      </button>
                    </Link>
                  </>
                )}
              </div>

              {/* quick stat */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold">12K+</div>
                  <div className="text-sm text-blue-200">Complaints</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">89%</div>
                  <div className="text-sm text-blue-200">Resolution</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">3.5d</div>
                  <div className="text-sm text-blue-200">Avg Time</div>
                </div>
              </div>
            </div>

            {/* right content */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <svg
                    className="w-full h-auto"
                    viewBox="0 0 400 300"
                    fill="none"
                  >
                    <rect
                      x="50"
                      y="50"
                      width="300"
                      height="200"
                      rx="20"
                      fill="white"
                      fillOpacity="0.9"
                    />
                    <rect
                      x="70"
                      y="70"
                      width="260"
                      height="40"
                      rx="10"
                      fill="#2563eb"
                      fillOpacity="0.1"
                    />
                    <rect
                      x="70"
                      y="120"
                      width="200"
                      height="20"
                      rx="5"
                      fill="#2563eb"
                      fillOpacity="0.2"
                    />
                    <rect
                      x="70"
                      y="150"
                      width="150"
                      height="20"
                      rx="5"
                      fill="#2563eb"
                      fillOpacity="0.2"
                    />
                    <circle cx="320" cy="220" r="30" fill="#10b981" />
                    <path
                      d="M310 220 L318 228 L330 210"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FileText,
                label: "Total Complaints",
                value: "12,456",
                color: "bg-blue-500",
              },
              {
                icon: CheckCircle,
                label: "Resolved",
                value: "10,234",
                color: "bg-green-500",
              },
              {
                icon: Users,
                label: "Active Users",
                value: "8,932",
                color: "bg-purple-500",
              },
              {
                icon: TrendingUp,
                label: "Avg Resolution",
                value: "3.5 days",
                color: "bg-orange-500",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`inline-flex p-3 rounded-lg ${stat.color} bg-opacity-10 mb-4`}
                >
                  <stat.icon
                    className={`${stat.color.replace("bg-", "text-")} h-6 w-6`}
                  />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>{" "}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}

      <section className="py-20  bg-gradient-to-r from-[#2563eb] to-[#1e40af] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of citizens working together to build a better
            community
          </p>
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button className="px-8 py-4 bg-white text-[#2563eb] font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-xl">
                  Get Started Now
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;

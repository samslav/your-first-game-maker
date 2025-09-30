import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Fuel, TrendingDown, DollarSign, Leaf, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CompareVehicles = () => {
  // Diesel inputs
  const [dieselPrice, setDieselPrice] = useState<string>("4.5");
  const [dieselConsumption, setDieselConsumption] = useState<string>("6.5");
  const [dieselCarPrice, setDieselCarPrice] = useState<string>("35000");
  
  // Electric inputs
  const [electricityPrice, setElectricityPrice] = useState<string>("0.15");
  const [electricConsumption, setElectricConsumption] = useState<string>("18");
  const [evPrice, setEvPrice] = useState<string>("45000");
  
  // Common inputs
  const [annualMileage, setAnnualMileage] = useState<string>("12000");
  const [yearsOwnership, setYearsOwnership] = useState<string>("5");

  const calculateCosts = () => {
    const mileage = parseFloat(annualMileage);
    const years = parseFloat(yearsOwnership);

    // Diesel calculations
    const dieselFuelPerYear = (mileage / 100) * parseFloat(dieselConsumption);
    const dieselCostPerYear = dieselFuelPerYear * parseFloat(dieselPrice);
    const dieselTotalFuel = dieselCostPerYear * years;
    const dieselTotal = parseFloat(dieselCarPrice) + dieselTotalFuel;
    const dieselCO2PerYear = dieselFuelPerYear * 2.68; // kg CO2 per liter of diesel

    // Electric calculations
    const electricEnergyPerYear = (mileage / 100) * parseFloat(electricConsumption);
    const electricCostPerYear = electricEnergyPerYear * parseFloat(electricityPrice);
    const electricTotalEnergy = electricCostPerYear * years;
    const electricTotal = parseFloat(evPrice) + electricTotalEnergy;
    const electricCO2PerYear = electricEnergyPerYear * 0.4; // kg CO2 per kWh (average grid)

    return {
      diesel: {
        annualFuelCost: dieselCostPerYear,
        totalFuelCost: dieselTotalFuel,
        totalCost: dieselTotal,
        annualCO2: dieselCO2PerYear,
        totalCO2: dieselCO2PerYear * years,
      },
      electric: {
        annualEnergyCost: electricCostPerYear,
        totalEnergyCost: electricTotalEnergy,
        totalCost: electricTotal,
        annualCO2: electricCO2PerYear,
        totalCO2: electricCO2PerYear * years,
      },
      savings: {
        annual: dieselCostPerYear - electricCostPerYear,
        total: dieselTotal - electricTotal,
        co2Annual: dieselCO2PerYear - electricCO2PerYear,
        co2Total: (dieselCO2PerYear - electricCO2PerYear) * years,
      }
    };
  };

  const results = calculateCosts();

  return (
    <main className="min-h-screen p-4 md:p-8" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-700">
        {/* Header */}
        <header className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </Link>
          <div className="flex items-center justify-center gap-3">
            <Fuel className="w-10 h-10 text-orange-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Diesel vs Electric
            </h1>
            <Zap className="w-10 h-10 text-green-500" />
          </div>
          <p className="text-muted-foreground text-lg">
            Compare costs and environmental impact over time
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Cards */}
          <Card className="shadow-2xl" style={{ boxShadow: "var(--shadow-card)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="w-5 h-5 text-orange-500" />
                Diesel Vehicle
              </CardTitle>
              <CardDescription>Enter diesel vehicle parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="diesel-price">Fuel Price ($/gallon)</Label>
                <Input
                  id="diesel-price"
                  type="number"
                  step="0.1"
                  value={dieselPrice}
                  onChange={(e) => setDieselPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diesel-consumption">Consumption (L/100km)</Label>
                <Input
                  id="diesel-consumption"
                  type="number"
                  step="0.1"
                  value={dieselConsumption}
                  onChange={(e) => setDieselConsumption(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diesel-car-price">Vehicle Price ($)</Label>
                <Input
                  id="diesel-car-price"
                  type="number"
                  step="1000"
                  value={dieselCarPrice}
                  onChange={(e) => setDieselCarPrice(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-2xl" style={{ boxShadow: "var(--shadow-card)" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" />
                Electric Vehicle
              </CardTitle>
              <CardDescription>Enter electric vehicle parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="electricity-price">Electricity Price ($/kWh)</Label>
                <Input
                  id="electricity-price"
                  type="number"
                  step="0.01"
                  value={electricityPrice}
                  onChange={(e) => setElectricityPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="electric-consumption">Consumption (kWh/100km)</Label>
                <Input
                  id="electric-consumption"
                  type="number"
                  step="0.1"
                  value={electricConsumption}
                  onChange={(e) => setElectricConsumption(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ev-price">Vehicle Price ($)</Label>
                <Input
                  id="ev-price"
                  type="number"
                  step="1000"
                  value={evPrice}
                  onChange={(e) => setEvPrice(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Common Parameters */}
        <Card className="shadow-2xl" style={{ boxShadow: "var(--shadow-card)" }}>
          <CardHeader>
            <CardTitle>Usage Parameters</CardTitle>
            <CardDescription>How you plan to use the vehicle</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="annual-mileage">Annual Mileage (miles)</Label>
              <Input
                id="annual-mileage"
                type="number"
                step="1000"
                value={annualMileage}
                onChange={(e) => setAnnualMileage(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years-ownership">Years of Ownership</Label>
              <Input
                id="years-ownership"
                type="number"
                step="1"
                value={yearsOwnership}
                onChange={(e) => setYearsOwnership(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="shadow-2xl" style={{ boxShadow: "var(--shadow-card)" }}>
          <CardHeader>
            <CardTitle>Comparison Results</CardTitle>
            <CardDescription>Over {yearsOwnership} years of ownership</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="costs" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="costs">Costs</TabsTrigger>
                <TabsTrigger value="environmental">Environmental</TabsTrigger>
                <TabsTrigger value="savings">Savings</TabsTrigger>
              </TabsList>

              <TabsContent value="costs" className="space-y-4 pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Fuel className="w-5 h-5 text-orange-500" />
                      <h3 className="font-semibold">Diesel</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Fuel:</span>
                        <span className="font-medium">${results.diesel.annualFuelCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Fuel:</span>
                        <span className="font-medium">${results.diesel.totalFuelCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-muted-foreground font-semibold">Total Cost:</span>
                        <span className="font-bold text-lg">${results.diesel.totalCost.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-green-500" />
                      <h3 className="font-semibold">Electric</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Energy:</span>
                        <span className="font-medium">${results.electric.annualEnergyCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Energy:</span>
                        <span className="font-medium">${results.electric.totalEnergyCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-muted-foreground font-semibold">Total Cost:</span>
                        <span className="font-bold text-lg">${results.electric.totalCost.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="environmental" className="space-y-4 pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Fuel className="w-5 h-5 text-orange-500" />
                      <h3 className="font-semibold">Diesel Emissions</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual CO₂:</span>
                        <span className="font-medium">{results.diesel.annualCO2.toFixed(0)} kg</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-muted-foreground font-semibold">Total CO₂:</span>
                        <span className="font-bold text-lg">{results.diesel.totalCO2.toFixed(0)} kg</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-green-500" />
                      <h3 className="font-semibold">Electric Emissions</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual CO₂:</span>
                        <span className="font-medium">{results.electric.annualCO2.toFixed(0)} kg</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-muted-foreground font-semibold">Total CO₂:</span>
                        <span className="font-bold text-lg">{results.electric.totalCO2.toFixed(0)} kg</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  * Based on average grid emissions. Actual emissions vary by energy source.
                </p>
              </TabsContent>

              <TabsContent value="savings" className="space-y-4 pt-4">
                <div className="p-6 bg-primary/10 rounded-lg border border-primary/20 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-6 h-6 text-primary" />
                    <h3 className="font-bold text-xl">
                      {results.savings.total > 0 ? "Electric Saves Money" : "Diesel Saves Money"}
                    </h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual Savings:</span>
                        <span className="font-bold text-lg">
                          ${Math.abs(results.savings.annual).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-muted-foreground">Total Savings:</span>
                        <span className="font-bold text-2xl text-primary">
                          ${Math.abs(results.savings.total).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf className="w-5 h-5 text-green-500" />
                        <span className="font-semibold">CO₂ Reduction</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Annual:</span>
                        <span className="font-medium">
                          {Math.abs(results.savings.co2Annual).toFixed(0)} kg
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-bold text-lg text-green-500">
                          {Math.abs(results.savings.co2Total).toFixed(0)} kg
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default CompareVehicles;

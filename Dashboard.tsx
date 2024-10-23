import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const [isBackendActive, setIsBackendActive] = useState(false);
  const [orderBookData, setOrderBookData] = useState([]);
  const [tradeBookData, setTradeBookData] = useState([]);
  const [profileData, setProfileData] = useState({});
  const { toast } = useToast();

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }
  });

  const handleStart = async () => {
    try {
      const response = await axios.post('/api/start-backend');
      if (response.data.success) {
        setIsBackendActive(true);
        toast({
          title: "Backend Started",
          description: "The backend activity has been initiated successfully.",
        })
      }
    } catch (error) {
      console.error('Error starting backend:', error);
      toast({
        title: "Error",
        description: "Failed to start backend activity. Please try again.",
        variant: "destructive",
      })
    }
  };

  const fetchData = async (endpoint: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
    try {
      const response = await axios.get(`/api/${endpoint}`);
      setter(response.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      toast({
        title: "Error",
        description: `Failed to fetch ${endpoint} data. Please try again.`,
        variant: "destructive",
      })
    }
  };

  return (
    <animated.div style={fadeIn} className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Trading Dashboard</CardTitle>
          <CardDescription>Manage your trades and view market data</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleStart} 
            disabled={isBackendActive}
            className="mb-6"
          >
            {isBackendActive ? 'Backend Active' : 'Start Backend'}
          </Button>

          <Tabs defaultValue="orderbook" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orderbook" onClick={() => fetchData('orderbook', setOrderBookData)}>Order Book</TabsTrigger>
              <TabsTrigger value="tradebook" onClick={() => fetchData('tradebook', setTradeBookData)}>Trade Book</TabsTrigger>
              <TabsTrigger value="profile" onClick={() => fetchData('profile', setProfileData)}>Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="orderbook">
              <Card>
                <CardHeader>
                  <CardTitle>Order Book</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Render order book data here */}
                  <pre>{JSON.stringify(orderBookData, null, 2)}</pre>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tradebook">
              <Card>
                <CardHeader>
                  <CardTitle>Trade Book</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Render trade book data here */}
                  <pre>{JSON.stringify(tradeBookData, null, 2)}</pre>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Render profile data here */}
                  <pre>{JSON.stringify(profileData, null, 2)}</pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </animated.div>
  );
}
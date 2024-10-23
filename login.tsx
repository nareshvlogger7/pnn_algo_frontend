import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function Login() {
  const [formData, setFormData] = useState({
    totp: '',
    apikey: '',
    clientId: '',
    password: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData);
      if (response.data.success) {
        toast({
          title: "Login Successful",
          description: "Redirecting to dashboard...",
        })
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    }
  };

  return (
    <animated.div style={fadeIn} className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access the trading dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="totp">TOTP</Label>
              <Input id="totp" name="totp" type="text" required onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apikey">API Key</Label>
              <Input id="apikey" name="apikey" type="text" required onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientId">Client ID</Label>
              <Input id="clientId" name="clientId" type="text" required onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required onChange={handleChange} />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
    </animated.div>
  );
}
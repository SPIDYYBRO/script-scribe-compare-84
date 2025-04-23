
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ProfileSettings from "@/components/settings/ProfileSettings";
import FontSettings from "@/components/settings/FontSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Settings() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  // If user is not logged in, redirect to login
  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <div className="max-w-4xl mx-auto">
          <Tabs 
            defaultValue="profile" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="font">Font Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <ProfileSettings />
            </TabsContent>
            
            <TabsContent value="font">
              <FontSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}


import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmailLoginForm from "./EmailLoginForm";
import RegisterForm from "./RegisterForm";
import PhoneLoginForm from "./PhoneLoginForm";
import SocialLogin from "./SocialLogin";

export default function AuthForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("login");

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs 
        defaultValue="login" 
        className="w-full" 
        value={activeTab} 
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <EmailLoginForm isSubmitting={isSubmitting} />
          <SocialLogin isSubmitting={isSubmitting} />
        </TabsContent>
        
        <TabsContent value="register">
          <RegisterForm isSubmitting={isSubmitting} />
          <SocialLogin isSubmitting={isSubmitting} />
        </TabsContent>

        <TabsContent value="phone">
          <PhoneLoginForm isSubmitting={isSubmitting} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

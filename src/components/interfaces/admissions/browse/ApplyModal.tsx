"use client";

import { School } from "@/lib/data/schoolsData";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Divider,
} from "@nextui-org/react";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUserGraduate, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

interface ApplyModalProps {
  school: School;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyModal({ school, isOpen, onClose }: ApplyModalProps) {
  const [mode, setMode] = useState<'choice' | 'guest' | 'login' | 'email' | 'credentials'>('choice');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleGuestSubmit = () => {
    // In a real app, validate email and proceed with guest application
    console.log('Guest application with email:', email);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a random password
    const password = Math.random().toString(36).slice(-8);
    setGeneratedPassword(password);
    setMode('credentials');
  };

  const handleLogin = () => {
    // Handle login
    console.log('Login with:', email, password);
  };

  const goBack = () => {
    switch (mode) {
      case 'guest':
      case 'login':
      case 'email':
        setMode('choice');
        break;
      case 'credentials':
        setMode('email');
        break;
    }
  };

  const renderChoice = () => (
    <>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Apply to {school.name}</h3>
        <p className="text-sm text-zinc-600">Choose how you would like to proceed with your application</p>
      </div>

      <div className="space-y-4">
        <Button
          className="w-full h-auto p-6 bg-zinc-900"
          color="primary"
          onPress={() => setMode('login')}
        >
          <div className="text-left">
            <p className="font-semibold">Sign in to continue</p>
            <p className="text-sm text-zinc-300">Access your account to manage multiple applications</p>
          </div>
        </Button>

        <div className="relative">
          <Divider className="my-4" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-zinc-500">
            or
          </span>
        </div>

        <Button
          className="w-full h-auto p-6"
          variant="bordered"
          onPress={() => setMode('guest')}
        >
          <div className="text-left">
            <p className="font-semibold">Continue as guest</p>
            <p className="text-sm text-zinc-600">Quick application with your email</p>
          </div>
        </Button>
      </div>
    </>
  );

  const renderGuest = () => (
    <>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Quick Application</h3>
        <p className="text-sm text-zinc-600">
          Enter your email to continue as guest
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <FaExclamationTriangle className="text-yellow-500 text-xl flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-yellow-800 font-medium mb-1">Important Notice</p>
            <p className="text-sm text-yellow-700">
              Continuing as a guest means your application progress isn't saved. If you experience any interruption, 
              you'll need to start over. We recommend creating an account for a better experience.
            </p>
          </div>
        </div>
      </div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleGuestSubmit(); }}>
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          startContent={<FaEnvelope className="text-zinc-400" />}
          variant="bordered"
          isRequired
        />
        <Button 
          type="submit" 
          color="primary"
          className="w-full bg-zinc-900"
        >
          Continue Application
        </Button>
      </form>

      <p className="text-center text-sm text-zinc-500 mt-4">
        Want to save your progress?{" "}
        <Button 
          variant="light" 
          className="text-zinc-900 font-semibold p-0"
          onPress={() => setMode('email')}
        >
          Create an account
        </Button>
      </p>
    </>
  );

  const renderEmail = () => (
    <>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Create Your Account</h3>
        <p className="text-sm text-zinc-600">
          Enter your email to get started
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleEmailSubmit}>
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          startContent={<FaEnvelope className="text-zinc-400" />}
          variant="bordered"
          isRequired
        />
        <Button 
          type="submit" 
          color="primary"
          className="w-full bg-zinc-900"
        >
          Continue
        </Button>
      </form>

      <p className="text-center text-sm text-zinc-500 mt-4">
        Already have an account?{" "}
        <Button 
          variant="light" 
          className="text-zinc-900 font-semibold p-0"
          onPress={() => setMode('login')}
        >
          Sign in
        </Button>
      </p>
    </>
  );

  const renderLogin = () => (
    <>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Welcome Back</h3>
        <p className="text-sm text-zinc-600">
          Sign in to continue your application
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          startContent={<FaEnvelope className="text-zinc-400" />}
          variant="bordered"
          isRequired
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          startContent={<FaLock className="text-zinc-400" />}
          variant="bordered"
          isRequired
        />
        <Button 
          type="submit" 
          color="primary"
          className="w-full bg-zinc-900"
        >
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-zinc-500 mt-4">
        Don't have an account?{" "}
        <Button 
          variant="light" 
          className="text-zinc-900 font-semibold p-0"
          onPress={() => setMode('email')}
        >
          Create one now
        </Button>
      </p>
    </>
  );

  const renderCredentials = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <FaUserGraduate className="text-green-600 text-2xl" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Account Created Successfully!</h3>
        <p className="text-sm text-zinc-600 mb-6">
          Your account has been created. Please save your credentials.
        </p>
      </div>

      <div className="bg-zinc-50 p-4 rounded-lg space-y-3">
        <div>
          <p className="text-sm text-zinc-600">Email</p>
          <p className="font-medium">{email}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-600">Password</p>
          <p className="font-medium">{generatedPassword}</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
        <p className="text-sm text-blue-800">
          <strong>Important:</strong> Please save these credentials. You'll need them to access your application later.
        </p>
      </div>

      <Button 
        color="primary"
        className="w-full bg-zinc-900"
        onPress={() => setMode('login')}
      >
        Continue to Sign In
      </Button>
    </div>
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="lg"
      classNames={{
        backdrop: "bg-zinc-900/50 backdrop-blur-sm",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center w-full">
            {mode !== 'choice' && (
              <Button
                isIconOnly
                variant="light"
                onPress={goBack}
                className="mr-2"
              >
                <FaArrowLeft />
              </Button>
            )}
            <div className="flex-grow flex justify-center items-center gap-2">
              <FaUserGraduate className="text-2xl" />
              <span className="font-bold">School Application</span>
            </div>
            <div className="w-9" /> {/* Spacer for alignment */}
          </div>
          <p className="text-sm text-zinc-500 text-center mt-1">
            {mode === 'choice' ? 'Choose how you would like to proceed with your application' : mode === 'guest' ? 'Enter your email to continue as guest' : mode === 'login' ? 'Sign in to continue your application' : mode === 'email' ? 'Enter your email to get started' : 'Save your credentials'}
          </p>
        </ModalHeader>
        <ModalBody className="pb-6">
          {mode === 'choice' && renderChoice()}
          {mode === 'guest' && renderGuest()}
          {mode === 'login' && renderLogin()}
          {mode === 'email' && renderEmail()}
          {mode === 'credentials' && renderCredentials()}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

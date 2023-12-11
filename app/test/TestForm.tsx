"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {};

const TestForm: React.FunctionComponent<Props> = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const [form, setForm] = useState({
  //   image: "img",
  //   description: "test desc",
  // });

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     setIsLoading(true);
  //     const response = await fetch("/api/auth", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(form),
  //     });

  //     if (response.ok) {
  //     } else {
  //       // Handle errors
  //       console.error("Error adding user");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  //TODO:
  const router = useRouter();

  const supabase = createClientComponentClient();
  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: "nadja@gmail.com",
      password: "123456",
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    router.refresh();
  };
  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email: "nadja@gmail.com",
      password: "123456",
    });
    router.refresh();
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <div>
        <h1>TestForm</h1>
        <button onClick={handleSignIn}>Sign UP</button>
        <button onClick={handleSignUp}>Sign IN</button>
        <button onClick={handleSignOut}>Sign OUT</button>
      </div>
    </>
  );
};

export default TestForm;
